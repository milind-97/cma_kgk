// app/layout.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css'; // Ensure to import your global styles if any

export const metadata = {
  title: 'My CMS',
  description: 'A simple content management system',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
