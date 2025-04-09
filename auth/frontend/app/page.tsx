'use client';

import React from 'react';
import PostForm from './components/PostForm';

export default function Home() {
  return (
    <main className="flex-grow-1 p-4">
      <PostForm /> {/* Post form */}
    </main>
  );
}