'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  filePath: string; // Path to the markdown file
}

export default function MarkdownViewer({ filePath }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // Fetch the markdown file
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error loading markdown file:', error));
  }, [filePath]);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}