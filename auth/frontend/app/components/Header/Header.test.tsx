import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock the GoogleLoginButton component
jest.mock('../GoogleLoginButton/GoogleLoginButton', () => {
  return function MockGoogleLoginButton() {
    return <div data-testid="mock-google-login-button">Google Login</div>;
  };
});

describe('Header Component', () => {
  it('renders correctly', () => {
    render(<Header />);
    
    // Check if the header element exists
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    
    // Check if the navbar element exists with correct classes
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
    expect(navbarElement).toHaveClass('navbar');
    expect(navbarElement).toHaveClass('navbar-light');
    expect(navbarElement).toHaveClass('bg-white');
    expect(navbarElement).toHaveClass('border-bottom');
  });

  it('displays the Basis brand link', () => {
    render(<Header />);
    
    // Check if the brand link exists with correct text and href
    const brandLink = screen.getByRole('link', { name: 'Basis' });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveClass('navbar-brand');
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('includes the GoogleLoginButton component', () => {
    render(<Header />);
    
    // Check if the GoogleLoginButton is rendered
    const googleLoginButton = screen.getByTestId('mock-google-login-button');
    expect(googleLoginButton).toBeInTheDocument();
  });

  it('has proper responsive container', () => {
    render(<Header />);
    
    // Check if the container-fluid element exists
    const containerElement = screen.getByText('Basis').closest('.container-fluid');
    expect(containerElement).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    const { container } = render(<Header />);
    
    // Check proper nesting: header > nav > div.container-fluid
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    
    const nav = header?.querySelector('nav');
    expect(nav).toBeInTheDocument();
    
    const containerFluid = nav?.querySelector('.container-fluid');
    expect(containerFluid).toBeInTheDocument();
    
    // Check that the Google login button is in a flex container
    const flexContainer = screen.getByTestId('mock-google-login-button').closest('.d-flex');
    expect(flexContainer).toBeInTheDocument();
  });
});