# AWS Infrastructure Setup

This document outlines the AWS infrastructure setup for the Basis project.

✅ 🚧 ❌

## EC2 Instances

## Setup  EC2 as following
  Name: basis-prod or basis-test, etc
  AMI: Ubuntu Server 22.04 LTS. 64-bit (x86)
  Instance type: t3.small (2 vCPU, 2GB RAM) (not t2 micro free)
  Key pair: basis-mumbai-prod-key basis-dev-key.pem
  Network settings: 
    - VPC: Create new
    - Subnet: Create new
    - Security group: Create new
      - Allow SSH (22)
      - Allow HTTP (80)
      - Allow HTTPS (443)
      - Allow Custom TCP (3000) for Next.js
      - Allow Custom TCP (8000) for Python backend
  Root volume: 16 GB gp3



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
ssh -i "/Users/mohit.shukla/development/aws_pem_files/basis-prod1-key.pem" ubuntu@51.20.65.120
```

> 🔵🔵🔵 (17-April-25) Note: main branch running on produciton server

## Server Setup

### Initial Setup
1. Connect to the server using SSH
2. ✅ Clone the repository, if not already there

```bash
# clone basis project
cd /home/ubuntu
git clone https://github.com/MohitShukla/basis.git
cd basis
git pull origin main
./deployment/install_required_software.sh  # Run script to install required software
```

See [install_required_software.sh](../deployment/install_required_software.sh) for details of what gets installed.






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