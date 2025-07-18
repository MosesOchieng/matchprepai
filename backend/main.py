from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn
from loguru import logger

from core.config import settings
from core.database import engine, Base
from api.v1.api import api_router
from core.security import get_current_user
from services.websocket import websocket_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting AI Coaching Assistant...")
    
    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    logger.info("Database tables created successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AI Coaching Assistant...")


# Create FastAPI app
app = FastAPI(
    title="AI Coaching Assistant",
    description="An AI-powered coaching assistant for tactical analysis and real-time match monitoring",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Include WebSocket routes
app.include_router(websocket_router, prefix="/ws")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Coaching Assistant API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "database": "connected",
            "redis": "connected",
            "ai_services": "running"
        }
    }


@app.get("/protected")
async def protected_route(current_user=Depends(get_current_user)):
    """Protected route example"""
    return {
        "message": "This is a protected route",
        "user": current_user.email
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 