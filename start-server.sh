#!/bin/bash

echo "🚀 Starting AI Coaching Assistant Backend Server..."

cd backend

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
fi

# Start the server
echo "🌐 Starting FastAPI server..."
echo "   API will be available at: http://localhost:8000"
echo "   API docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 