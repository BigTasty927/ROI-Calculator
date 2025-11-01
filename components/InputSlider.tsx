import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  unit: '$' | '%' | '';
}

const InputSlider: React.FC<InputSliderProps> = ({ label, value, onChange, min, max, step, unit }) => {
  const formatValue = (val: number) => {
    if (unit === '$') {
      return `$${val.toLocaleString()}`;
    }
    if (unit === '%') {
      return `${val}%`;
    }
    return val.toLocaleString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-300 font-medium">{label}</label>
        <span className="text-lg font-semibold text-white bg-brand-light px-3 py-1 rounded-md">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-brand-orange"
      />
    </div>
  );
};

export default InputSlider;
