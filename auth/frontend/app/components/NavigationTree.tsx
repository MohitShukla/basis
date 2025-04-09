'use client';

import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa'; // Example icons from react-icons

export default function NavigationTree() {
  const navigationItems = [
    { id: 1, icon: <FaHome />, text: 'Home', link: '/' },
    { id: 2, icon: <FaUser />, text: 'Profile', link: '/profile' },
    { id: 3, icon: <FaCog />, text: 'Settings', link: '/settings' },
    { id: 4, text: 'About', link: '/about' }, // Node with text only
  ];

  return (
    <ul className="list-unstyled">
      {navigationItems.map((item) => (
        <li key={item.id} className="mb-3">
          <a href={item.link} className="text-decoration-none text-dark d-flex align-items-center">
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}