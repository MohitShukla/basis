'use client';

import React from 'react';
import NavigationTree from './NavigationTree';

export default function SidePanel() {
  return (
    <aside className="bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
      <h5 className="mb-4">Navigation</h5>
      <NavigationTree />
    </aside>
  );
}