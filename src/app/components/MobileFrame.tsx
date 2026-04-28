import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame = ({ children, className = '' }: MobileFrameProps) => {
  return (
    <div className={`panel-shell w-full ${className}`}>
      {children}
    </div>
  );
};