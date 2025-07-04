import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const typefaceFamilyOptions: Array<PromptConfig['typography']['typefaceFamily']> = [null, 'sans', 'serif', 'monospace', 'condensed', 'expanded', 'rounded'];
const headingFontOptions: Array<PromptConfig['typography']['headingFont']> = [null, 'inter', 'geist', 'manrope', 'jakarta-sans', 'space-grotesk', 'open-sans', 'lexend', 'poppins', 'sora'];
const bodyUiFontOptions: Array<PromptConfig['typography']['bodyUiFont']> = [null, 'inter', 'geist', 'manrope', 'plex-sans', 'instrument-serif', 'playfair-display'];

const TypographyOptionsSelector: React.FC = () => {
  const store = usePromptStore();
  const { typography } = store.config;

  const handleChange = (field: keyof PromptConfig['typography'], value: string | null) => {
    store.updateNestedConfig('typography', field, value as any); // Cast as any due to discriminated union complexity for Zustand
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow space-y-4">
      <h3 className="text-sm font-medium text-gray-300 mb-1">10. Typography Options</h3>

      {/* Typeface Family */}
      <div>
        <label htmlFor="typefaceFamily" className="block text-xs font-medium text-gray-400 mb-1">
          Typeface Family
        </label>
        <select
          id="typefaceFamily"
          name="typefaceFamily"
          value={typography.typefaceFamily || ''}
          onChange={(e) => handleChange('typefaceFamily', e.target.value === '' ? null : e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {typefaceFamilyOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default'}
            </option>
          ))}
        </select>
      </div>

      {/* Heading Font */}
      <div>
        <label htmlFor="headingFont" className="block text-xs font-medium text-gray-400 mb-1">
          Heading Font
        </label>
        <select
          id="headingFont"
          name="headingFont"
          value={typography.headingFont || ''}
          onChange={(e) => handleChange('headingFont', e.target.value === '' ? null : e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {headingFontOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g,' ') : 'Default'}
            </option>
          ))}
        </select>
      </div>

      {/* Body & UI Font */}
      <div>
        <label htmlFor="bodyUiFont" className="block text-xs font-medium text-gray-400 mb-1">
          Body & UI Font
        </label>
        <select
          id="bodyUiFont"
          name="bodyUiFont"
          value={typography.bodyUiFont || ''}
          onChange={(e) => handleChange('bodyUiFont', e.target.value === '' ? null : e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {bodyUiFontOptions.map((option) => (
            <option key={option || 'null'} value={option || ''}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g,' ') : 'Default'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TypographyOptionsSelector;
