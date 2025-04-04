'use client'; // Required for client-side components in the App Router

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import dotenv from 'dotenv';
dotenv.config();
import './GoogleLoginButton.css'; // Import the CSS file for styling

// Load environment variables
const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || (() => {
  throw new Error('GOOGLE_OAUTH_CLIENT_ID is not defined. Define it basis/frontend/.env');
})(); // Ensure clientId is always a string

const GoogleLoginButton = () => {
  const [userName, setUserName] = useState<string | null>(null); // State to store the user's name

  const onSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    console.log('User Info:', userInfo);
    setUserName(userInfo.given_name || null);
  };

  const onError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    setUserName(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="position-absolute top-0 end-0 p-3">
        {userName ? (
          <div className="dropdown">
            <button
              className="btn btn-primary rounded-circle dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: '40px', height: '40px', padding: 0 }}
            >
              {userName.charAt(0).toUpperCase()}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li><button className="dropdown-item" onClick={handleLogout}>Log Off</button></li>
            </ul>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;