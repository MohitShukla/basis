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

  const handleSelect = async (markdownFile?: string) => {
    if (!markdownFile) return;

    try {
      // Check if the file exists
      const response = await fetch(markdownFile, { method: 'HEAD' });
      if (response.ok) {
        onSelect(markdownFile); // File exists, load it
      } else {
        onSelect('/docs/for-basis-users/markdown-page-not-found.md'); // Fallback file
      }
    } catch (error) {
      console.error('Error checking markdown file:', error);
      onSelect('/docs/for-basis-users/markdown-page-not-found.md'); // Fallback file
    }
  };

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
          <li key={item.id} className="mt-2 ps-3">
            <div className="d-flex align-items-center">
              {item.markdownFile ? (
                <span
                  className="text-decoration-none text-dark d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  role="button" // Indicates this is a button
                  tabIndex={0} // Makes it focusable via keyboard
                  onClick={() => handleSelect(item.markdownFile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(item.markdownFile); // Trigger action on Enter or Space key
                    }
                  }}
                >
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
                  {item.text}
                  {/* Expand/Collapse icon after the text */}
                  {item.children && (
                    <span
                      className="ms-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleNode(item.id)}
                    >
                      {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
                    </span>
                  )}
                </span>
              ) : item.link ? (
                <a
                  href={item.link}
                  className="text-decoration-none text-dark d-flex align-items-center"
                  role="link" // Indicates this is a link
                >
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
                  {item.text}
                  {/* Expand/Collapse icon after the text */}
                  {item.children && (
                    <span
                      className="ms-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleNode(item.id)}
                    >
                      {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
                    </span>
                  )}
                </a>
              ) : (
                <span className="d-flex align-items-center">
                  {/* Dynamically render the icon before the text */}
                  {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
                  {item.text}
                  {/* Expand/Collapse icon after the text */}
                  {item.children && (
                    <span
                      className="ms-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleNode(item.id)}
                    >
                      {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
                    </span>
                  )}
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