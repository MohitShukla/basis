// Importing global CSS styles for the application
import './globals.css';

// Importing the Inter font from Google Fonts using Next.js font optimization
import { Inter } from 'next/font/google';

// Importing a custom component for the header
import Header from './components/Header';

// Configuring the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// RootLayout is the main layout component for the application.
// It wraps all pages and components, providing a consistent structure and styles.
export default function RootLayout({
  children, // The `children` prop represents the content of the page being rendered
}: {
  children: React.ReactNode; // The type of the `children` prop is React's Node type
}) {
  return (
    <html lang="en">
      <head>
        {/* Include Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* Header Section */}
        <Header /> {/* Header with heading and Google login button */}

        {/* Main Content Section */}
        <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
          {children} {/* Content from page.tsx */}
        </div>
      </body>
    </html>
  );
}
