# Architecture

## System Components and Tech Stack

1. **Code Quality**
   - **Github:** for version control
   - SonarQube : Because Basis cares about code quality, technical debt, and early detection of bugs or security issues more than adding new features.
   
1. **Frontend**
   - React/Next.js web application
   - Bootstrap for UI components
   - Real-time updates using WebSocket
   - File upload with progress tracking

1. **Backend**
   - Python FastAPI/Django REST framework
   - JWT-based authentication
   - Role-based access control (RBAC)
   - WebSocket server for real-time features

1. **Database**
   - MongoDB for document storage
   - Redis for caching and session management
   - Collections structure:
     - Users
     - Groups
     - Content
     - Permissions

1. **AI/ML Layer**
   - OpenAI GPT API integration
   - Vector database (e.g., Pinecone) for semantic search
   - Document embedding pipeline
   - Query processing and response generation

1. **File Storage**
   - AWS S3
   - File metadata stored in MongoDB
   - File access control through signed URLs

1. **Authentication**
   - OAuth 2.0 for social login (Google)
   - JWT for session management
   - Role-based permissions system

1. **API Gateway**
   - RESTful API endpoints
   - Webhook system for external integrations
   - Rate limiting and request validation




## Data Flow

1. **Content Creation**
   ```bash
   User -> Frontend -> API Gateway -> Backend -> MongoDB
                                    -> S3 (for files)
                                    -> AI Service (for indexing)
   ```

2. **Query Processing**
   ```bash
   User Query -> Frontend -> Backend -> Vector DB
                                    -> AI Service
                                    -> Response Generation
   ```

3. **Real-time Updates**
   ```bash
   User Action -> WebSocket -> Backend -> WebSocket -> Other Users
   ```

## Security Considerations

1. **Data Privacy**
   - End-to-end encryption for sensitive data
   - Group-level data isolation
   - Access control at document level

2. **Authentication & Authorization**
   - Multi-factor authentication
   - Session management
   - Role-based access control

3. **API Security**
   - Rate limiting
   - Request validation
   - API key management

## Deployment Architecture

1. **Cloud Deployment**
   - Containerized using Docker
   - Kubernetes for orchestration
   - Load balancing and auto-scaling
   - CDN for static content

2. **On-prem Deployment**
   - Docker Compose for local development
   - Single-server deployment option
   - Backup and recovery procedures

## Features

- Modern web interface built with Next.js
- Python backend with FastAPI
- MongoDB database integration
- ChatGPT API integration
- Authentication with Google OAuth
- Real-time updates
- Responsive design

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Python, FastAPI
- **Database**: MongoDB
- **Authentication**: Google OAuth
- **AI Integration**: ChatGPT API
- **Deployment**: AWS (Amplify, Elastic Beanstalk)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- MongoDB
- AWS Account
- ChatGPT API Key
- Google OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/basis.git
   cd basis
   ```

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   
   # Set up Google OAuth
   cp auth/frontend/app/google_oauth.example.json auth/frontend/app/google_oauth.json
   # Edit google_oauth.json with your Google OAuth credentials
   ```

3. Backend Setup:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start Development Servers:
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev

   # Terminal 2 - Backend
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   ```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth2 API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
5. Download the credentials and save them as `auth/frontend/app/google_oauth.json`


# Tech Stack



Overview of tech stack:
- Nginx
- CloudWatch Agent
- Next.js
- Typescript
- Python
- Mongodb

# Nginx
Nginx is used for:
- **Reverse Proxy:** reverse proxy for Next.js frontend application. This provides an **additional layer of security** by not exposing your Node.js server directly to the internet
- **Load Balancing:** When application is scaled to multiple instances, Nginx will distribute traffic across them improving application availability
- **SSL/TLS Termination**: Nginx will handle SSL/TLS encryption/decryption when we setup HTTPS for the application. It's more efficient to handle SSL at the Nginx level than at the application level
- **Static File Serving**: This improves performance and reduces load on your application server
-- **Security**: Provides protection against common web vulnerabilities. 


# CloudWatch Agent
CloudWatch Agent is an AWS service that helps you monitor your EC2 instances and collect metrics/logs.

## What is CloudWatch Agent?
- Software agent that runs on your EC2 instances
- Collects system-level metrics and logs
- Sends data to AWS CloudWatch for monitoring and analysis

## What it Monitors

### System Metrics
- CPU usage
- Memory usage 
- Disk I/O
- Network traffic

### Application Logs
- Nginx logs
- Application logs
- System logs

### Custom Metrics
- MongoDB performance
- Node.js application metrics
- Python backend metrics

## Benefits
- Real-time monitoring
- Performance tracking
- Log aggregation
- Alert setting
- Historical data analysis