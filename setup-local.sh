#!/bin/bash

echo "🚀 Setting up AI Coaching Assistant (Local Installation)..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first:"
    echo "   brew install postgresql@15"
    echo "   brew services start postgresql@15"
    exit 1
fi

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "❌ Redis is not installed. Please install it first:"
    echo "   brew install redis"
    echo "   brew services start redis"
    exit 1
fi

echo "✅ PostgreSQL and Redis are installed"

# Start PostgreSQL service
echo "🐘 Starting PostgreSQL service..."
brew services start postgresql@15

# Start Redis service
echo "🔴 Starting Redis service..."
brew services start redis

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 5

# Create database and user
echo "🗄️ Setting up database..."
psql postgres -c "CREATE USER coaching_user WITH PASSWORD 'coaching_password';" 2>/dev/null || echo "User already exists"
psql postgres -c "CREATE DATABASE coaching_db OWNER coaching_user;" 2>/dev/null || echo "Database already exists"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE coaching_db TO coaching_user;" 2>/dev/null || echo "Privileges already granted"

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

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd backend
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
cd ..

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd frontend
npm install
cd ..

echo "✅ Local setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your configuration"
echo "2. Start the backend: cd backend && python3 -m uvicorn main:app --reload"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Services will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo ""
echo "🔧 Useful commands:"
echo "- Stop PostgreSQL: brew services stop postgresql@15"
echo "- Stop Redis: brew services stop redis"
echo "- View PostgreSQL logs: tail -f /usr/local/var/log/postgresql@15.log"
echo "- View Redis logs: tail -f /usr/local/var/log/redis.log" 