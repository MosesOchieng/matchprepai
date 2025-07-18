from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


class MatchStatus(str, Enum):
    SCHEDULED = "scheduled"
    LIVE = "live"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Match(Base):
    __tablename__ = "matches"
    
    id = Column(Integer, primary_key=True, index=True)
    home_team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    away_team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    competition_id = Column(Integer, ForeignKey("competitions.id"), nullable=False)
    match_date = Column(DateTime, nullable=False)
    status = Column(String(20), default=MatchStatus.SCHEDULED)
    
    # Match details
    home_score = Column(Integer, default=0)
    away_score = Column(Integer, default=0)
    home_formation = Column(String(20))
    away_formation = Column(String(20))
    
    # Video and analysis
    video_url = Column(String(500))
    video_path = Column(String(500))
    analysis_status = Column(String(20), default="pending")  # pending, processing, completed
    
    # Tactical data
    home_tactics = Column(JSON)  # Formation, style, key players
    away_tactics = Column(JSON)
    match_events = Column(JSON)  # Goals, cards, substitutions
    
    # AI Analysis results
    tactical_analysis = Column(JSON)
    player_performance = Column(JSON)
    heatmaps = Column(JSON)
    
    # Metadata
    venue = Column(String(200))
    referee = Column(String(100))
    attendance = Column(Integer)
    weather = Column(String(100))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    home_team = relationship("Team", foreign_keys=[home_team_id])
    away_team = relationship("Team", foreign_keys=[away_team_id])
    competition = relationship("Competition")


class MatchBase(BaseModel):
    home_team_id: int
    away_team_id: int
    competition_id: int
    match_date: datetime
    status: MatchStatus = MatchStatus.SCHEDULED
    venue: Optional[str] = None
    referee: Optional[str] = None


class MatchCreate(MatchBase):
    pass


class MatchUpdate(BaseModel):
    home_score: Optional[int] = None
    away_score: Optional[int] = None
    status: Optional[MatchStatus] = None
    video_url: Optional[str] = None
    home_formation: Optional[str] = None
    away_formation: Optional[str] = None
    tactical_analysis: Optional[Dict[str, Any]] = None


class MatchInDB(MatchBase):
    id: int
    home_score: int
    away_score: int
    analysis_status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class MatchResponse(MatchInDB):
    home_team_name: Optional[str] = None
    away_team_name: Optional[str] = None
    competition_name: Optional[str] = None


class MatchEvent(BaseModel):
    event_type: str  # goal, card, substitution, etc.
    minute: int
    team_id: int
    player_id: Optional[int] = None
    description: str
    data: Optional[Dict[str, Any]] = None


class TacticalAnalysis(BaseModel):
    formation: str
    style: str
    key_players: List[int]
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str] 