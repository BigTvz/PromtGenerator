import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const shadowOptions: Array<PromptConfig['shadowDepth']> = [
  'none',
  'small',
  'medium',
  'large',
  'extra-large',
  'xxl',
  'inset'
];

const ShadowDepthSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // Convert empty string back to null for the store, otherwise use the selected value
    setConfig({ shadowDepth: value === "" ? null : value as PromptConfig['shadowDepth'] });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label htmlFor="shadowDepth" className="block text-sm font-medium text-gray-300 mb-1">
        9. Shadow Depth
      </label>
      <select
        id="shadowDepth"
        name="shadowDepth"
        value={config.shadowDepth === null ? '' : config.shadowDepth}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {shadowOptions.map((option) => (
          <option key={option || 'null-key'} value={option || ''}> {/* Ensure value is not null */}
            {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ') : 'Default (None)'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShadowDepthSelector;
