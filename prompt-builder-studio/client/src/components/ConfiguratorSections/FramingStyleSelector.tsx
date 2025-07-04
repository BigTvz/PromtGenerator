import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const framingOptions: Array<PromptConfig['framingStyle']> = [
  null, // Option for 'None'
  'fullscreen',
  'card-frame',
  'browser-mockup',
  'mac-app-mockup',
  'clay-device-frame',
  'windowed-container'
];

const FramingStyleSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ framingStyle: value === 'null' ? null : value as PromptConfig['framingStyle'] });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label htmlFor="framingStyle" className="block text-sm font-medium text-gray-300 mb-1">
        3. Framing Style
      </label>
      <select
        id="framingStyle"
        name="framingStyle"
        value={config.framingStyle === null ? 'null' : config.framingStyle}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {framingOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ') : 'None'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FramingStyleSelector;
