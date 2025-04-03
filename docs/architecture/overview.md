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