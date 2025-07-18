#!/bin/bash

echo "🚀 Setting up AI Coaching Assistant..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/uploads
mkdir -p backend/logs
mkdir -p frontend/.next

# Copy environment file
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file..."
    cp backend/env.example backend/.env
    echo "⚠️  Please update backend/.env with your actual configuration"
fi

# Start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker-compose up -d postgres redis neo4j

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your configuration"
echo "2. Start the backend: cd backend && python -m uvicorn main:app --reload"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Or use Docker Compose: docker-compose up"
echo ""
echo "🌐 Services will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo "- Neo4j: http://localhost:7474" 