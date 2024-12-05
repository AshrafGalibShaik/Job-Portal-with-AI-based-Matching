import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
  rows?: number;
}

export function FormField({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  options = [],
  rows = 3
}: FormFieldProps) {
  const baseClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            rows={rows}
            placeholder={placeholder}
            className={baseClasses}
            required={required}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            name={id}
            className={baseClasses}
            required={required}
          >
            <option value="">Select an option</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
            className={baseClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderInput()}
    </div>
  );
}