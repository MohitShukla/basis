'use client'; // Required for client-side rendering in the App Router

import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

export default function Home() {
  return (
    <div>
      <h1 className="ms-2">Basis</h1>
      <GoogleLoginButton />
    </div>
  );
}
