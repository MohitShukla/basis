import React from 'react';

interface IconWithTextProps {
  icon?: string;
  text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
    <div>
      {icon && <span data-testid="icon">{icon}</span>}
      <span>{text}</span>
    </div>
  );
};

export default IconWithText;