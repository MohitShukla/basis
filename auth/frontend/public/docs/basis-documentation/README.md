# Basis Documentation

Welcome to the Basis project documentation. This documentation will guide you through setting up, developing, and deploying the Basis application.

## Table of Contents

### Getting Started
- [Installation Guide](getting-started/installation.md)
- [Configuration Guide](getting-started/configuration.md)
- [Development Setup](getting-started/development.md)

### Architecture
- [System Overview](architecture/overview.md)
- [Frontend Architecture](architecture/frontend.md)
- [Backend Architecture](architecture/backend.md)
- [Database Design](architecture/database.md)

### Deployment
- [AWS Infrastructure Setup](deployment/aws-setup.md)
- [CI/CD Pipeline](deployment/ci-cd.md)
- [Monitoring and Logging](deployment/monitoring.md)

### API Documentation
- [API Endpoints](api/endpoints.md)
- [Authentication](api/authentication.md)

### Contributing
- [Contribution Guidelines](contributing/guidelines.md)
- [Code Style Guide](contributing/code-style.md)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/MohitShukla/basis.git
cd basis
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

4. Start the development servers:
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

## Project Overview

Basis is a full-stack application built with:
- Frontend: Next.js, React, TypeScript
- Backend: Python FastAPI
- Database: MongoDB
- Infrastructure: AWS EC2
- CI/CD: GitHub Actions

## Support

For support, please:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the development team

## License

[Your License Information] 