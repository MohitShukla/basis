# 🚀 CI/CD Pipeline for Next.js + Python Project (GitHub + AWS)

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

## 📁 Project Root Directory
basis

---

## 📂 Step 1: GitHub Repository Setup

1. ✅ Create a repo on GitHub.
2. ❌ Push your local code:
   ```bash
   git init
   git remote add origin https://github.com/your-username/your-repo.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
❌❌❌ `git push origin main` giving error. push was rejected because the repository's rules detected secrets in your commit. Specifically, a Google OAuth Client ID and Google OAuth Client Secret were found in the file auth/frontend/app/google_oauth.json at lines 2 and 7.

3. Create a dev branch:
   ```bash
   git checkout -b dev
   git push -u origin dev
   ```

---

## Step 3: Set Up AWS Servers
Provision two EC2 instances or ECS services:
- `test-server:` for the dev branch
- `prod-server:` for the main branch

You can:

- Use Ubuntu 22.04 LTS
- Open ports 22, 80, 443, and any custom backend ports
- Install:
  - Node.js & PM2 (for Next.js)
  - Python 3.x, pip, and Gunicorn/Uvicorn (for backend)

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
