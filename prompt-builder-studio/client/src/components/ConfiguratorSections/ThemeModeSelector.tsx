import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const themeOptions: Array<PromptConfig['themeMode']> = [
  null, // Option for 'Default' (could be light or based on system)
  'light',
  'dark',
  'auto',
  'toggleable'
];

const ThemeModeSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ themeMode: value === 'null' ? null : value as PromptConfig['themeMode'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="themeMode" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        5. Theme Mode
      </label>
      <select
        id="themeMode"
        name="themeMode"
        value={config.themeMode === null ? 'null' : config.themeMode}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {themeOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeModeSelector;
