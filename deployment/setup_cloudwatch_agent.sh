#!/bin/bash

# =============================================================================
# Script: setup_cloudwatch_agent.sh
# Purpose: Install and configure the AWS CloudWatch Agent for monitoring
# Description: This script automates the installation and configuration of the
#   AWS CloudWatch Agent, which collects metrics and logs from the server and
#   sends them to AWS CloudWatch for monitoring and analysis.
# 
# What it monitors:
#   - System metrics (CPU, memory, disk, swap)
#   - Nginx logs (access and error)
#   - Next.js application logs
#   - Python backend logs
# 
# Usage: ./setup_cloudwatch_agent.sh
# =============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Function to print status messages
print_status() {
    echo "✅ $1"
}

# ---------------
# CloudWatch Agent Installation
# ---------------
echo "Installing CloudWatch agent..."

# Download the CloudWatch agent package
echo "Downloading CloudWatch agent package..."
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

# Install the package
echo "Installing CloudWatch agent package..."
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Clean up
echo "Cleaning up downloaded package..."
rm amazon-cloudwatch-agent.deb

# ---------------
# CloudWatch Agent Configuration
# ---------------
echo "Creating CloudWatch configuration..."

# Create configuration directory if it doesn't exist
sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc/

# Create the configuration file
echo "Setting up monitoring configuration..."
sudo tee /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json > /dev/null << EOF
{
    "agent": {
        "metrics_collection_interval": 60,
        "run_as_user": "cwagent"
    },
    "metrics": {
        "metrics_collected": {
            "cpu": {
                "measurement": ["cpu_usage_idle", "cpu_usage_iowait", "cpu_usage_user", "cpu_usage_system"],
                "metrics_collection_interval": 60,
                "totalcpu": true
            },
            "mem": {
                "measurement": ["mem_used_percent"],
                "metrics_collection_interval": 60
            },
            "swap": {
                "measurement": ["swap_used_percent"],
                "metrics_collection_interval": 60
            },
            "disk": {
                "measurement": ["disk_used_percent"],
                "metrics_collection_interval": 60,
                "resources": ["*"]
            }
        }
    },
    "logs": {
        "logs_collected": {
            "files": {
                "collect_list": [
                    {
                        "file_path": "/var/log/nginx/access.log",
                        "log_group_name": "nginx-access",
                        "log_stream_name": "{instance_id}",
                        "timezone": "UTC"
                    },
                    {
                        "file_path": "/var/log/nginx/error.log",
                        "log_group_name": "nginx-error",
                        "log_stream_name": "{instance_id}",
                        "timezone": "UTC"
                    },
                    {
                        "file_path": "/home/ubuntu/basis/auth/frontend/.next/logs/*.log",
                        "log_group_name": "nextjs-logs",
                        "log_stream_name": "{instance_id}",
                        "timezone": "UTC"
                    },
                    {
                        "file_path": "/home/ubuntu/basis/auth/backend/logs/*.log",
                        "log_group_name": "python-backend-logs",
                        "log_stream_name": "{instance_id}",
                        "timezone": "UTC"
                    }
                ]
            }
        }
    }
}
EOF

# ---------------
# Start and Enable CloudWatch Agent
# ---------------
echo "Starting CloudWatch agent with configuration..."

# Start CloudWatch agent with the configuration file
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json

# Start CloudWatch agent
sudo systemctl start amazon-cloudwatch-agent

# Enable CloudWatch agent to start on boot
sudo systemctl enable amazon-cloudwatch-agent

# Verify the agent is running
if systemctl is-active --quiet amazon-cloudwatch-agent; then
    print_status "CloudWatch agent is running"
else
    echo "❌ CloudWatch agent failed to start. Check logs with: sudo systemctl status amazon-cloudwatch-agent"
    exit 1
fi

echo "✅ CloudWatch agent setup completed successfully!"
echo "You can view your metrics and logs in the AWS CloudWatch console."
