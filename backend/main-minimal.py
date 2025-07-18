from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from loguru import logger

# Create FastAPI app
app = FastAPI(
    title="AI Coaching Assistant",
    description="An AI-powered coaching assistant for tactical analysis and real-time match monitoring",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Coaching Assistant API",
        "version": "1.0.0",
        "status": "running",
        "mode": "minimal"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "database": "not configured",
            "redis": "not configured",
            "ai_services": "not configured"
        },
        "mode": "minimal"
    }

@app.get("/api/v1/auth/test")
async def test_auth():
    """Test authentication endpoint"""
    return {
        "message": "Authentication endpoint available",
        "status": "working"
    }

@app.post("/api/v1/auth/register")
async def register_user():
    """Register user endpoint (placeholder)"""
    return {
        "message": "User registration endpoint",
        "status": "placeholder - full implementation requires complete setup"
    }

@app.post("/api/v1/auth/login")
async def login_user():
    """Login user endpoint (placeholder)"""
    return {
        "message": "User login endpoint",
        "status": "placeholder - full implementation requires complete setup"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main-minimal:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 