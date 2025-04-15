import React from 'react';
import { render, screen } from '@testing-library/react';
import IconWithText from './IconWithText';

describe('IconWithText Component', () => {
  it('renders the text without an icon when no icon is provided', () => {
    render(<IconWithText text="Test Text" />);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders the icon and text when an icon is provided', () => {
    render(<IconWithText icon="FaHome" text="Home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    // Check if the icon is rendered
    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('does not render an icon if the icon prop is undefined', () => {
    render(<IconWithText text="No Icon" />);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<IconWithText icon="FaHome" text="Home" />);
  });
});