'use client';

import { TextInput as TremorTextInput } from '@tremor/react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  min?: string;
  max?: string;
  step?: string;
  icon?: () => React.ReactNode;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  max,
  step,
  icon,
}: TextInputProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <TremorTextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
        step={step}
        icon={icon}
      />
    </div>
  );
} 