import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidePanel from './SidePanel';

// Mock the NavigationTree component
jest.mock('../NavigationTree/NavigationTree', () => {
  return function MockNavigationTree({ onSelect }: { onSelect: (file?: string) => void }) {
    return (
      <div data-testid="mock-navigation-tree">
        <button 
          onClick={() => onSelect('/test-file.md')}
          data-testid="select-file-button"
        >
          Select File
        </button>
      </div>
    );
  };
});

describe('SidePanel Component', () => {
  it('renders correctly', () => {
    const mockOnSelect = jest.fn();
    render(<SidePanel onSelect={mockOnSelect} />);
    
    // Check if the component renders with the correct structure
    const sidePanelElement = screen.getByRole('complementary');
    expect(sidePanelElement).toBeInTheDocument();
    expect(sidePanelElement).toHaveClass('bg-white');
    expect(sidePanelElement).toHaveClass('border-end');
    expect(sidePanelElement).toHaveClass('p-3');
    
    // Check if the NavigationTree is rendered
    const navigationTree = screen.getByTestId('mock-navigation-tree');
    expect(navigationTree).toBeInTheDocument();
  });

  it('passes onSelect function to NavigationTree', () => {
    const mockOnSelect = jest.fn();
    render(<SidePanel onSelect={mockOnSelect} />);
    
    // Trigger file selection in the mocked NavigationTree
    const selectButton = screen.getByTestId('select-file-button');
    selectButton.click();
    
    // Verify the onSelect function was called with the correct file path
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('/test-file.md');
  });

  it('respects width style prop', () => {
    const mockOnSelect = jest.fn();
    render(<SidePanel onSelect={mockOnSelect} />);
    
    const sidePanelElement = screen.getByRole('complementary');
    const styles = window.getComputedStyle(sidePanelElement);
    
    // Check if the width is set to 300px
    expect(sidePanelElement).toHaveStyle('width: 300px');
  });
});