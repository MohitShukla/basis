'use client';

import React, { useState } from 'react';
import ExpandCollapseButton from './ExpandCollapseButton';
import IconWithText from './IconWithText';
import navigationMenuData from '../../data/navigationMenu.json';

interface NavigationItem {
  id: number | string; // Updated to accept both number and string
  icon?: string;
  text: string;
  link?: string;
  children?: NavigationItem[];
  markdownFile?: string;
}

export default function NavigationTree({ onSelect }: { readonly onSelect: (markdownFile?: string) => void }) {
  const [expandedNodes, setExpandedNodes] = useState<Set<number | string>>(new Set());

  const toggleNode = (id: number | string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelect = async (markdownFile?: string) => {
    if (!markdownFile) return;

    try {
      const response = await fetch(markdownFile, { method: 'HEAD' });
      if (response.ok) {
        onSelect(markdownFile);
      } else {
        onSelect('/docs/for-basis-users/markdown-page-not-found.md');
      }
    } catch (error) {
      console.error('Error checking markdown file:', error);
      onSelect('/docs/for-basis-users/markdown-page-not-found.md');
    }
  };

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
            }}
            onClick={() => handleSelect(item.markdownFile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(item.markdownFile);
              }
            }}
          >
            <IconWithText icon={item.icon} text={item.text} />
          </button>
          {item.children && (
            <ExpandCollapseButton
              isExpanded={expandedNodes.has(item.id)}
              onToggle={() => toggleNode(item.id)}
            />
          )}
        </div>
      );
    }

    if (item.link) {
      return (
        <a href={item.link} className="text-decoration-none text-dark d-flex align-items-center">
          <IconWithText icon={item.icon} text={item.text} />
        </a>
      );
    }

    return (
      <span className="d-flex align-items-center">
        <IconWithText icon={item.icon} text={item.text} />
        {item.children && (
          <ExpandCollapseButton
            isExpanded={expandedNodes.has(item.id)}
            onToggle={() => toggleNode(item.id)}
          />
        )}
      </span>
    );
  };

  const renderTree = (items: NavigationItem[]) => {
    return (
      <ul className="list-unstyled fs-7 fw-light">
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

  return <>{renderTree(navigationMenuData)}</>;
}