import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export function FormField({ label, description, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}