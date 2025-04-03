#!/bin/bash

# =============================================================================
# Script: configure_nginx.sh
# Purpose: Configure Nginx for the Basis project
# Description: This script sets up Nginx as a reverse proxy for:
#   - Next.js frontend (port 3000)
#   - Python backend (port 8000)
# WHEN IP CHNAGES: run the script again with the new IP address when your EC2 instance's IP changes. This is a common scenario with EC2 instances, especially when they are stopped and started again. 
#
# Best Practices to handle IP Changes:
# 1. Assign an Elastic IP to your EC2 instance
# 2. Use a domain name instead of an IP address
# 
# Usage: ./configure_nginx.sh
# =============================================================================

# Get the server's public IP address
echo "Detecting server IP address..."
SERVER_IP=$(curl -s ifconfig.me)

if [ -z "$SERVER_IP" ]; then
    echo "Error: Could not detect server IP address"
    exit 1
fi

echo "Server IP detected: ${SERVER_IP}"

# Create necessary directories
echo "Creating Nginx configuration directories..."
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# Create frontend configuration
echo "Creating frontend configuration..."
sudo tee /etc/nginx/sites-available/frontend > /dev/null << EOF
server {
    listen 80;
    server_name ${SERVER_IP};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Create backend configuration
echo "Creating backend configuration..."
sudo tee /etc/nginx/sites-available/backend > /dev/null << EOF
server {
    listen 80;
    server_name ${SERVER_IP};

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable configurations
echo "Enabling Nginx configurations..."
sudo ln -sf /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/

# Remove default configuration if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# If test is successful, restart Nginx
if [ $? -eq 0 ]; then
    echo "Nginx configuration test successful. Restarting Nginx..."
    sudo systemctl restart nginx
else
    echo "Nginx configuration test failed. Please check the configuration."
    exit 1
fi

echo "✅ Nginx configuration completed!"
echo "Frontend URL: http://${SERVER_IP}"
echo "Backend URL: http://${SERVER_IP}/api" 