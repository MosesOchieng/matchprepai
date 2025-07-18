# 🚀 AI Coaching Assistant - Setup Guide

## Quick Start (Recommended)

### 1. Start the Backend
```bash
./start-backend.sh
```

### 2. Start the Frontend (in a new terminal)
```bash
./start-frontend.sh
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Manual Setup (Alternative)

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Redis

### Step 1: Database Setup
```bash
# Start PostgreSQL
brew services start postgresql@14

# Start Redis
brew services start redis

# Create database and user
psql postgres -c "CREATE USER coaching_user WITH PASSWORD 'coaching_password';"
psql postgres -c "CREATE DATABASE coaching_db OWNER coaching_user;"
```

### Step 2: Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp env.example .env

# Test setup
python test_setup.py

# Start server
python -m uvicorn main:app --reload
```

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Configuration

### Backend (.env)
```env
# Application
APP_NAME=AI Coaching Assistant
DEBUG=true

# Security
SECRET_KEY=your-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database
DATABASE_URL=postgresql://coaching_user:coaching_password@localhost:5432/coaching_db
REDIS_URL=redis://localhost:6379

# CORS
ALLOWED_HOSTS=["http://localhost:3000"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## Troubleshooting

### Common Issues

1. **PostgreSQL Connection Error**
   ```bash
   # Check if PostgreSQL is running
   brew services list | grep postgresql
   
   # Start if not running
   brew services start postgresql@14
   ```

2. **Redis Connection Error**
   ```bash
   # Check if Redis is running
   brew services list | grep redis
   
   # Start if not running
   brew services start redis
   ```

3. **Python Virtual Environment Issues**
   ```bash
   # Remove and recreate virtual environment
   rm -rf backend/venv
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Node.js Dependencies Issues**
   ```bash
   # Clear node_modules and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### Port Conflicts

If you get port conflicts, you can change the ports:

**Backend (in backend/.env):**
```env
PORT=8001
```

**Frontend (in frontend/package.json):**
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

## API Testing

Once the backend is running, you can test the API:

1. **Health Check**: http://localhost:8000/health
2. **API Documentation**: http://localhost:8000/docs
3. **Interactive API Testing**: http://localhost:8000/docs

## Database Management

### Connect to PostgreSQL
```bash
psql -U coaching_user -d coaching_db -h localhost
```

### View Tables
```sql
\dt
```

### Reset Database
```bash
psql postgres -c "DROP DATABASE IF EXISTS coaching_db;"
psql postgres -c "CREATE DATABASE coaching_db OWNER coaching_user;"
```

## Development Workflow

1. **Start Services**: Use the startup scripts
2. **Make Changes**: Edit code in your preferred editor
3. **Test Changes**: Check the API docs and frontend
4. **Restart if Needed**: The servers auto-reload on changes

## Production Deployment

For production deployment, consider:
- Using Docker containers
- Setting up proper environment variables
- Configuring a reverse proxy (nginx)
- Setting up SSL certificates
- Using a production database

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the logs in the terminal
3. Check the API documentation
4. Open an issue in the repository 