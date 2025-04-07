// page.tsx is a Next.js-specific file introduced as part of the App Router in Next.js 13. It is not a standard React file but a convention used in Next.js to define the content of a specific route.

// The App Router uses page.tsx (or page.jsx) files to define the content of a route. Each page.tsx file corresponds to a specific route in your application.

// For example:
// page.tsx → / (the root route)
// page.tsx → /dashboard
// page.tsx → /settings

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
