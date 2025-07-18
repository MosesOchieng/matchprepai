from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from loguru import logger
import cv2
import numpy as np
from typing import List, Dict, Any
import json
import os

from services.player_detection import PlayerDetectionService
from services.ball_tracking import BallTrackingService
from services.field_mapping import FieldMappingService
from models.detection_models import DetectionResult, PlayerPosition, BallPosition

app = FastAPI(
    title="Computer Vision Service",
    description="AI-powered player detection and ball tracking for football analysis",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
player_detection = PlayerDetectionService()
ball_tracking = BallTrackingService()
field_mapping = FieldMappingService()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "computer-vision",
        "models_loaded": player_detection.is_model_loaded()
    }


@app.post("/detect-players", response_model=DetectionResult)
async def detect_players(
    file: UploadFile = File(...),
    confidence_threshold: float = 0.5
) -> DetectionResult:
    """Detect players in a video frame"""
    try:
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Detect players
        players = await player_detection.detect_players(image, confidence_threshold)
        
        return DetectionResult(
            players=players,
            frame_timestamp=0.0,
            confidence_threshold=confidence_threshold
        )
        
    except Exception as e:
        logger.error(f"Error in player detection: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/track-ball")
async def track_ball(
    file: UploadFile = File(...),
    previous_positions: List[BallPosition] = []
) -> BallPosition:
    """Track ball position in video frame"""
    try:
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Track ball
        ball_position = await ball_tracking.track_ball(image, previous_positions)
        
        return ball_position
        
    except Exception as e:
        logger.error(f"Error in ball tracking: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/map-field")
async def map_field(
    file: UploadFile = File(...)
) -> Dict[str, Any]:
    """Map camera view to top-down field view"""
    try:
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Map field
        field_data = await field_mapping.map_field(image)
        
        return field_data
        
    except Exception as e:
        logger.error(f"Error in field mapping: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/process-video")
async def process_video(
    video_path: str,
    output_path: str = None
) -> Dict[str, Any]:
    """Process entire video for player and ball tracking"""
    try:
        if not os.path.exists(video_path):
            raise HTTPException(status_code=404, detail="Video file not found")
        
        # Process video
        results = await player_detection.process_video(video_path, output_path)
        
        return {
            "status": "completed",
            "video_path": video_path,
            "output_path": output_path,
            "frames_processed": len(results),
            "results": results
        }
        
    except Exception as e:
        logger.error(f"Error in video processing: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/models/status")
async def get_model_status():
    """Get status of loaded AI models"""
    return {
        "player_detection": player_detection.is_model_loaded(),
        "ball_tracking": ball_tracking.is_model_loaded(),
        "field_mapping": field_mapping.is_model_loaded()
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    ) 