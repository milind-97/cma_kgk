'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">My CMS</h1>
        <div className="space-x-4">
          <Link href="/pages" className="text-white hover:text-blue-300">
            Pages
          </Link>
          <Link href="/posts" className="text-white hover:text-blue-300">
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
