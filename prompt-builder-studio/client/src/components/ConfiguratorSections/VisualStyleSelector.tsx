import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const styleOptions: Array<PromptConfig['visualStyle']> = [
  null, // Option for 'None' or default
  'flat',
  'outline',
  'minimalist',
  'glassmorphism',
  'ios-style',
  'material-design',
  'neumorphism',
  'retro-funky',
  'brutalist',
  'soft-ui'
];

const VisualStyleSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ visualStyle: value === 'null' ? null : value as PromptConfig['visualStyle'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="visualStyle" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        4. Visual Style
      </label>
      <select
        id="visualStyle"
        name="visualStyle"
        value={config.visualStyle === null ? 'null' : config.visualStyle}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {styleOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ') : 'Default/None'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VisualStyleSelector;
