#!/bin/bash

# =============================================================================
# Script: install_required_software.sh
# Purpose: Install all required software for the Basis project on Ubuntu servers
# Description: This script automates the installation of dependencies including:
#   - Node.js and npm (latest LTS)
#   - PM2 process manager (latest version)
#   - Python and pip (latest version)
#   - Nginx web server (latest version)
#   - MongoDB database (latest version)
# Usage: ./install_required_software.sh
# =============================================================================

# Clone the repository
git clone https://github.com/MohitShukla/basis.git

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    echo "✅ $1 version: $2"
}

# ✅ Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ✅ Install Node.js (latest LTS)
echo "Installing Node.js (latest LTS)..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
print_version "Node.js" "$(node --version)"
print_version "npm" "$(npm --version)"

# ✅ Update npm (Node Package Manager) to latest version
echo "Updating npm to latest version..."
sudo npm install -g npm@latest
print_version "npm (updated)" "$(npm --version)"

# ✅ Install PM2 (Process Manager 2) globally (latest version)
echo "Installing PM2 (latest version)..."
sudo npm install -g pm2@latest
print_version "PM2" "$(pm2 --version)"

# ✅ Install Python and pip (latest version)
echo "Installing Python and pip (latest version)..."
sudo apt install -y software-properties-common # provides several important tools for managing software repositories and package sources. 
sudo add-apt-repository -y ppa:deadsnakes/ppa # The deadsnakes PPA (Personal Package Archive) provides newer versions of Python than those available in the default Ubuntu repositories. 
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3-pip
print_version "Python" "$(python3 --version)"
print_version "pip" "$(pip3 --version)"

# Install nginx (latest version)
echo "Installing Nginx (latest version)..."
sudo apt install -y nginx
print_version "Nginx" "$(nginx -v 2>&1)"

# Install MongoDB (latest version - 8.0)
echo "Installing MongoDB (latest version - 8.0)..."
# First, install libssl1.1 which is required by MongoDB 8.0
echo "Installing libssl1.1 dependency..."
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
rm libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# Now install MongoDB 8.0
wget -qO - https://www.mongodb.org/static/pgp/server-8.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update
sudo apt install -y mongodb-org
print_version "MongoDB" "$(mongod --version | head -n 1)"

echo "✅ All software installed successfully!"