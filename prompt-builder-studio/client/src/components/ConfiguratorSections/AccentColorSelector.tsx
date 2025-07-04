import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const accentColorOptions: Array<PromptConfig['accentColor']> = [
  null, // Option for 'Default' or 'None'
  'primary', // This might map to a default theme color or could be removed if specific colors are always chosen
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'orange',
  'teal',
  'green',
  'yellow',
  'rose'
];

const AccentColorSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ accentColor: value === 'null' ? null : value as PromptConfig['accentColor'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="accentColor" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        6. Accent Color
      </label>
      <select
        id="accentColor"
        name="accentColor"
        value={config.accentColor === null ? 'null' : config.accentColor}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {accentColorOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default/None'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccentColorSelector;
