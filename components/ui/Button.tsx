
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
      break;
    case 'secondary':
      variantStyle = "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500";
      break;
    case 'danger':
      variantStyle = "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case 'icon':
      variantStyle = "p-2 border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-indigo-500";
      break;
  }

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
