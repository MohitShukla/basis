#!/bin/bash

# =============================================================================
# Script: setup_mongodb.sh
# Purpose: Install and configure MongoDB for the Basis project
# Description: This script automates the installation of MongoDB 8.0, including:
#   - Installing required dependencies (libssl1.1)
#   - Setting up the MongoDB repository
#   - Installing MongoDB 8.0
#   - Verifying the installation
# 
# 
# Usage: ./setup_mongodb.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    echo "✅ $1 version: $2"
}

# ---------------
# MongoDB
# ---------------
# Install MongoDB (latest version - 8.0)
echo "Installing MongoDB (latest version - 8.0)..."
# First, install libssl1.1 which is required by MongoDB 8.0
echo "Installing libssl1.1 dependency..."
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
rm libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# ✅ Install MongoDB 8.0
wget -qO - https://www.mongodb.org/static/pgp/server-8.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update
sudo apt install -y mongodb-org
print_version "🔵 MongoDB" "$(mongod --version | head -n 1)"

# Start MongoDB service
echo "Starting MongoDB service..."
sudo systemctl start mongod

# Enable MongoDB to start on boot
echo "Enabling MongoDB to start on boot..."
sudo systemctl enable mongod

# Verify MongoDB is running
if systemctl is-active --quiet mongod; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start. Check logs with: sudo systemctl status mongod"
    exit 1
fi

echo "✅ MongoDB setup completed successfully!"