'use client';

import React from 'react';
import NavigationTree from './NavigationTree';

export default function SidePanel({ onSelect }: { onSelect: (markdownFile?: string) => void }) {
  return (
    <aside className="bg-white border-end p-3" style={{ width: '300px' }}>
      {/* Pass the onSelect prop to NavigationTree */}
      <NavigationTree onSelect={onSelect} />
    </aside>
  );
}