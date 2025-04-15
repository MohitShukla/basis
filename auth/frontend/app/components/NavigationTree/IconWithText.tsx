import React from 'react';
import * as Icons from 'react-icons/fa'; // Import all Font Awesome icons

interface IconWithTextProps {
  icon?: string; // Icon name, e.g., "FaHome"
  text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  // Dynamically get the icon component from the library
  const IconComponent = icon ? (Icons as any)[icon] : null;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      {IconComponent && <IconComponent data-testid="icon" />} {/* Render the actual icon */}
      <span>{text}</span>
    </div>
  );
};

export default IconWithText;