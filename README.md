# AI Coaching Assistant

An AI-powered coaching assistant for tactical analysis and real-time match monitoring, built with Next.js, FastAPI, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Real-time Match Analysis**: Live tactical insights and recommendations
- **AI-Powered Insights**: Machine learning-based coaching suggestions
- **Team Management**: Player and team performance tracking
- **Video Analysis**: Computer vision for match footage analysis
- **Tactical Planning**: Formation and strategy recommendations
- **Performance Analytics**: Detailed statistics and metrics

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI with Python 3.11, SQLAlchemy, PostgreSQL
- **Database**: PostgreSQL for relational data, Redis for caching, Neo4j for graph data
- **AI Services**: Computer Vision, Tactical Analysis, Video Intelligence
- **Real-time**: WebSocket connections for live updates

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ and npm
- Python 3.11+

## 🛠️ Quick Setup

### Option 1: Using the Setup Script (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd ai-coaching-assistant

# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Start Database Services**
```bash
docker-compose up -d postgres redis neo4j
```

2. **Configure Backend**
```bash
cd backend
cp env.example .env
# Edit .env with your configuration
pip install -r requirements.txt
```

3. **Configure Frontend**
```bash
cd frontend
npm install
```

4. **Start Services**
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Neo4j**: http://localhost:7474

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Matches
- `GET /api/v1/matches` - Get all matches
- `POST /api/v1/matches` - Create new match
- `GET /api/v1/matches/{id}` - Get specific match
- `PUT /api/v1/matches/{id}` - Update match
- `DELETE /api/v1/matches/{id}` - Delete match

### Teams
- `GET /api/v1/teams` - Get all teams
- `POST /api/v1/teams` - Create new team
- `GET /api/v1/teams/{id}` - Get specific team
- `PUT /api/v1/teams/{id}` - Update team
- `DELETE /api/v1/teams/{id}` - Delete team

### Players
- `GET /api/v1/players` - Get all players
- `POST /api/v1/players` - Create new player
- `GET /api/v1/players/{id}` - Get specific player
- `PUT /api/v1/players/{id}` - Update player
- `DELETE /api/v1/players/{id}` - Delete player

### Analysis
- `GET /api/v1/analysis/match/{id}` - Get match analysis
- `GET /api/v1/analysis/team/{id}/performance` - Get team performance
- `GET /api/v1/analysis/player/{id}/stats` - Get player statistics

### AI Assistant
- `POST /api/v1/ai/recommendations` - Get AI recommendations
- `POST /api/v1/ai/match-prediction` - Predict match outcome
- `POST /api/v1/ai/opponent-analysis` - Analyze opponent
- `POST /api/v1/ai/training-suggestions` - Get training suggestions

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    role VARCHAR(50) DEFAULT 'coach',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    team_id INTEGER,
    preferences TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Application
APP_NAME=AI Coaching Assistant
DEBUG=true

# Security
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database
DATABASE_URL=postgresql://coaching_user:coaching_password@localhost:5432/coaching_db
REDIS_URL=redis://localhost:6379

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=coaching_password

# CORS
ALLOWED_HOSTS=["http://localhost:3000"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment
1. Set up PostgreSQL, Redis, and Neo4j on your server
2. Configure environment variables
3. Deploy backend to your server
4. Build and deploy frontend
5. Set up reverse proxy (nginx)

## 📁 Project Structure

```
ai-coaching-assistant/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   └── services/        # API services
│   └── package.json
├── backend/                  # FastAPI backend
│   ├── api/                 # API routes
│   ├── core/                # Core configuration
│   ├── models/              # Database models
│   ├── services/            # Business logic
│   └── main.py
├── ai-services/             # AI microservices
│   ├── computer-vision/     # Computer vision service
│   ├── tactical-analysis/   # Tactical analysis service
│   └── video-intelligence/  # Video intelligence service
├── docker-compose.yml       # Docker services
└── setup.sh                 # Setup script
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🔄 Updates

Stay updated with the latest features and improvements by checking the releases page. 