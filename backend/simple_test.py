#!/usr/bin/env python3
"""
Simple test script to verify basic backend functionality
"""

import asyncio
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

async def test_basic_imports():
    """Test basic imports"""
    try:
        from fastapi import FastAPI
        print("✅ FastAPI imported successfully")
        
        from sqlalchemy import create_engine
        print("✅ SQLAlchemy imported successfully")
        
        from pydantic import BaseModel
        print("✅ Pydantic imported successfully")
        
        return True
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False

async def test_config():
    """Test configuration"""
    try:
        from core.config import settings
        print(f"✅ Configuration loaded: {settings.APP_NAME}")
        return True
    except Exception as e:
        print(f"❌ Configuration failed: {e}")
        return False

async def test_models():
    """Test model imports"""
    try:
        from models.user import User
        print("✅ User model imported successfully")
        return True
    except Exception as e:
        print(f"❌ Model import failed: {e}")
        return False

async def test_api():
    """Test API imports"""
    try:
        from api.v1.endpoints.auth import router
        print("✅ Auth API imported successfully")
        return True
    except Exception as e:
        print(f"❌ API import failed: {e}")
        return False

async def main():
    """Run basic tests"""
    print("🧪 Testing Basic Backend Setup")
    print("=" * 40)
    
    tests = [
        ("Basic Imports", test_basic_imports),
        ("Configuration", test_config),
        ("Models", test_models),
        ("API Endpoints", test_api),
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
    
    print("\n" + "=" * 40)
    print("📊 Test Results:")
    print("=" * 40)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 Basic setup is working! You can start the server.")
        print("\n🚀 To start the backend server:")
        print("   python -m uvicorn main:app --reload")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main()) 