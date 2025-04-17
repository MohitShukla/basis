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
./note "Installing Python 3.12..."
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3.12-dev python3-pip python3-full

print_version "Python" "$(python3.12 --version)"

# ✅ Create a virtual environment for the project
./note "Creating Python virtual environment..."
VENV_PATH="/home/ubuntu/basis/venv"
python3.12 -m venv "$VENV_PATH"

# ✅ Activate the virtual environment and install packages
./note "Activating virtual environment and installing packages..."
source "$VENV_PATH/bin/activate"
"$VENV_PATH/bin/pip" install --upgrade pip
print_version "pip" "$("$VENV_PATH/bin/pip" --version)"

# Optional: Install common packages that your project might need
"$VENV_PATH/bin/pip" install loguru fastapi uvicorn

# Create a convenience script to activate the virtual environment
./note "Creating convenience script for activating the environment..."
cat > /home/ubuntu/basis/activate_python_env.sh << 'EOF'
#!/bin/bash
source "/home/ubuntu/basis/venv/bin/activate"
echo "✅ Python virtual environment activated. Use 'deactivate' to exit."
EOF

chmod +x /home/ubuntu/basis/activate_python_env.sh

./note "✅ Python setup completed successfully!" success


source ~/basis/activate_python_env.sh
./note "Activated Python environment" success