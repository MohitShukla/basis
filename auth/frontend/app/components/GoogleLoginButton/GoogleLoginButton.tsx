'use client';

import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Use a default test value or existing value
const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || 'test-client-id';

export default function GoogleLoginButton() {
  const [userName, setUserName] = useState<string | null>(null);
  
  // Load user from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('userName');
      if (savedUser) {
        setUserName(savedUser);
      }
    }
  }, []);

  const onSuccess = (credentialResponse: any) => {
    const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    const name = userInfo.given_name ?? null;
    setUserName(name);
    if (name && typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
    }
  };

  const onError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    setUserName(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userName');
    }
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