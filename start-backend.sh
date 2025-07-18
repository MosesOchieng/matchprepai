#!/bin/bash

echo "🚀 Starting AI Coaching Assistant Backend..."

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp env.example .env
    echo "⚠️  Please update .env with your configuration if needed"
fi

# Test the setup
echo "🧪 Testing backend setup..."
python test_setup.py

# Start the server
echo "🌐 Starting FastAPI server..."
echo "   API will be available at: http://localhost:8000"
echo "   API docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 