# AWS Infrastructure Setup

This document outlines the AWS infrastructure setup for the Basis project.

✅ 🚧 ❌

## EC2 Instances

### Development Server (basis-dev)
- **Public IP**: 13.61.2.96
- **Instance Type**: t2.micro (free tier)
- **AMI**: Ubuntu Server 22.04 LTS
- **Key Pair**: basis-dev-key.pem
- **Security Group Rules**:
  - SSH (22)
  - HTTP (80)
  - HTTPS (443)
  - Custom TCP (3000) - Next.js
  - Custom TCP (8000) - Python backend

### Production Server (basis-prod)
- **Public IP**: 51.20.32.201
- **Instance Type**: t2.small
- **AMI**: Ubuntu Server 22.04 LTS
- **Key Pair**: basis-prod-key.pem
- **Security Group Rules**:
  - SSH (22)
  - HTTP (80)
  - HTTPS (443)
  - Custom TCP (3000) - Next.js
  - Custom TCP (8000) - Python backend

## SSH Access

### Development Server
```bash
ssh -i "/Users/mohit.shukla/development/aws_pem_files/basis-dev-key.pem" ubuntu@13.61.2.96
```

### Production Server
```bash
ssh -i "/Users/mohit.shukla/development/aws_pem_files/basis-prod-key.pem" ubuntu@51.20.32.201
```



## Server Setup

### Initial Setup
1. Connect to the server using SSH
2. ✅ Clone the repository

```bash
# clone basis project
git clone https://github.com/MohitShukla/basis.git
```


3. ❌ Run the installation script:
   ```bash
   cd /path/to/basis
   chmod +x deployment/install_required_software.sh
   ./deployment/install_required_software.sh
   ```
   This script will install all required software including Node.js, PM2, Python, pip, and nginx.
   
   See [install_required_software.sh](../deployment/install_required_software.sh) for details of what gets installed.


### Required Software Installation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Python and pip
sudo apt install -y python3-pip python3-venv

# Install nginx
sudo apt install -y nginx

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
```

### Nginx Configuration

#### Frontend Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Backend Configuration
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL Setup
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificates
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

## Monitoring

### CloudWatch Agent Setup
```bash
# Install CloudWatch agent
sudo apt install -y amazon-cloudwatch-agent

# Configure CloudWatch
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

## Backup Strategy

### Automated Backups
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --out $BACKUP_DIR/mongodb_$DATE

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /home/ubuntu/basis

# Keep only last 7 days of backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
find $BACKUP_DIR -type f -mtime +7 -exec rm -f {} \;
```

## Security Considerations

1. **Key Pair Management**
   - Keep .pem files secure
   - Use appropriate permissions (400)
   - Don't commit .pem files to version control

2. **Security Group Rules**
   - Limit SSH access to specific IPs
   - Use HTTPS for all web traffic
   - Regularly review and update security group rules

3. **Updates and Patches**
   - Regular system updates
   - Security patches
   - Dependency updates

## Troubleshooting

### Common Issues

1. **SSH Connection Issues**
   - Check .pem file permissions
   - Verify security group rules
   - Check instance status

2. **Service Issues**
   - Check PM2 logs: `pm2 logs`
   - Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
   - Check application logs

3. **SSL Issues**
   - Verify domain DNS settings
   - Check Certbot logs
   - Verify Nginx configuration 