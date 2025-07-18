#!/bin/bash

echo "🚀 Setting up AI Coaching Assistant (Minimal Setup)..."

# Navigate to backend directory
cd backend

# Remove existing virtual environment if it exists
if [ -d "venv" ]; then
    echo "🗑️ Removing existing virtual environment..."
    rm -rf venv
fi

# Create new virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip and install setuptools
echo "📦 Upgrading pip and installing setuptools..."
pip install --upgrade pip setuptools wheel

# Install minimal dependencies
echo "📦 Installing minimal dependencies..."
pip install -r requirements-minimal.txt

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp env.example .env
    echo "⚠️  Please update .env with your configuration if needed"
fi

# Test basic setup
echo "🧪 Testing basic setup..."
python simple_test.py

echo "✅ Minimal setup complete!"
echo ""
echo "🚀 To start the server:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python -m uvicorn main:app --reload"
echo ""
echo "🌐 Server will be available at: http://localhost:8000" 