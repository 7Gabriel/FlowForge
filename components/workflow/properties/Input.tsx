import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-3 py-2 text-sm border border-gray-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-500
        ${className}
      `}
      {...props}
    />
  );
}