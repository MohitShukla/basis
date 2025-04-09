'use client';

import React from 'react';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';

export default function Home() {
  return (
    <>
      {/* Left-Side Panel */}
      <SidePanel />

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4">
        <PostForm /> {/* Post form */}
      </main>
    </>
  );
}
