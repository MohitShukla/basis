// Importing the Metadata type from Next.js for defining metadata for the application
import type { Metadata } from 'next';

// Importing the Inter font from Google Fonts using Next.js font optimization
import { Inter } from 'next/font/google';

// Importing global CSS styles for the application
import './globals.css';

// Importing a custom component to handle Bootstrap's client-side functionality
import BootstrapClient from './bootstrap';

// Configuring the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Defining metadata for the application, such as the title and description
export const metadata: Metadata = {
  title: 'Basis', // The title of the application
  description: 'Collaborative AI-Powered Knowledge Sharing Platform', // A brief description of the application
};

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
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
