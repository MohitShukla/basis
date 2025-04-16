import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWithAI from './page';

// Mock the fetch API
global.fetch = jest.fn();

// Mock the environment variables
process.env.NEXT_PUBLIC_OPEN_API_KEY = 'test-api-key';

describe('ChatWithAI Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form and input elements correctly', () => {
    render(<ChatWithAI />);

    // Check for textarea
    expect(screen.getByPlaceholderText('Talk to AI...')).toBeInTheDocument();

    // Check for model select dropdown
    expect(screen.getByText('GPT-3.5 Turbo (Cheapest)')).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('disables the submit button while loading', async () => {
    // Mock fetch to return a promise that won't resolve immediately
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise((resolve) => {
      // This promise intentionally never resolves to keep loading state true
      // Don't worry, Jest will clean it up after the test
    }));
    
    process.env.NEXT_PUBLIC_OPEN_API_KEY = 'test-api-key'; // Ensure API key is set
    
    render(<ChatWithAI />);
    
    // Add text to the textarea (required by form)
    fireEvent.change(screen.getByPlaceholderText('Talk to AI...'), {
      target: { value: 'Test prompt' },
    });
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveTextContent(/submit/i);
    expect(submitButton).not.toBeDisabled();
    
    // Submit the form
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    // Now check if the button is disabled and shows Loading text
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Loading...');
  });

  it('displays an error message if the API key is missing', async () => {
    delete process.env.NEXT_PUBLIC_OPEN_API_KEY; // Simulate missing API key
  
    render(<ChatWithAI />);
  
    // Enter a prompt
    fireEvent.change(screen.getByPlaceholderText('Talk to AI...'), {
      target: { value: 'Hello AI' },
    });
  
    // Use act to wrap state changes
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
  
    // Wait for the error message to appear
    expect(screen.getByText(/API key is missing/i)).toBeInTheDocument();
  });

  it('makes an API call and displays the response', async () => {
    process.env.NEXT_PUBLIC_OPEN_API_KEY = 'test-api-key';
  
    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'This is a test response from the AI.',
            },
          },
        ],
      }),
    });
  
    render(<ChatWithAI />);
  
    // Enter a prompt
    fireEvent.change(screen.getByPlaceholderText('Talk to AI...'), {
      target: { value: 'Hello AI' },
    });
  
    // Use act to wrap state changes
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
  
    // Wait for the response
    expect(screen.getByText('This is a test response from the AI.')).toBeInTheDocument();
  });

  it('displays an error message if the API call fails', async () => {
    process.env.NEXT_PUBLIC_OPEN_API_KEY = 'test-api-key';
  
    // Mock a failed fetch response
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
  
    render(<ChatWithAI />);
  
    // Enter a prompt
    fireEvent.change(screen.getByPlaceholderText('Talk to AI...'), {
      target: { value: 'Hello AI' },
    });
  
    // Use act to wrap state changes
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
  
    // Wait for the error message
    expect(screen.getByText(/Error: API Error/i)).toBeInTheDocument();
  });
});