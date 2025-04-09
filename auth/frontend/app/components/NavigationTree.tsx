'use client';

import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa'; // Import all icons from react-icons/fa

interface NavigationItem {
  id: number;
  icon?: string; // Icon name as a string
  text: string;
  link?: string;
  children?: NavigationItem[];
  markdownFile?: string; // Optional markdown file path
}

const navigationMenuData: NavigationItem[] = require('../data/navigationMenu.json');

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

  // Dynamically map icons from the JSON data
  const navigationMenu: NavigationItem[] = navigationMenuData.map((item) => ({
    ...item,
    icon: item.icon ? item.icon : undefined,
    children: item.children
      ? item.children.map((child) => ({
          ...child,
          icon: child.icon ? child.icon : undefined
        }))
      : undefined
  }));

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
                  {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
                </span>
              )}

              {item.markdownFile ? (
                <span
                  className="text-decoration-none text-dark d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelect(item.markdownFile)}
                >
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
                  {item.text}
                </span>
              ) : item.link ? (
                <a
                  href={item.link}
                  className="text-decoration-none text-dark d-flex align-items-center"
                >
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
                  {item.text}
                </a>
              ) : (
                <span className="d-flex align-items-center">
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
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

  return <>{renderTree(navigationMenu)}</>;
}