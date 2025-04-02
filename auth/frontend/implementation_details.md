Here’s a step-by-step guide to implement Google OAuth login in a React.js application:

## ✅ Step 1: Set Up a Google Cloud Project

1. [Google Cloud Console](https://console.cloud.google.com/) project = Basis. 
2. Navigate to **APIs & Services > Credentials** >  **Create Credentials > OAuth 2.0 Client IDs** > webclient 1. This contains OAuth consent screen:
    - Add app name, authorized domains.
    - Add your app's URL (e.g., `http://localhost:3000` for development).
3. OAuth client ID:
    - **Application type**: Web application.
    - **Authorized redirect URIs** (e.g., `http://localhost:3000`).

> 🔵 💡 **Note:** **Client ID** and **Client Secret** saved in `google_oauth.json` for secure and easy access.

## ✅ Step 2: Install Required Packages

```bash
npm install @react-oauth/google
```

## ✅ Step 3: Created a Google Login Component

Created `GoogleLoginButton.js`. 


## Step 4: Use the Component in Your App

Import and use the `GoogleLoginButton` component in your app. frontend/app/page.tsx


## Step 5: Run the Application

Start your React Next.js app:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). Click the "Login with Google" button to log in using your Google account.

## Step 6: Handle Backend Authentication (Optional)

If you want to send the Google token to your backend for verification:

1. Extract the `id_token` from the response object in the `onSuccess` callback.
2. Send the token to your backend API for validation using libraries like `google-auth-library` (Node.js) or `google-auth` (Python).

## Step 7: Deploy and Update Redirect URIs

When deploying your app:

1. Update the **Authorized redirect URIs** in the Google Cloud Console to match your production URL.
2. Test the login functionality in the production environment.

This setup allows users to log in using their Google accounts in your React.js application.