#!/bin/bash

echo "🚀 Starting AI Coaching Assistant (Minimal Mode)..."

cd backend

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
fi

# Start the minimal server
echo "🌐 Starting FastAPI server (minimal mode)..."
echo "   API will be available at: http://localhost:8000"
echo "   API docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python -m uvicorn main-minimal:app --reload --host 0.0.0.0 --port 8000 