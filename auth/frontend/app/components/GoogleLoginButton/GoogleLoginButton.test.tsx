import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GoogleLoginButton from './GoogleLoginButton';
import '@testing-library/jest-dom';

// Mock the environment variable
beforeAll(() => {
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID = 'test-client-id';
});

// Mock the @react-oauth/google module
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  GoogleLogin: ({ onSuccess }: { onSuccess: (response: any) => void }) => (
    <button 
      data-testid="google-login-button"
      onClick={() => onSuccess({
        credential: 'header.' + btoa(JSON.stringify({ given_name: 'Test User' })) + '.signature'
      })}
    >
      Sign in with Google
    </button>
  )
}));

describe('GoogleLoginButton', () => {
  it('shows login button when not logged in', () => {
    render(<GoogleLoginButton />);
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });

  it('shows user name after successful login', () => {
    render(<GoogleLoginButton />);
    fireEvent.click(screen.getByTestId('google-login-button'));
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
  });


  it('maintains login state when component is unmounted and remounted', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Initial render and login
    const { unmount } = render(<GoogleLoginButton />);
    fireEvent.click(screen.getByTestId('google-login-button'));
    
    // Verify localStorage was called to save the user
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userName', 'Test User');
    
    // Unmount component
    unmount();
    
    // Mock localStorage for remount
    localStorageMock.getItem.mockReturnValueOnce('Test User');
    
    // Remount component
    render(<GoogleLoginButton />);
    
    // Verify user is still logged in
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
  });
});