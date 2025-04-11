'use client';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatWithAI() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY; // Get the API key from .env
      if (!apiKey) {
        throw new Error('API key is missing. Please check your .env file.');
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Chat With AI</h1>
      <p className="text-center text-muted">You can chat with AI model of your choice.</p>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="promptInput" className="form-label">
            Enter Your Prompt
          </label>
          <textarea
            id="promptInput"
            className="form-control"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question or prompt here..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="modelSelect" className="form-label">
            Choose AI Model
          </label>
          <select
            id="modelSelect"
            className="form-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Cheapest)</option>
            <option value="gpt-3.5-turbo-16k">GPT-4.5</option>
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4">GPT-4o</option>
            <option value="gpt-4-32k">GPT-4o (Costliest)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h5>AI Response:</h5>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}