import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const layoutOptions: Array<PromptConfig['layoutConfiguration']> = [
  null, // Option for 'None'
  'card',
  'list',
  '2-2-square',
  'table',
  'sidebar-left',
  'sidebar-right',
  'grid-2x2',
  'grid-3x3',
  'grid-4x4',
  'masonry'
];

const LayoutConfigurationSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ layoutConfiguration: value === 'null' ? null : value as PromptConfig['layoutConfiguration'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="layoutConfiguration" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        2. Layout Configuration
      </label>
      <select
        id="layoutConfiguration"
        name="layoutConfiguration"
        value={config.layoutConfiguration === null ? 'null' : config.layoutConfiguration}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {layoutOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ') : 'None'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LayoutConfigurationSelector;
