from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "AI Coaching Assistant"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "postgresql://coaching_user:coaching_password@localhost:5432/coaching_db"
    REDIS_URL: str = "redis://localhost:6379"
    
    # Neo4j
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "coaching_password"
    
    # Vector Database
    WEAVIATE_URL: str = "http://localhost:8080"
    
    # Message Queue
    RABBITMQ_URL: str = "amqp://coaching_user:coaching_password@localhost:5672/"
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    PINECONE_API_KEY: Optional[str] = None
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    ALLOWED_VIDEO_FORMATS: List[str] = ["mp4", "avi", "mov", "mkv"]
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # AI Service URLs
    COMPUTER_VISION_URL: str = "http://localhost:8001"
    TACTICAL_ANALYSIS_URL: str = "http://localhost:8002"
    VIDEO_INTELLIGENCE_URL: str = "http://localhost:8003"
    
    # WebSocket
    WS_URL: str = "ws://localhost:8004"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/app.log"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs("logs", exist_ok=True) 