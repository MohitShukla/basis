import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpandCollapseButton from './ExpandCollapseButton';
import * as FaIcons from 'react-icons/fa';

// Mock the react-icons/fa library
jest.mock('react-icons/fa', () => ({
  FaChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  FaChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>
}));

describe('ExpandCollapseButton Component', () => {
  const mockToggle = jest.fn();
  
  beforeEach(() => {
    mockToggle.mockClear();
  });

  it('renders without crashing', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the right chevron when collapsed', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();
  });

  it('displays the down chevron when expanded', () => {
    render(<ExpandCollapseButton isExpanded={true} onToggle={mockToggle} />);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-right')).not.toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when Enter key is pressed', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when Space key is pressed', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call onToggle when other keys are pressed', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
    expect(mockToggle).not.toHaveBeenCalled();
  });

  it('has correct styling', () => {
    render(<ExpandCollapseButton isExpanded={false} onToggle={mockToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ms-2');
    expect(button).toHaveStyle({
      cursor: 'pointer',
      background: 'none',
      padding: 0
    });
  });
});