import React from 'react';
import * as FaIcons from 'react-icons/fa';

interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({ isExpanded, onToggle }) => (
  <button
    className="ms-2"
    style={{
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
    }}
    onClick={onToggle}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onToggle();
      }
    }}
  >
    {isExpanded ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
  </button>
);

export default ExpandCollapseButton;