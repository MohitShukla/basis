'use client';

import React, { useState } from 'react';
import { FaHome, FaBook, FaUser, FaCog, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface NavigationItem {
  id: number;
  icon?: React.ReactNode;
  text: string;
  link?: string;
  children?: NavigationItem[];
  markdownFile?: string; // Optional markdown file path
}

export default function NavigationTree({ onSelect }: { onSelect: (markdownFile?: string) => void }) {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const toggleNode = (id: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
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
      id: 5,
      icon: <FaBook />,
      text: 'Docs',
      children: [
        { id: 51, text: 'Architecture', markdownFile: '/docs/architecture.md' },
      ],
    },
  ];

  const renderTree = (items: NavigationItem[]) => {
    return (
      <ul className="list-unstyled">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="d-flex align-items-center">
              {item.children && (
                <span
                  className="me-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleNode(item.id)}
                >
                  {expandedNodes.has(item.id) ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}

              {item.markdownFile ? (
                <span
                  className="text-decoration-none text-dark d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelect(item.markdownFile)}
                >
                  {item.icon && <span className="me-2">{item.icon}</span>}
                  {item.text}
                </span>
              ) : item.link ? (
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