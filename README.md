# SQL Injection Playground - Full Stack POC

A comprehensive full-stack proof of concept application demonstrating SQL injection vulnerabilities and security concepts.

## 🏗️ Architecture

This project consists of three main components:
- **Frontend**: React application for user interaction
- **Backend**: Node.js API server handling requests
- **Database**: MySQL database with migration system

## 🚀 Quick Setup Guide

### Prerequisites
- Git
- Node.js (v16 or higher)
- Docker & Docker Compose
- npm

### Step 1: Clone Repositories

Clone all three required repositories. Make sure you clone all three repos inside the same folder, the resultant file should look like:

parent_folder_of_your_choice/
- SQLInjectionPlayground-frontend
- SQLInjectionPlayground-backend
- SQLInjectionPlayground-mysql

```bash
# You can copy the link and go to the repo directly if you wish
# Frontend repository
git clone https://github.com/MarcoC0626/SQLInjectionPlayground-frontend.git

# Backend repository  
git clone https://github.com/MarcoC0626/SQLInjectionPlayground-backend.git

# MySQL repository
git clone https://github.com/MarcoC0626/SQLInjectionPlayground-mysql.git
```

### Step 2: Start Services with Docker

Navigate to the frontend folder and build all services:

```bash
cd SQLInjectionPlayground-frontend
docker-compose up --build
```

This will start:
- Frontend service on port 3000
- Backend service on port 3001  
- MySQL database on port 3306

### Step 3: Setup Database

After building, open a new terminal, navigate to the MySQL folder and install dependencies:

```bash
cd SQLInjectionPlayground-mysql
npm install
```

### Step 4: Run Database Migrations

Execute the database migrations to set up the schema and seed data:

```bash
npm run migrate:up
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

🎉 **You're all set!** The SQL Injection Playground is now running.

## 📚 Available Scripts

### Frontend
```bash
cd SQLInjectionPlayground-frontend
docker-compose up          # Start services
docker-compose down        # Stop services
docker-compose logs        # View logs
```

### Database Migrations
```bash
cd SQLInjectionPlayground-mysql
npm run migrate:up         # Run migrations
npm run migrate:down       # Rollback migrations
npm run migrate:status     # Check migration status
```

## 🔧 Configuration

### Environment Variables
The application uses the following default configuration:

**Frontend:**
- Port: 3000
- API URL: http://localhost:3001/api

**Backend:**
- Port: 3001
- Database Host: mysql (Docker network)

**Database:**
- Port: 3306
- Database: SQLInjectionPlayground
- Username: root
- Password: rootpassword

## 🐳 Docker Services

The `docker-compose.yml` creates three services:

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| frontend | sqlinjectionplayground-frontend | 3000 | React application |
| backend | sqlinjectionplayground-backend | 3001 | Node.js API server |
| mysql | sqlinjectionplayground-mysql | 3306 | MySQL database |

## 🔍 Troubleshooting

### Common Issues

**Container name conflicts:**
```bash
docker-compose down
docker-compose up --force-recreate
```

**Database connection issues:**
- Ensure MySQL container is healthy before running migrations
- Check that all services are on the same Docker network

**Migration failures:**
- Verify MySQL is running: `docker ps`
- Check database connectivity from migration folder

**Port conflicts:**
- Ensure ports 3000, 3001, and 3306 are available
- Modify port mappings in `docker-compose.yml` if needed

### Logs
View service logs:
```bash
docker-compose logs frontend
docker-compose logs backend  
docker-compose logs mysql
```

## 🛡️ Security Notice

⚠️ **Warning**: This is a security demonstration application that intentionally contains vulnerabilities. 

**Do not deploy to production environments.**

## 🧪 Development

For development purposes:

1. Services auto-reload on code changes via volume mounts
2. Frontend supports hot reloading
3. Backend restarts automatically on file changes
4. Database data persists via Docker volumes

## 📝 License

This project is for educational purposes only.
