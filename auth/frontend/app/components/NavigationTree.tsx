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

export default function NavigationTree({ onSelect }: { readonly onSelect: (markdownFile?: string) => void }) {
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
    icon: item.icon ?? undefined, // Use nullish coalescing operator
    children: item.children
      ? item.children.map((child) => ({
          ...child,
          icon: child.icon ?? undefined, // Use nullish coalescing operator
        }))
      : undefined,
  }));

  const renderItemContent = (item: NavigationItem) => {
    if (item.markdownFile) {
      return (
        <div className="d-flex align-items-center">
          <button
            className="text-decoration-none text-dark d-flex align-items-center"
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }} // Reset button styles
            onClick={() => handleSelect(item.markdownFile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(item.markdownFile); // Trigger action on Enter or Space key
              }
            }}
          >
            {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
            {item.text}
          </button>
          {item.children && (
            <button
              className="ms-2"
              style={{
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }} // Reset button styles
              onClick={() => toggleNode(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleNode(item.id); // Trigger action on Enter or Space key
                }
              }}
            >
              {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
            </button>
          )}
        </div>
      );
    }

    if (item.link) {
      return (
        <a href={item.link} className="text-decoration-none text-dark d-flex align-items-center">
          {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
          {item.text}
        </a>
      );
    }

    return (
      <span className="d-flex align-items-center">
        {item.icon && <span className="me-2">{React.createElement(FaIcons[item.icon as keyof typeof FaIcons])}</span>}
        {item.text}
        {item.children && (
          <button
            className="ms-2"
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }} // Reset button styles
            onClick={() => toggleNode(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleNode(item.id); // Trigger action on Enter or Space key
              }
            }}
          >
            {expandedNodes.has(item.id) ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
          </button>
        )}
      </span>
    );
  };

  const renderTree = (items: NavigationItem[]) => {
    return (
      <ul className="list-unstyled">
        {items.map((item) => (
          <li key={item.id} className="mt-2 ps-3">
            <div className="d-flex align-items-center">
              {renderItemContent(item)}
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