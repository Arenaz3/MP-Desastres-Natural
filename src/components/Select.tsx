import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  id: string;
  hasError?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  id,
  hasError = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';
  const errorClasses = hasError ? 'border-red-500' : '';
  
  return (
    <select
      id={id}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    >
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;