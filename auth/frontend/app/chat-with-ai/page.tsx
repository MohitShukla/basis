'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/markdown.css';

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
          messages: [
            { role: "system", content: "You are a helpful assistant who returns the content in a well formatted markdown format" },
            { role: 'user', content: prompt }],
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
    <div className="container">
      <form onSubmit={handleSubmit} className="p-1 ">
        <div className="mb-1">
          <textarea
            id="promptInput"
            className="form-control"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Talk to AI..."
          ></textarea>
        </div>

        <div className="row mb-1">
          <div className="col-md-8">
            <select
              id="modelSelect"
              className="form-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Cheapest)</option>
              <option value="gpt-3.5-turbo-16k">GPT-3.5 Turbo (16k Context)</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-32k">GPT-4 (32k Context, Costliest)</option>
            </select>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>

      {response && (
        <div className="mt-2 p-2 markdown-container">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}