#!/usr/bin/env python3
"""
Test script to verify backend setup and database connectivity
"""

import asyncio
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

async def test_database_connection():
    """Test database connection"""
    try:
        from core.database import engine, init_db
        print("✅ Database engine created successfully")
        
        # Test connection
        async with engine.begin() as conn:
            await conn.execute("SELECT 1")
        print("✅ Database connection successful")
        
        # Initialize database
        await init_db()
        print("✅ Database tables created successfully")
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False
    
    return True

async def test_models():
    """Test model imports"""
    try:
        from models.user import User, UserCreate, UserResponse
        from models.team import Team, TeamCreate, TeamResponse
        from models.player import Player, PlayerCreate, PlayerResponse
        from models.match import Match, MatchCreate, MatchResponse
        print("✅ All models imported successfully")
        return True
    except Exception as e:
        print(f"❌ Model import failed: {e}")
        return False

async def test_services():
    """Test service imports"""
    try:
        from services.user_service import UserService
        from services.websocket import ConnectionManager
        print("✅ All services imported successfully")
        return True
    except Exception as e:
        print(f"❌ Service import failed: {e}")
        return False

async def test_api():
    """Test API imports"""
    try:
        from api.v1.endpoints.auth import router as auth_router
        from api.v1.endpoints.matches import router as matches_router
        from api.v1.endpoints.teams import router as teams_router
        from api.v1.endpoints.players import router as players_router
        from api.v1.endpoints.analysis import router as analysis_router
        from api.v1.endpoints.ai_assistant import router as ai_router
        print("✅ All API endpoints imported successfully")
        return True
    except Exception as e:
        print(f"❌ API import failed: {e}")
        return False

async def test_config():
    """Test configuration"""
    try:
        from core.config import settings
        print(f"✅ Configuration loaded: {settings.APP_NAME}")
        print(f"   Database URL: {settings.DATABASE_URL}")
        print(f"   Redis URL: {settings.REDIS_URL}")
        print(f"   Neo4j URI: {settings.NEO4J_URI}")
        return True
    except Exception as e:
        print(f"❌ Configuration failed: {e}")
        return False

async def main():
    """Run all tests"""
    print("🧪 Testing AI Coaching Assistant Backend Setup")
    print("=" * 50)
    
    tests = [
        ("Configuration", test_config),
        ("Models", test_models),
        ("Services", test_services),
        ("API Endpoints", test_api),
        ("Database Connection", test_database_connection),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n🔍 Testing {test_name}...")
        try:
            result = await test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} test failed with exception: {e}")
            results.append((test_name, False))
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is ready to run.")
        print("\n🚀 To start the backend server:")
        print("   python3 -m uvicorn main:app --reload")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main()) 