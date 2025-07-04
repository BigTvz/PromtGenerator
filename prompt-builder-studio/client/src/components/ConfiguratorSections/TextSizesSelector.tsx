import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const headingSizeOptions: Array<PromptConfig['typography']['headingSize']> = [null, '20-32px', '32-40px', '48-64px', '64-80px'];
const subheadingSizeOptions: Array<PromptConfig['typography']['subheadingSize']> = [null, '16-20px', '20-24px', '24-28px', '28-32px'];
const bodySizeOptions: Array<PromptConfig['typography']['bodySize']> = [null, '12-14px', '14-16px', '16-18px'];

const TextSizesSelector: React.FC = () => {
  const store = usePromptStore();
  const { typography } = store.config;

  const handleChange = (field: keyof Pick<PromptConfig['typography'], 'headingSize' | 'subheadingSize' | 'bodySize'>, value: string | null) => {
    store.updateNestedConfig('typography', field, value as any);
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow space-y-4">
      <h3 className="text-sm font-medium text-gray-300 mb-1">11. Text Sizes</h3>

      {/* Heading Size */}
      <div>
        <label htmlFor="headingSize" className="block text-xs font-medium text-gray-400 mb-1">
          Heading Size
        </label>
        <select
          id="headingSize"
          name="headingSize"
          value={typography.headingSize || ''}
          onChange={(e) => handleChange('headingSize', e.target.value === '' ? null : e.target.value as PromptConfig['typography']['headingSize'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {headingSizeOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option || 'Default'}
            </option>
          ))}
        </select>
      </div>

      {/* Subheading Size */}
      <div>
        <label htmlFor="subheadingSize" className="block text-xs font-medium text-gray-400 mb-1">
          Subheading Size
        </label>
        <select
          id="subheadingSize"
          name="subheadingSize"
          value={typography.subheadingSize || ''}
          onChange={(e) => handleChange('subheadingSize', e.target.value === '' ? null : e.target.value as PromptConfig['typography']['subheadingSize'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {subheadingSizeOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option || 'Default'}
            </option>
          ))}
        </select>
      </div>

      {/* Body Size */}
      <div>
        <label htmlFor="bodySize" className="block text-xs font-medium text-gray-400 mb-1">
          Body Size
        </label>
        <select
          id="bodySize"
          name="bodySize"
          value={typography.bodySize || ''}
          onChange={(e) => handleChange('bodySize', e.target.value === '' ? null : e.target.value as PromptConfig['typography']['bodySize'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {bodySizeOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option || 'Default'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TextSizesSelector;
