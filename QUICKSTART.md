# 🚀 Quick Start Guide - AI Coaching Assistant

Get your AI-powered coaching assistant up and running in minutes!

## Prerequisites

- **Docker & Docker Compose** - [Install Docker](https://docs.docker.com/get-docker/)
- **Git** - [Install Git](https://git-scm.com/downloads)
- **4GB+ RAM** - For running all services
- **10GB+ Disk Space** - For models and data

## 🎯 Quick Setup (5 minutes)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-coaching-assistant
```

### 2. Configure Environment
```bash
cp env.example .env
# Edit .env with your API keys and settings
```

### 3. Start All Services
```bash
chmod +x setup.sh
./setup.sh
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **Admin Panel**: http://localhost:15672 (RabbitMQ)

## 🔧 Manual Setup

If you prefer manual setup:

### 1. Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit .env with your settings:
# - Add your OpenAI API key
# - Configure database passwords
# - Set up AWS credentials (optional)
```

### 2. Start Services
```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps
```

### 3. Initialize Database
```bash
# Run migrations
docker-compose exec backend python -m alembic upgrade head

# Create admin user
docker-compose exec backend python -m scripts.create_admin
```

## 🎮 Using the Application

### First Steps
1. **Register/Login** - Create your coach account
2. **Add Your Team** - Set up team information
3. **Upload Match Video** - Start with a sample match
4. **View Analysis** - Explore AI-generated insights

### Key Features
- **📊 Dashboard** - Overview of team performance
- **🎥 Video Analysis** - Upload and analyze match footage
- **🧠 AI Assistant** - Get tactical recommendations
- **📈 Analytics** - Detailed performance metrics
- **⚽ Live Monitoring** - Real-time match analysis

## 🔍 Troubleshooting

### Common Issues

**Services won't start:**
```bash
# Check Docker is running
docker --version

# Check available ports
netstat -tulpn | grep :8000

# View service logs
docker-compose logs backend
```

**Database connection issues:**
```bash
# Restart database services
docker-compose restart postgres redis neo4j

# Check database health
docker-compose exec postgres pg_isready
```

**AI models not loading:**
```bash
# Check model downloads
docker-compose logs computer-vision

# Restart AI services
docker-compose restart computer-vision tactical-analysis
```

### Performance Optimization

**For better performance:**
- Use GPU-enabled Docker (for AI services)
- Increase Docker memory allocation (8GB+ recommended)
- Use SSD storage for faster I/O
- Enable Docker BuildKit: `export DOCKER_BUILDKIT=1`

## 📚 Next Steps

### Advanced Configuration
- [Production Deployment](docs/deployment.md)
- [Custom AI Models](docs/ai-models.md)
- [API Integration](docs/api-integration.md)
- [Data Import](docs/data-import.md)

### Development
- [Contributing Guidelines](CONTRIBUTING.md)
- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api.md)

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: support@aicoaching.com

## 🎯 What's Next?

Once you're up and running:

1. **Upload your first match video**
2. **Explore the tactical analysis features**
3. **Set up your team roster**
4. **Configure opponent scouting**
5. **Try the live match monitoring**

---

**Happy Coaching! ⚽🧠**

*Built with ❤️ for the beautiful game* 