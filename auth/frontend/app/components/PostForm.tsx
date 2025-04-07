'use client';

import React, { useState } from 'react';

export default function PostForm() {
  const [formData, setFormData] = useState<string>(''); // State to manage the text box input

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData(''); // Clear the text box after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label htmlFor="inputText" className="form-label">
          Enter Text
        </label>
        <input
          type="text"
          className="form-control"
          id="inputText"
          value={formData}
          onChange={(e) => setFormData(e.target.value)} // Update state on input change
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}