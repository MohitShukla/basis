'use client';

import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

export default function Header() {
  return (
    <header className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
      <h1 className="ms-2 mb-0">Basis</h1>
      <GoogleLoginButton />
    </header>
  );
}