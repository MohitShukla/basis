# 🚀 CI/CD Pipeline for Next.js + Python Project (GitHub + AWS)

✅ 🚧 ❌

This guide helps you set up a **CI/CD pipeline** for a project that uses **Next.js for frontend** and **Python for backend**, hosted on **AWS EC2 servers**, with code managed in **GitHub**.

---

# Overview of Setup
## 🛠️ Tools and Services Overview

| Stage                  | Tool/Service              |
|------------------------|---------------------------|
| **Source Control**     | GitHub                   |
| **CI/CD**              | GitHub Actions           |
| **Servers**            | AWS EC2 (or ECS)         |
| **Infra Automation**   | (optional) Terraform / Ansible |
| **Environment Separation** | Git branches (main, dev) | 

## 📁 About Basis Branching 
- ✅ **Root directory:** basis
- ✅ **GitHub repo:** basis (path: https://github.com/MohitShukla/basis).
- ✅ branches:
  - `main`: main production branch
  - `dev`: development branch



## Step 3: Set Up AWS Servers
Provision two EC2 instances or ECS services:
- ✅ `test-server` - for the dev branch. Public IPv4 address: 13.61.2.96
- ✅ `prod-server` - for the main branch. Public IPv4 address: 16.171.2.238

✅ SSH commands for dev and prod servers
```bash
ssh -i "/Users/mohit.shukla/development/aws_pem_files/basis-dev-key.pem" ubuntu@13.61.2.96
ssh -i "/Users/mohit.shukla/development/aws_pem_files/basis-prod1-key.pem" ubuntu@16.171.2.238
```

## Test Server Details
  Name: basis-dev
  AMI: Ubuntu Server 22.04 LTS
  Instance type: t3.micro (free tier)
  Key pair: basis-dev-key.pem
  Network settings: 
    - VPC: Create new
    - Subnet: Create new
    - Security group: Create new
      - Allow SSH (22)
      - Allow HTTP (80)
      - Allow HTTPS (443)
      - Allow Custom TCP (3000) for Next.js
      - Allow Custom TCP (8000) for Python backend


## Install the necessary software on the basis server
❌ Install as per aws-setup.md 

Optional: Use Elastic Beanstalk, ECS, or Terraform for scaling and automation.

---

## 🔐 Step 3: Add Environment Files

Create `.env.test` and `.env.prod`:
```env
# .env.test
NODE_ENV=development
API_URL=http://localhost:8000

# .env.prod
NODE_ENV=production
API_URL=https://api.yourdomain.com
```

---

## ⚙️ Step 4: GitHub Actions Workflow Files

Create CI/CD pipelines in .github/workflows/

🧪 ci-cd-test.yml (for dev branch)

### 🔧 `.github/workflows/ci-cd-test.yml`
```yaml
name: Deploy to Test Server

on:
  push:
    branches:
      - dev

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.5.4
        with:
          ssh-private-key: ${{ secrets.TEST_SERVER_SSH_KEY }}

      - name: Deploy to Test Server
        run: |
          ssh ubuntu@your-test-server-ip << 'EOF'
            cd /home/ubuntu/my-project
            git pull origin dev
            pm2 restart all
          EOF
```

### 🚀 `.github/workflows/ci-cd-prod.yml`
🚀 ci-cd-prod.yml (for main branch)

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.5.4
        with:
          ssh-private-key: ${{ secrets.PROD_SERVER_SSH_KEY }}

      - name: Deploy to Production Server
        run: |
          ssh ubuntu@your-prod-server-ip << 'EOF'
            cd /home/ubuntu/my-project
            git pull origin main
            pm2 restart all
          EOF
```

---

## 🔐 Step 5: SSH Key Setup

On your AWS servers:
```bash
ssh-keygen -t rsa -b 4096 -C "github-deploy"
```

- Add public key to: `~/.ssh/authorized_keys`
- Add private key to GitHub repo secrets:
  - `TEST_SERVER_SSH_KEY`
  - `PROD_SERVER_SSH_KEY`

---

## 🛠 Step 6: Install Runtime on Servers

On each server:
```bash
# Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Python
sudo apt install python3-pip

# Project setup
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
pip install -r backend/requirements.txt

# Run apps
pm2 start npm --name "nextjs" -- start
pm2 start backend/app.py --name "python-backend"
```

---

## ✅ Final Checks

- Push to `dev` → Deploys to test server
- Push to `main` → Deploys to production server
- Check GitHub Actions tab for CI/CD logs

---

## 🧰 Summary

| Task                        | Tool |
|-----------------------------|------|
| Version control             | GitHub |
| CI/CD automation            | GitHub Actions |
| Hosting / deployment        | AWS EC2 |
| Environment management      | `.env` files + branches |
| Server process manager      | PM2 |
| Deployment security         | SSH key-based |

---
