#!/bin/bash

# =============================================================================
# Script: setup_python.sh
# Purpose: Install and configure Python for the Basis project
# Description: This script automates the installation of:
#   - Python 3.12 (latest version)
#   - Python virtual environment tools
#   - pip (Python package manager)
# 
# Python is used for:
#   - Running the backend API server
#   - Processing data
#   - Managing dependencies for the backend
# 
# Usage: ./setup_python.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print version information
print_version() {
    echo "✅ $1 version: $2"
}

# ---------------
# Python
# ---------------
# ✅ Install Python 3.12
echo "Installing Python 3.12..."
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3.12-dev
print_version "Python" "$(python3.12 --version)"

# ✅ Install pip for Python 3.12
echo "Installing pip for Python 3.12..."
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12
print_version "pip" "$(pip3.12 --version)"

echo "✅ Python setup completed successfully!" 