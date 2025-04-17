#!/bin/bash

# =============================================================================
# Script: install_required_software.sh
# Purpose: Install all required software for the Basis project
# Description: This script automates the installation of all required software
#   for the Basis project, including:
#   - Node.js and npm (via setup_node.sh)
#   - Python 3.12 (via setup_python.sh)
#   - Nginx (via setup_nginx.sh)
#   - MongoDB (via setup_mongodb.sh)
#   - CloudWatch Agent (via setup_cloudwatch_agent.sh)
# 
# Usage: ./install_required_software.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    echo "✅ $1 version: $2"
}

# Update package list
echo "Updating package list..."
sudo apt update

# Install required packages
echo "Installing required packages..."
sudo apt install -y software-properties-common


./setup_node.sh
./setup_python.sh
./setup_nginx.sh
# ./setup_mongodb.sh  # Do not install mongo unless needed. Its slows down EC2 instance.
./setup_cloudwatch_agent.sh

echo "✅ All required software has been installed successfully!"

# Installs Project Dependencies
cd /home/ubuntu/basis/auth/frontend
npm install

# Start the Next.js application
pm2 start "npm run dev" --name "basis" -- -p 3000

# ❌ : next is runnig on port 3000, but the frontend is not working.
# ❌ : Module not found: Can't resolve './google_oauth.json'