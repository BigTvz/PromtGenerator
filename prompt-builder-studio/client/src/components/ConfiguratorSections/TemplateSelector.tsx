import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const templates: Array<PromptConfig['template']> = [
  null, // Option for 'None' or 'Custom'
  'hero', 'features', 'onboarding', 'docs', 'updates', 'portfolio',
  'pricing', 'contact', 'testimonials', 'login', 'signup', 'dashboard', 'blog'
];

const TemplateSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setConfig({ template: value === 'null' ? null : value as PromptConfig['template'] });
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700">
      <label htmlFor="template" className="block text-sm font-medium text-gray-300 mb-1 px-2">
        Templates (Layout Type Sub-section)
      </label>
      <select
        id="template"
        name="template"
        value={config.template === null ? 'null' : config.template}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {templates.map((template) => (
          <option key={template || 'null'} value={template || 'null'}>
            {template ? template.charAt(0).toUpperCase() + template.slice(1) : 'None/Custom'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
