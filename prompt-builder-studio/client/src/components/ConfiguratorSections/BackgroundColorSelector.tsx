import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const bgColorTypeOptions: Array<PromptConfig['backgroundColor']['type']> = [
  null,
  'transparent',
  'neutral',
  'gray',
  'slate',
  'zinc',
  'stone',
  'black',
  'white',
  'gradient',
  'image'
];

// Basic Tailwind gray shades for selection if 'gray' type is chosen
const grayShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

const BackgroundColorSelector: React.FC = () => {
  const { config, updateNestedConfig } = usePromptStore();
  const { backgroundColor } = config;

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value === 'null' ? null : event.target.value as PromptConfig['backgroundColor']['type'];
    updateNestedConfig('backgroundColor', 'type', newType);
    // Reset other values when type changes
    updateNestedConfig('backgroundColor', 'value', '');
    updateNestedConfig('backgroundColor', 'gradientDetails', undefined);
    updateNestedConfig('backgroundColor', 'imageUrl', undefined);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateNestedConfig('backgroundColor', 'value', event.target.value);
  };

  // TODO: Add inputs for gradientDetails and imageUrl based on type

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow space-y-3">
      <label htmlFor="backgroundColorType" className="block text-sm font-medium text-gray-300 mb-1">
        7. Background Color
      </label>
      <select
        id="backgroundColorType"
        name="backgroundColorType"
        value={backgroundColor.type === null ? 'null' : backgroundColor.type}
        onChange={handleTypeChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {bgColorTypeOptions.map((option) => (
          <option key={option || 'null'} value={option || 'null'}>
            {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default/None'}
          </option>
        ))}
      </select>

      {backgroundColor.type === 'gray' && (
        <div>
          <label htmlFor="backgroundColorGrayShade" className="block text-xs font-medium text-gray-400 mb-1">
            Gray Shade
          </label>
          <select
            id="backgroundColorGrayShade"
            name="backgroundColorGrayShade"
            value={backgroundColor.value || ''}
            onChange={handleValueChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select shade</option>
            {grayShades.map(shade => (
              <option key={shade} value={`gray-${shade}`}>{`Gray ${shade}`}</option>
            ))}
          </select>
        </div>
      )}

      {(backgroundColor.type === 'neutral' ||
        backgroundColor.type === 'slate' ||
        backgroundColor.type === 'zinc' ||
        backgroundColor.type === 'stone') && (
        <div>
          <label htmlFor={`backgroundColor${backgroundColor.type}Shade`} className="block text-xs font-medium text-gray-400 mb-1 capitalize">
            {backgroundColor.type} Shade (e.g., {backgroundColor.type}-500)
          </label>
          <input
            type="text"
            id={`backgroundColor${backgroundColor.type}Shade`}
            name={`backgroundColor${backgroundColor.type}Shade`}
            value={backgroundColor.value || ''}
            onChange={handleValueChange}
            placeholder="e.g., 500 or color-name-500"
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
           <p className="mt-1 text-xs text-gray-500">
            Enter shade (e.g., 500) or full name (e.g., {backgroundColor.type}-500).
          </p>
        </div>
      )}

      {/* Gradient Picker Inputs */}
      {backgroundColor.type === 'gradient' && (
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-medium text-gray-400">Gradient Details</label>
          <input
            type="text"
            placeholder="Direction (e.g., 'to bottom right')"
            value={backgroundColor.gradientDetails?.direction || ''}
            onChange={(e) => updateNestedConfig('backgroundColor', 'gradientDetails', { ...{direction: '', fromColor: '', toColor: ''}, ...backgroundColor.gradientDetails, direction: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="From Color (e.g., 'blue-500')"
            value={backgroundColor.gradientDetails?.fromColor || ''}
            onChange={(e) => updateNestedConfig('backgroundColor', 'gradientDetails', { ...{direction: '', fromColor: '', toColor: ''}, ...backgroundColor.gradientDetails, fromColor: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="To Color (e.g., 'purple-600')"
            value={backgroundColor.gradientDetails?.toColor || ''}
            onChange={(e) => updateNestedConfig('backgroundColor', 'gradientDetails', { ...{direction: '', fromColor: '', toColor: ''}, ...backgroundColor.gradientDetails, toColor: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      {/* Image URL Input */}
      {backgroundColor.type === 'image' && (
        <div className="pt-2">
          <label htmlFor="backgroundImageUrl" className="block text-xs font-medium text-gray-400 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="backgroundImageUrl"
            name="backgroundImageUrl"
            placeholder="https://example.com/image.png"
            value={backgroundColor.imageUrl || ''}
            onChange={(e) => updateNestedConfig('backgroundColor', 'imageUrl', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

    </div>
  );
};

export default BackgroundColorSelector;
