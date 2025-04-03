#!/bin/bash

# =============================================================================
# Script: setup_nginx.sh
# Purpose: Install and configure Nginx for the Basis project
# Description: This script automates the installation of:
#   - Nginx web server (latest version)
# 
# Nginx is used for:
#   - Serving the Next.js frontend application
#   - Acting as a reverse proxy for the Python backend
#   - Handling SSL/TLS termination
#   - Managing static file serving
# 
# Usage: ./setup_nginx.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    echo "✅ $1 version: $2"
}

# ---------------
# Nginx
# ---------------
# ✅ Install Nginx
echo "Installing Nginx..."
sudo apt install -y nginx
print_version "Nginx" "$(nginx -v 2>&1)"

# Start Nginx service
echo "Starting Nginx service..."
sudo systemctl start nginx

# Enable Nginx to start on boot
echo "Enabling Nginx to start on boot..."
sudo systemctl enable nginx

# Verify Nginx is running
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx failed to start. Check logs with: sudo systemctl status nginx"
    exit 1
fi

echo "✅ Nginx setup completed successfully!"

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