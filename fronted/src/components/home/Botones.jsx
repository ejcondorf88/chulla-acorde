import React from 'react';

const Botones = ({ children, variant = 'primary', ...props }) => {
  const baseClass = "px-6 py-2 rounded-full font-medium transition-all duration-200";
  const variants = {
    primary: "bg-white text-purple-900 hover:bg-gray-100",
    secondary: "bg-purple-600 text-white hover:bg-purple-700"
  };
  
  return (
    <button className={`${baseClass} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Botones;
