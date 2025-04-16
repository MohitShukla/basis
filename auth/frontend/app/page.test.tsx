import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

// Mock the PostForm component
jest.mock('./components/PostForm', () => {
  return function MockPostForm() {
    return <div data-testid="mock-post-form">Post Form Component</div>;
  };
});

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />);
    
    // Check if the main element exists with correct classes
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('flex-grow-1');
    expect(mainElement).toHaveClass('p-4');
  });
  
  it('includes the PostForm component', () => {
    render(<Home />);
    
    // Check if the PostForm component is rendered
    const postForm = screen.getByTestId('mock-post-form');
    expect(postForm).toBeInTheDocument();
    expect(postForm).toHaveTextContent('Post Form Component');
  });
  
  it('has correct structure', () => {
    const { container } = render(<Home />);
    
    // Check that PostForm is directly inside the main element
    const mainElement = container.querySelector('main');
    expect(mainElement?.children.length).toBe(1);
    expect(mainElement?.children[0]).toHaveAttribute('data-testid', 'mock-post-form');
  });
});