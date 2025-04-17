#!/bin/bash

# =============================================================================
# Script: setup_node.sh
# Purpose: Install and configure Node.js and related tools for the Basis project
# Description: This script automates the installation of:
#   - Node.js (latest LTS version)
#   - npm (Node Package Manager)
#   - PM2 (Process Manager 2)
# 
# These tools are used for:
#   - Running the Next.js frontend application
#   - Managing Node.js processes in production
#   - Installing and updating JavaScript dependencies
# 
# Usage: ./setup_node.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    ./note "✅ $1 version: $2"
}

# ---------------
# Node.js
# ---------------
# ✅ Install Node.js (latest LTS)
./note "Installing Node.js (latest LTS)..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
print_version "Node.js" "$(node --version)"
print_version "npm" "$(npm --version)"

# ✅ Update npm (Node Package Manager) to latest version
./note "Updating npm to latest version..."
sudo npm install -g npm@latest
print_version "npm (updated)" "$(npm --version)"

# ✅ Install PM2 (Process Manager 2) globally (latest version)
./note "Installing PM2 (latest version)..."
sudo npm install -g pm2@latest
print_version "PM2" "$(pm2 --version)"

./note "✅ Node.js setup completed successfully!" sucess