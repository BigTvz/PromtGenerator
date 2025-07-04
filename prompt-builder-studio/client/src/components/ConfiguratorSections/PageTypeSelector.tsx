import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PageType } from '../../types/promptConfig'; // Import PageType

const pageTypeOptions: Array<PageType> = [
  null, // Option for 'None' or 'Not Applicable'
  'Landing Page',
  'Home Page',
  'About Us Page',
  'Contact Page',
  'Product List Page',
  'Product Detail Page',
  'Blog Index Page',
  'Blog Post Page',
  'Dashboard Overview',
  'Settings Page',
  'User Profile Page'
];

const PageTypeSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ pageType: value === 'null' ? null : value as PageType });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label htmlFor="pageTypeSelector" className="block text-sm font-medium text-gray-300 mb-1">
        Page Type (Optional)
      </label>
      <select
        id="pageTypeSelector"
        name="pageTypeSelector"
        value={config.pageType === null ? 'null' : config.pageType}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {pageTypeOptions.map((type) => (
          <option key={type || 'null'} value={type || 'null'}>
            {type || 'None / Not Applicable'}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-gray-400">
        Specify if you're building an entire page type.
      </p>
    </div>
  );
};

export default PageTypeSelector;
