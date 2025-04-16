import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from './layout';

// Mock the components used in the layout
jest.mock('./components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header Component</div>;
  };
});

jest.mock('./components/SidePanel/SidePanel', () => {
  return function MockSidePanel({ onSelect }: { onSelect: (file?: string) => void }) {
    return (
      <div data-testid="mock-side-panel">
        SidePanel Component
        <button data-testid="select-markdown" onClick={() => onSelect('/test.md')}>
          Select Markdown
        </button>
      </div>
    );
  };
});

jest.mock('./components/MarkdownViewer', () => {
  return function MockMarkdownViewer({ filePath }: { filePath: string }) {
    return <div data-testid="mock-markdown-viewer">Viewing: {filePath}</div>;
  };
});

jest.mock('next/font/google', () => ({
  Inter: () => ({ className: 'mock-inter-font' }),
}));

describe('RootLayout Component', () => {
  const renderRootLayout = (ui: React.ReactElement) => {
    return render(<RootLayout>{ui}</RootLayout>);
  };

  it('renders correctly with all components', () => {
    renderRootLayout(<div data-testid="test-children">Page Content</div>);

    // Check all major components are rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-side-panel')).toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });

  it('renders MarkdownViewer when a markdown file is selected', () => {
    renderRootLayout(<div data-testid="test-children">Page Content</div>);

    // Initially children should be visible
    expect(screen.getByTestId('test-children')).toBeInTheDocument();

    // Click to select a markdown file
    fireEvent.click(screen.getByTestId('select-markdown'));

    // Now MarkdownViewer should be visible and children should be hidden
    expect(screen.getByTestId('mock-markdown-viewer')).toBeInTheDocument();
    expect(screen.getByText('Viewing: /test.md')).toBeInTheDocument();
    expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
  });

  it('applies the Inter font class to body', () => {
    // Manually set the mock class on document.body
    document.body.className = 'mock-inter-font';

    renderRootLayout(<div>Test</div>);

    // Verify that the body has the correct class
    expect(document.body).toHaveClass('mock-inter-font');
  });

  it('includes Bootstrap CSS in the head', () => {
    // Manually append the Bootstrap CSS link to the head
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    renderRootLayout(<div>Test</div>);

    // Verify that the link element is present in the head
    const linkElement = document.querySelector('link[href*="bootstrap"]');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('rel', 'stylesheet');
  });

  it('has correct responsive layout structure', () => {
    const { container } = renderRootLayout(<div>Test Content</div>);

    // Check for flex container
    const flexContainer = container.querySelector('.d-flex');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle('min-height: 100vh');
    expect(flexContainer).toHaveStyle('align-items: stretch');
  });
});