'use client';

import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Icons for tree structure

interface NavigationItem {
  id: number;
  icon?: React.ReactNode;
  text: string;
  link?: string;
  children?: NavigationItem[]; // Optional child nodes
}

export default function NavigationTree() {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set()); // Track expanded nodes

  const toggleNode = (id: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Collapse node
      } else {
        newSet.add(id); // Expand node
      }
      return newSet;
    });
  };

  const navigationItems: NavigationItem[] = [
    {
      id: 1,
      icon: <FaHome />,
      text: 'Home',
      link: '/',
    },
    {
      id: 2,
      icon: <FaUser />,
      text: 'Profile',
      children: [
        { id: 21, text: 'Edit Profile', link: '/profile/edit' },
        { id: 22, text: 'View Profile', link: '/profile/view' },
      ],
    },
    {
      id: 3,
      icon: <FaCog />,
      text: 'Settings',
      children: [
        { id: 31, text: 'General Settings', link: '/settings/general' },
        { id: 32, text: 'Privacy Settings', link: '/settings/privacy' },
      ],
    },
    {
      id: 4,
      text: 'About',
      link: '/about',
    },
  ];

  const renderTree = (items: NavigationItem[]) => {
    return (
      <ul className="list-unstyled">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="d-flex align-items-center">
              {/* Toggle Icon for Parent Nodes */}
              {item.children && (
                <span
                  className="me-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleNode(item.id)}
                >
                  {expandedNodes.has(item.id) ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}

              {/* Link or Text */}
              {item.link ? (
                <a
                  href={item.link}
                  className="text-decoration-none text-dark d-flex align-items-center"
                >
                  {item.icon && <span className="me-2">{item.icon}</span>}
                  {item.text}
                </a>
              ) : (
                <span className="d-flex align-items-center">
                  {item.icon && <span className="me-2">{item.icon}</span>}
                  {item.text}
                </span>
              )}
            </div>

            {/* Render Children if Expanded */}
            {item.children && expandedNodes.has(item.id) && (
              <div className="ms-4">{renderTree(item.children)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <>{renderTree(navigationItems)}</>;
}