import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { track, SINGLE_PANE_EVENTS } from '../lib/analytics';

interface ExpandableCardProps {
  title: string;
  count: string | number;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onExpand?: (expanded: boolean) => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  count,
  children,
  defaultExpanded = false,
  onExpand
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    // Track analytics
    track(SINGLE_PANE_EVENTS.DASHBOARD_EXPAND_SECTION, {
      section: title,
      expanded: newExpanded
    });
    
    // Call parent callback if provided
    if (onExpand) {
      onExpand(newExpanded);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="expandable-card">
      <button
        ref={buttonRef}
        className="expandable-card-header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`expandable-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="expandable-card-title">
          <span className="title-text">{title}</span>
          <span className="count-badge">{count}</span>
        </div>
        <div className="expandable-card-icon">
          {isExpanded ? (
            <ChevronDown className="icon" />
          ) : (
            <ChevronRight className="icon" />
          )}
        </div>
      </button>
      
      <div
        id={`expandable-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className={`expandable-card-content ${isExpanded ? 'expanded' : ''}`}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableCard;
