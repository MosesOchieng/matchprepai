import cv2
import numpy as np
from ultralytics import YOLO
from typing import List, Tuple, Optional
import torch
from loguru import logger
import json
from dataclasses import dataclass
from models.detection_models import PlayerPosition, DetectionResult


@dataclass
class PlayerDetection:
    bbox: List[float]  # [x1, y1, x2, y2]
    confidence: float
    class_id: int
    team_id: Optional[int] = None
    player_id: Optional[int] = None


class PlayerDetectionService:
    def __init__(self, model_path: str = "models/yolov8n.pt"):
        """Initialize player detection service with YOLOv8 model"""
        self.model_path = model_path
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.load_model()
    
    def load_model(self):
        """Load YOLOv8 model for player detection"""
        try:
            self.model = YOLO(self.model_path)
            logger.info(f"Player detection model loaded successfully on {self.device}")
        except Exception as e:
            logger.error(f"Failed to load player detection model: {e}")
            self.model = None
    
    def is_model_loaded(self) -> bool:
        """Check if model is loaded"""
        return self.model is not None
    
    async def detect_players(
        self, 
        image: np.ndarray, 
        confidence_threshold: float = 0.5
    ) -> List[PlayerPosition]:
        """Detect players in an image"""
        if not self.is_model_loaded():
            raise RuntimeError("Player detection model not loaded")
        
        try:
            # Run inference
            results = self.model(image, conf=confidence_threshold, verbose=False)
            
            players = []
            for result in results:
                boxes = result.boxes
                if boxes is not None:
                    for box in boxes:
                        # Get bounding box coordinates
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        confidence = box.conf[0].cpu().numpy()
                        class_id = int(box.cls[0].cpu().numpy())
                        
                        # Filter for person class (class 0 in COCO)
                        if class_id == 0:
                            player = PlayerPosition(
                                x=float((x1 + x2) / 2),
                                y=float((y1 + y2) / 2),
                                width=float(x2 - x1),
                                height=float(y2 - y1),
                                confidence=float(confidence),
                                team_id=None,  # Will be assigned later
                                player_id=None
                            )
                            players.append(player)
            
            return players
            
        except Exception as e:
            logger.error(f"Error in player detection: {e}")
            return []
    
    async def detect_teams(
        self, 
        image: np.ndarray, 
        players: List[PlayerPosition]
    ) -> List[PlayerPosition]:
        """Assign team IDs to detected players based on jersey colors"""
        if not players:
            return players
        
        try:
            # Convert to HSV for better color detection
            hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
            
            for player in players:
                # Get player region
                x, y = int(player.x), int(player.y)
                w, h = int(player.width), int(player.height)
                
                # Ensure coordinates are within image bounds
                x1 = max(0, x - w//2)
                y1 = max(0, y - h//2)
                x2 = min(image.shape[1], x + w//2)
                y2 = min(image.shape[0], y + h//2)
                
                if x1 < x2 and y1 < y2:
                    player_region = hsv[y1:y2, x1:x2]
                    
                    # Analyze dominant colors in player region
                    team_id = self._analyze_jersey_colors(player_region)
                    player.team_id = team_id
            
            return players
            
        except Exception as e:
            logger.error(f"Error in team detection: {e}")
            return players
    
    def _analyze_jersey_colors(self, region: np.ndarray) -> Optional[int]:
        """Analyze jersey colors to determine team"""
        try:
            if region.size == 0:
                return None
            
            # Calculate color histogram
            hist = cv2.calcHist([region], [0, 1], None, [180, 256], [0, 180, 0, 256])
            
            # Find dominant colors
            # This is a simplified approach - in production, you'd use more sophisticated
            # color analysis and team-specific color profiles
            
            # Example: detect red vs blue teams
            red_mask = cv2.inRange(region, np.array([0, 50, 50]), np.array([10, 255, 255]))
            blue_mask = cv2.inRange(region, np.array([100, 50, 50]), np.array([130, 255, 255]))
            
            red_pixels = cv2.countNonZero(red_mask)
            blue_pixels = cv2.countNonZero(blue_mask)
            
            if red_pixels > blue_pixels and red_pixels > 100:
                return 1  # Home team (red)
            elif blue_pixels > red_pixels and blue_pixels > 100:
                return 2  # Away team (blue)
            else:
                return None
                
        except Exception as e:
            logger.error(f"Error in color analysis: {e}")
            return None
    
    async def process_video(
        self, 
        video_path: str, 
        output_path: Optional[str] = None
    ) -> List[DetectionResult]:
        """Process entire video for player detection"""
        if not self.is_model_loaded():
            raise RuntimeError("Player detection model not loaded")
        
        try:
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                raise ValueError(f"Could not open video file: {video_path}")
            
            fps = cap.get(cv2.CAP_PROP_FPS)
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            
            results = []
            frame_count = 0
            
            # Setup video writer if output path is provided
            writer = None
            if output_path:
                fourcc = cv2.VideoWriter_fourcc(*'mp4v')
                width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
            
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Detect players
                players = await self.detect_players(frame)
                
                # Assign teams
                players = await self.detect_teams(frame, players)
                
                # Create detection result
                result = DetectionResult(
                    players=players,
                    frame_timestamp=frame_count / fps,
                    confidence_threshold=0.5
                )
                results.append(result)
                
                # Draw detections on frame if output is requested
                if writer:
                    annotated_frame = self._draw_detections(frame, players)
                    writer.write(annotated_frame)
                
                frame_count += 1
                
                # Log progress
                if frame_count % 100 == 0:
                    logger.info(f"Processed {frame_count}/{total_frames} frames")
            
            cap.release()
            if writer:
                writer.release()
            
            logger.info(f"Video processing completed. Processed {len(results)} frames")
            return results
            
        except Exception as e:
            logger.error(f"Error in video processing: {e}")
            return []
    
    def _draw_detections(
        self, 
        image: np.ndarray, 
        players: List[PlayerPosition]
    ) -> np.ndarray:
        """Draw player detections on image"""
        annotated = image.copy()
        
        for player in players:
            x, y = int(player.x), int(player.y)
            w, h = int(player.width), int(player.height)
            
            # Draw bounding box
            color = (0, 255, 0) if player.team_id == 1 else (255, 0, 0)
            cv2.rectangle(annotated, (x - w//2, y - h//2), (x + w//2, y + h//2), color, 2)
            
            # Draw confidence score
            cv2.putText(
                annotated, 
                f"{player.confidence:.2f}", 
                (x - w//2, y - h//2 - 10), 
                cv2.FONT_HERSHEY_SIMPLEX, 
                0.5, 
                color, 
                1
            )
        
        return annotated 