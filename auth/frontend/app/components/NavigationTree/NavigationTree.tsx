'use client';

import React, { useState } from 'react';
import ExpandCollapseButton from './ExpandCollapseButton';
import IconWithText from './IconWithText';

interface NavigationItem {
  id: number;
  icon?: string;
  text: string;
  link?: string;
  children?: NavigationItem[];
  markdownFile?: string;
}

const navigationMenuData: NavigationItem[] = require('../../data/navigationMenu.json');

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

  return <>{renderTree(navigationMenuData)}</>;
}