'use client';

import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          {/* Branding */}
          <a className="navbar-brand" href="/">
            Basis
          </a>

          {/* Google Login Button */}
          <div className="d-flex">
            <GoogleLoginButton />
          </div>
        </div>
      </nav>
    </header>
  );
}