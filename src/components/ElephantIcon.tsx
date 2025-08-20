import React from 'react';

interface ElephantIconProps {
  className?: string;
  size?: number;
}

export const ElephantIcon: React.FC<ElephantIconProps> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.5 2 5.5 4.5 5 8C4.5 8.5 4 9.5 4 11C4 12.5 4.5 13.5 5 14C5.5 17.5 8.5 20 12 20C15.5 20 18.5 17.5 19 14C19.5 13.5 20 12.5 20 11C20 9.5 19.5 8.5 19 8C18.5 4.5 15.5 2 12 2Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M8 10C8.5 10 9 9.5 9 9C9 8.5 8.5 8 8 8C7.5 8 7 8.5 7 9C7 9.5 7.5 10 8 10Z"
        fill="currentColor"
      />
      <path
        d="M16 10C16.5 10 17 9.5 17 9C17 8.5 16.5 8 16 8C15.5 8 15 8.5 15 9C15 9.5 15.5 10 16 10Z"
        fill="currentColor"
      />
      <path
        d="M12 16C10 16 8.5 14.5 8.5 12.5C8.5 12.2 8.7 12 9 12C9.3 12 9.5 12.2 9.5 12.5C9.5 14 10.5 15 12 15C13.5 15 14.5 14 14.5 12.5C14.5 12.2 14.7 12 15 12C15.3 12 15.5 12.2 15.5 12.5C15.5 14.5 14 16 12 16Z"
        fill="currentColor"
      />
    </svg>
  );
};