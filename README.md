# Basis

# What is Basis?
Basis contains several modules that are used for any software application development.
- oAuth
- logging
- security
- load balancing


# Collaborative AI-Powered Knowledge Sharing Platform

Software platform that enables groups of users to create private knowledge bases powered by AI, where members can share content and get AI-assisted answers based on their group's collective knowledge.

## Non Functional Stories
- Can be deployed on cloud or on-prem

## System Stories
- Content posted by a group remains private to that group
- Content posted by a group gets added to the knoweldge base of that group
- Content is saved with userid & created_timestamp

## API Interfaces
- API to post content so that external systems system can post content
- Implement webhooks to call APIs of external systems

## User Stories

### Authentication & Groups

**Any User**
- Sign in using my Google/social account
- Create a new group so I can start collaborating with others. Creator of a group is the default owner of the group.

**Group Owner:**
- Invite other users to my group so we can share knowledge
- Assign group owenr permission to others uses in the group 


### Content Management
**Group Member:**  
- Post any text content
- Post files
- Ask questions
  - examples: 
    - "What was Harish doing today?"
    - "Show a summary of work done today"
    - "Who are on leave today?"
    - "Is Sam on leave today?" 

# Stories After MVP
- define structure of document collections (like mongo)
- maintain documents in collections

## For document collections
- define fields, data elements (name, description, labels, domains, etc), domains (data type, constraints)
- define collections in terms of data elements in these collections 

# Architecture

## System Components

1. **Frontend**
   - React/Next.js web application
   - Material-UI or Tailwind CSS for UI components
   - Real-time updates using WebSocket
   - File upload with progress tracking

2. **Backend**
   - Python FastAPI/Django REST framework
   - JWT-based authentication
   - Role-based access control (RBAC)
   - WebSocket server for real-time features

3. **Database**
   - MongoDB for document storage
   - Redis for caching and session management
   - Collections structure:
     - Users
     - Groups
     - Content
     - Permissions

4. **AI/ML Layer**
   - OpenAI GPT API integration
   - Vector database (e.g., Pinecone) for semantic search
   - Document embedding pipeline
   - Query processing and response generation

5. **File Storage**
   - AWS S3 or similar for file storage
   - File metadata stored in MongoDB
   - File access control through signed URLs

6. **Authentication**
   - OAuth 2.0 for social login (Google)
   - JWT for session management
   - Role-based permissions system

7. **API Gateway**
   - RESTful API endpoints
   - Webhook system for external integrations
   - Rate limiting and request validation

## Data Flow

1. **Content Creation**
   ```
   User -> Frontend -> API Gateway -> Backend -> MongoDB
                                    -> S3 (for files)
                                    -> AI Service (for indexing)
   ```

2. **Query Processing**
   ```
   User Query -> Frontend -> Backend -> Vector DB
                                    -> AI Service
                                    -> Response Generation
   ```

3. **Real-time Updates**
   ```
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

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for ChatGPT API
- Google for OAuth
- MongoDB for database
- AWS for hosting infrastructure

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.


