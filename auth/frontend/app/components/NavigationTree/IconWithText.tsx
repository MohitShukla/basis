import React from 'react';
import * as FaIcons from 'react-icons/fa';

const IconWithText: React.FC<{ icon?: string; text: string }> = ({ icon, text }) => (
  <>
    {icon && <span className="me-2">{React.createElement(FaIcons[icon as keyof typeof FaIcons])}</span>}
    {text}
  </>
);

export default IconWithText;