from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Boolean, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class Player(Base):
    __tablename__ = "players"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    
    # Basic info
    name = Column(String(200), nullable=False)
    position = Column(String(50))  # GK, DEF, MID, FWD
    jersey_number = Column(Integer)
    nationality = Column(String(100))
    date_of_birth = Column(DateTime)
    height = Column(Float)  # in cm
    weight = Column(Float)  # in kg
    
    # Performance stats
    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    appearances = Column(Integer, default=0)
    minutes_played = Column(Integer, default=0)
    
    # AI Analysis data
    tactical_role = Column(String(100))  # Playmaker, Target Man, etc.
    performance_metrics = Column(JSON)  # Detailed performance data
    heatmap_data = Column(JSON)  # Positional heatmaps
    skill_ratings = Column(JSON)  # AI-generated skill ratings
    
    # Match-specific data
    current_form = Column(JSON)  # Recent performance trends
    injury_status = Column(String(50), default="fit")
    availability = Column(Boolean, default=True)
    
    # Metadata
    photo_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    team = relationship("Team", back_populates="players")


class PlayerBase(BaseModel):
    team_id: int
    name: str
    position: Optional[str] = None
    jersey_number: Optional[int] = None
    nationality: Optional[str] = None
    date_of_birth: Optional[datetime] = None


class PlayerCreate(PlayerBase):
    pass


class PlayerUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    jersey_number: Optional[int] = None
    nationality: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    tactical_role: Optional[str] = None
    performance_metrics: Optional[Dict[str, Any]] = None
    injury_status: Optional[str] = None
    availability: Optional[bool] = None


class PlayerInDB(PlayerBase):
    id: int
    goals: int
    assists: int
    appearances: int
    minutes_played: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class PlayerResponse(PlayerInDB):
    team_name: Optional[str] = None


class PlayerPerformance(BaseModel):
    player_id: int
    match_id: int
    goals: int = 0
    assists: int = 0
    minutes_played: int = 0
    position: str
    rating: float
    heatmap: Dict[str, Any]
    events: List[Dict[str, Any]] 