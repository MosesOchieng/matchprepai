from fastapi import APIRouter
from api.v1.endpoints import auth, matches, teams, players, analysis, ai_assistant

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(matches.router, prefix="/matches", tags=["matches"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(players.router, prefix="/players", tags=["players"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
api_router.include_router(ai_assistant.router, prefix="/ai", tags=["ai-assistant"]) 