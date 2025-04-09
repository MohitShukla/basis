'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Syntax highlighting theme
import './MarkdownViewer.css';

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

  // Define custom components with proper typing
  const customComponents: Components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </div>
  );
}