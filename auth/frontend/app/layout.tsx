import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BootstrapClient from './bootstrap';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Basis',
  description: 'Collaborative AI-Powered Knowledge Sharing Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
