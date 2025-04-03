# Tech Stack

Overview of tech stack:
- Nginx
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
