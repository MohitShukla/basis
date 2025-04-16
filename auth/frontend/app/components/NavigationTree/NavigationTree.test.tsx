import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavigationTree from './NavigationTree';
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn();

// Mock the navigationMenuData
jest.mock('../../data/navigationMenu.json', () => [
  {
    id: 1,
    icon: 'FaHome',
    text: 'Home',
    link: '/home'
  },
  {
    id: 2,
    icon: 'FaBook',
    text: 'Documentation',
    children: [
      {
        id: 21,
        icon: 'FaFileAlt',
        text: 'Getting Started',
        markdownFile: '/docs/getting-started.md'
      },
      {
        id: 22,
        icon: 'FaCodeBranch',
        text: 'Advanced Topics'
      }
    ]
  },
  {
    id: 3,
    icon: 'FaCog',
    text: 'Settings',
    markdownFile: '/docs/settings.md'
  }
]);

describe('NavigationTree Component', () => {
  const mockOnSelect = jest.fn();
  
  beforeEach(() => {
    // Reset mocks between tests
    mockOnSelect.mockReset();
    (global.fetch as jest.Mock).mockReset();
  });

  it('renders the navigation items correctly', () => {
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Check if the main navigation items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Check if links are rendered properly
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  it('expands and collapses nodes when clicked', () => {
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Initially, child nodes should not be visible
    expect(screen.queryByText('Getting Started')).not.toBeInTheDocument();
    
    // Click the expand button for Documentation
    const expandButtons = screen.getAllByRole('button');
    const documentationExpandButton = expandButtons.find(button => 
      button.parentElement?.textContent?.includes('Documentation')
    );
    
    fireEvent.click(documentationExpandButton!);
    
    // After clicking, child nodes should be visible
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(documentationExpandButton!);
    
    // After collapsing, child nodes should not be visible
    expect(screen.queryByText('Getting Started')).not.toBeInTheDocument();
  });

  it('calls onSelect when clicking on a markdown file item', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true
    });
    
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Expand Documentation to see Getting Started
    const expandButtons = screen.getAllByRole('button');
    const documentationExpandButton = expandButtons.find(button => 
      button.parentElement?.textContent?.includes('Documentation')
    );
    
    fireEvent.click(documentationExpandButton!);
    
    // Click on Getting Started
    const gettingStartedButton = screen.getByText('Getting Started').closest('button');
    fireEvent.click(gettingStartedButton!);
    
    // Verify onSelect was called with the correct path
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('/docs/getting-started.md');
    });
  });

  it('handles markdown file not found', async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    });
    
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Click on Settings
    const settingsButton = screen.getByText('Settings').closest('button');
    fireEvent.click(settingsButton!);
    
    // Verify onSelect was called with the not found path
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('/docs/for-basis-users/markdown-page-not-found.md');
    });
  });

  it('handles fetch errors', async () => {
    // Mock fetch error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Click on Settings
    const settingsButton = screen.getByText('Settings').closest('button');
    fireEvent.click(settingsButton!);
    
    // Verify onSelect was called with the not found path
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('/docs/for-basis-users/markdown-page-not-found.md');
    });
  });

  it('handles keyboard navigation with Enter key', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true
    });
    
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Expand Documentation to see Getting Started
    const expandButtons = screen.getAllByRole('button');
    const documentationExpandButton = expandButtons.find(button => 
      button.parentElement?.textContent?.includes('Documentation')
    );
    
    fireEvent.click(documentationExpandButton!);
    
    // Press Enter on Getting Started
    const gettingStartedButton = screen.getByText('Getting Started').closest('button');
    fireEvent.keyDown(gettingStartedButton!, { key: 'Enter' });
    
    // Verify onSelect was called with the correct path
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('/docs/getting-started.md');
    });
  });

  it('handles keyboard navigation with Space key', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true
    });
    
    render(<NavigationTree onSelect={mockOnSelect} />);
    
    // Expand Documentation to see Getting Started
    const expandButtons = screen.getAllByRole('button');
    const documentationExpandButton = expandButtons.find(button => 
      button.parentElement?.textContent?.includes('Documentation')
    );
    
    fireEvent.click(documentationExpandButton!);
    
    // Press Space on Getting Started
    const gettingStartedButton = screen.getByText('Getting Started').closest('button');
    fireEvent.keyDown(gettingStartedButton!, { key: ' ' });
    
    // Verify onSelect was called with the correct path
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith('/docs/getting-started.md');
    });
  });
});