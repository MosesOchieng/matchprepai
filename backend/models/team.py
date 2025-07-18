from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, unique=True)
    short_name = Column(String(50))
    country = Column(String(100))
    league = Column(String(100))
    division = Column(String(50))
    
    # Team details
    founded_year = Column(Integer)
    stadium = Column(String(200))
    capacity = Column(Integer)
    website = Column(String(200))
    
    # Tactical profile
    preferred_formation = Column(String(20))
    playing_style = Column(String(100))  # possession, counter-attack, etc.
    tactical_dna = Column(JSON)  # AI-generated tactical characteristics
    
    # Performance metrics
    current_position = Column(Integer)
    points = Column(Integer, default=0)
    goals_for = Column(Integer, default=0)
    goals_against = Column(Integer, default=0)
    
    # AI Analysis data
    tactical_analysis = Column(JSON)  # Detailed tactical breakdown
    player_analysis = Column(JSON)  # Key players and their roles
    formation_history = Column(JSON)  # Formation usage over time
    
    # Metadata
    logo_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    players = relationship("Player", back_populates="team")
    home_matches = relationship("Match", foreign_keys="Match.home_team_id")
    away_matches = relationship("Match", foreign_keys="Match.away_team_id")


class TeamBase(BaseModel):
    name: str
    short_name: Optional[str] = None
    country: Optional[str] = None
    league: Optional[str] = None
    division: Optional[str] = None
    preferred_formation: Optional[str] = None
    playing_style: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    short_name: Optional[str] = None
    country: Optional[str] = None
    league: Optional[str] = None
    division: Optional[str] = None
    preferred_formation: Optional[str] = None
    playing_style: Optional[str] = None
    tactical_dna: Optional[Dict[str, Any]] = None
    tactical_analysis: Optional[Dict[str, Any]] = None


class TeamInDB(TeamBase):
    id: int
    current_position: int
    points: int
    goals_for: int
    goals_against: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class TeamResponse(TeamInDB):
    pass


class TeamTacticalProfile(BaseModel):
    formation: str
    style: str
    key_players: List[int]
    strengths: List[str]
    weaknesses: List[str]
    tactical_tendencies: Dict[str, Any] 