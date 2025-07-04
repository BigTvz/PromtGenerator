import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const LayoutTypeSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({ layoutType: event.target.value as PromptConfig['layoutType'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="layoutType" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        1. Layout Type
      </label>
      <select
        id="layoutType"
        name="layoutType"
        value={config.layoutType}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
      </select>
    </div>
  );
};

export default LayoutTypeSelector;
