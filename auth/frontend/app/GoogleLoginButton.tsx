'use client'; // Required for client-side components in the App Router

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import googleOAuthConfig from './google_oauth.json'; // Import the JSON file
import './GoogleLoginButton.css'; // Import the CSS file for styling

const GoogleLoginButton = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null); // State to store the user's profile picture
  const [userName, setUserName] = useState<string | null>(null); // State to store the user's name
  const clientId = googleOAuthConfig.client_id; // Get the clientId from the JSON file

  const onSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    console.log('User Info:', userInfo);
    setProfilePic(userInfo.picture || null);
    setUserName(userInfo.given_name || null);
  };

  const onError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    setProfilePic(null);
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