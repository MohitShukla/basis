'use client';

// Import React explicitly
import React from 'react';

// Importing global CSS styles for the application
import './globals.css';

// Importing the Inter font from Google Fonts using Next.js font optimization
import { Inter } from 'next/font/google';

import Header from './components/Header/Header';
import SidePanel from './components/SidePanel/SidePanel';
import MarkdownViewer from './components/MarkdownViewer';
import { useState } from 'react';

// Configuring the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// RootLayout is the main layout component for the application.
// It wraps all pages and components, providing a consistent structure and styles.
export default function RootLayout({
  children, // The `children` prop represents the content of the page being rendered
}: {
  readonly children: React.ReactNode;
}) {
  const [markdownFile, setMarkdownFile] = useState<string | undefined>(undefined);

  const layoutContent = (
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <div className="d-flex" style={{ minHeight: '100vh', alignItems: 'stretch' }}>
        <SidePanel onSelect={(file) => setMarkdownFile(file)} />
        <div className="flex-grow-1 p-4">
          {markdownFile ? <MarkdownViewer filePath={markdownFile} /> : children}
        </div>
      </div>
    </>
  );

  // Render <html>, <head>, and <body> only in non-test environments
  if (process.env.NODE_ENV !== 'test') {
    return (
      <html lang="en">
        <head>
          {/* Include Bootstrap CSS */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </head>
        <body className={inter.className}>{layoutContent}</body>
      </html>
    );
  }

  // For tests, return only the layout content
  return layoutContent;
}
