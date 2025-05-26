import React from 'react';

const Button = ({ children, variant = 'default', disabled, className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold w-full mt-5';
  const variantClasses = {
    default: 'bg-[#121212] text-[#FFFFFF] hover:bg-[#2a2a2a]',
    secondary: 'bg-[#FEFEFE] text-[#121212] hover:bg-[#F0F0F0] border border-[#121212]',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
    link: 'text-blue-500 hover:underline',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;