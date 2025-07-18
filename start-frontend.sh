#!/bin/bash

echo "🚀 Starting AI Coaching Assistant Frontend..."

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Start the frontend
echo "🌐 Starting Next.js development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd frontend
npm run dev 