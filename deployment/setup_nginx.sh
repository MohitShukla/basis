#!/bin/bash

# =============================================================================
# Script: setup_nginx.sh
# Purpose: Install and configure Nginx for the Basis project
# Description: This script automates the installation of:
#   - Nginx web server (latest version)
#   - Let's Encrypt SSL certificates
# 
# Nginx is used for:
#   - Serving the Next.js frontend application
#   - Acting as a reverse proxy for the Python backend
#   - Handling SSL/TLS termination
#   - Managing static file serving
# 
# Usage: ./setup_nginx.sh [domain_name]
# Example: ./setup_nginx.sh eqbasis.com
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    ./note "✅ $1 version: $2"
}

# Check if domain name is provided as argument or use server IP as fallback
DOMAIN_NAME=$1
if [ -z "$DOMAIN_NAME" ]; then
    ./note "No domain name provided, using server IP instead" warning
    SERVER_IP=$(curl -s ifconfig.me)
    if [ -z "$SERVER_IP" ]; then
        ./note "Error: Could not detect server IP address" error
        exit 1
    fi
    ./note "Server IP detected: ${SERVER_IP}"
    USE_DOMAIN=false
else
    ./note "Using domain: ${DOMAIN_NAME}"
    USE_DOMAIN=true
fi

# ---------------
# Nginx
# ---------------
# ✅ Install Nginx
./note "Installing Nginx..."
sudo apt update
sudo apt install -y nginx
print_version "Nginx" "$(nginx -v 2>&1)"

# Start Nginx service
./note "Starting Nginx service..."
sudo systemctl start nginx

# Enable Nginx to start on boot
./note "Enabling Nginx to start on boot..."
sudo systemctl enable nginx

# Verify Nginx is running
if systemctl is-active --quiet nginx; then
    ./note "✅ Nginx is running" success
else
    ./note "❌ Nginx failed to start. Check logs with: sudo systemctl status nginx" error
    exit 1
fi

# Create necessary directories
./note "Creating Nginx configuration directories..."
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# ---------------
# Configure Nginx
# ---------------
if [ "$USE_DOMAIN" = true ]; then
    # Create domain-based configuration for both www and non-www
    ./note "Creating domain-based Nginx configuration..."
    sudo tee /etc/nginx/sites-available/eqbasis > /dev/null << EOF
server {
    listen 80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    # Enable the domain configuration
    sudo ln -sf /etc/nginx/sites-available/eqbasis /etc/nginx/sites-enabled/
else
    # Create IP-based configuration
    ./note "Creating IP-based Nginx configuration..."
    
    # Frontend configuration
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

    # Backend configuration
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

    # Enable IP-based configurations
    sudo ln -sf /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
    sudo ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
fi

# Remove default configuration if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Test Nginx configuration
./note "Testing Nginx configuration..."
sudo nginx -t

# If test is successful, restart Nginx
if [ $? -eq 0 ]; then
    ./note "Nginx configuration test successful. Restarting Nginx..." success
    sudo systemctl restart nginx
else
    ./note "Nginx configuration test failed. Please check the configuration." error
    exit 1
fi

# ---------------
# SSL Setup with Let's Encrypt (if domain is provided)
# ---------------
if [ "$USE_DOMAIN" = true ]; then
    ./note "Setting up SSL with Let's Encrypt for ${DOMAIN_NAME}..."
    
    # Install Certbot
    sudo apt install -y certbot python3-certbot-nginx
    
    # Obtain SSL certificate
    ./note "Obtaining SSL certificate for ${DOMAIN_NAME} and www.${DOMAIN_NAME}..."
    sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME} --non-interactive --agree-tos --email admin@${DOMAIN_NAME} --redirect
    
    # Set up auto-renewal
    ./note "Setting up automatic SSL renewal..."
    echo "0 3 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null
    
    ./note "✅ SSL setup completed successfully!" success
    ./note "Your website is now accessible at https://${DOMAIN_NAME}" success
else
    ./note "No domain provided, skipping SSL setup." warning
    ./note "To set up SSL later, run: sudo certbot --nginx" info
    ./note "Your website is accessible at http://${SERVER_IP}" info
fi

# Final message
./note "✅ Nginx setup completed successfully!" success
if [ "$USE_DOMAIN" = true ]; then
    ./note "Frontend URL: https://${DOMAIN_NAME}" success
    ./note "Backend API URL: https://${DOMAIN_NAME}/api" success
else
    ./note "Frontend URL: http://${SERVER_IP}" success
    ./note "Backend API URL: http://${SERVER_IP}/api" success
fi

# Provide instructions for updating Google OAuth settings
if [ "$USE_DOMAIN" = true ]; then
    ./note "Don't forget to update your Google OAuth authorized domains:" info
    ./note "- Add ${DOMAIN_NAME} to authorized domains" info
    ./note "- Add https://${DOMAIN_NAME} and https://www.${DOMAIN_NAME} to authorized JavaScript origins" info
    ./note "- Add https://${DOMAIN_NAME}/api/auth/callback/google to authorized redirect URIs" info
fi