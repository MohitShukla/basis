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

## Change permission of pen file
```chmod 400 /Users/mohit.shukla/development/aws_pem_files/basis-mumbai-prod-key.pem```

## SSH Access

### Production Server
```bash
ssh -v -i "/Users/mohit.shukla/development/aws_pem_files/basis-mumbai-prod-key.pem" ubuntu@13.203.238.18
```

new elastic IP: 13.203.238.18

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

## Configure .env
```bash
cd ~/basis/auth/frontend
cp .env_example.sh .env
```
Add all missing values in .env


## Elastic IP for The Server
Go to EC2 > Elastic IPs
Allocte a new IP > Associate Elastic IP address


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