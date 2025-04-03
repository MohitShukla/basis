# CI/CD Pipeline

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Basis project using GitHub Actions.

## Overview

The CI/CD pipeline consists of two main workflows:
1. Development workflow (dev branch)
2. Production workflow (main branch)

## GitHub Actions Workflows

### Development Workflow

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
          ssh-private-key: ${{ secrets.DEV_SERVER_SSH_KEY }}

      - name: Deploy to Test Server
        run: |
          ssh ubuntu@13.61.2.96 << 'EOF'
            cd /home/ubuntu/basis
            git pull origin dev
            pm2 restart all
          EOF
```

### Production Workflow

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
          ssh ubuntu@51.20.32.201 << 'EOF'
            cd /home/ubuntu/basis
            git pull origin main
            pm2 restart all
          EOF
```

## GitHub Secrets

The following secrets need to be configured in your GitHub repository:

1. `DEV_SERVER_SSH_KEY`: SSH private key for the development server
2. `PROD_SERVER_SSH_KEY`: SSH private key for the production server

### Setting Up Secrets

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with its corresponding value

## Deployment Process

### Development Deployment
1. Push changes to the `dev` branch
2. GitHub Actions automatically deploys to the test server
3. Changes are tested on the development environment

### Production Deployment
1. Create a pull request from `dev` to `main`
2. Review and merge the pull request
3. GitHub Actions automatically deploys to the production server

## Monitoring Deployments

1. Check deployment status in GitHub Actions tab
2. Monitor server logs:
   ```bash
   # Frontend logs
   pm2 logs basis-frontend

   # Backend logs
   pm2 logs basis-backend
   ```
3. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

## Rollback Process

If a deployment causes issues:

1. SSH into the affected server
2. Navigate to the project directory
3. Check out the previous commit:
   ```bash
   git checkout <previous-commit-hash>
   ```
4. Restart the services:
   ```bash
   pm2 restart all
   ```

## Best Practices

1. **Branch Protection**
   - Require pull request reviews
   - Require status checks to pass
   - Require up-to-date branches

2. **Deployment Safety**
   - Always test on development first
   - Use feature branches
   - Implement proper error handling

3. **Monitoring**
   - Set up alerts for failed deployments
   - Monitor application health
   - Track deployment metrics

## Troubleshooting

### Common Issues

1. **Deployment Failures**
   - Check GitHub Actions logs
   - Verify SSH key permissions
   - Check server disk space

2. **Service Issues**
   - Check PM2 status
   - Verify environment variables
   - Check application logs

3. **Network Issues**
   - Verify security group rules
   - Check DNS configuration
   - Test server connectivity 