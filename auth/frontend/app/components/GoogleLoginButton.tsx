'use client';

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || (() => {
  throw new Error('GOOGLE_OAUTH_CLIENT_ID is not defined in the environment variables');
})();

export default function GoogleLoginButton() {
  const [userName, setUserName] = useState<string | null>(null);

  const onSuccess = (credentialResponse: any) => {
    const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
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
      {userName ? (
        <div className="d-flex align-items-center">
          <span className="me-2">Welcome, {userName}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      )}
    </GoogleOAuthProvider>
  );
}