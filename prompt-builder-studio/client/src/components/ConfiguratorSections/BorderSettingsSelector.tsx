import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const borderColorTypeOptions: Array<PromptConfig['border']['color']> = [
  null, // Default
  'transparent',
  'neutral',
  'gray',
  'slate',
  'zinc',
  'stone',
  'custom'
];

const borderStyleOptions: Array<PromptConfig['border']['style']> = [
  null, // Default (likely solid)
  'solid',
  'dashed',
  'dotted'
];

const BorderSettingsSelector: React.FC = () => {
  const store = usePromptStore();
  const { border } = store.config;

  const handleColorTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value === 'null' ? null : event.target.value as PromptConfig['border']['color'];
    store.updateNestedConfig('border', 'color', newType);
    if (newType !== 'custom') {
      store.updateNestedConfig('border', 'customColorValue', undefined);
    }
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.updateNestedConfig('border', 'customColorValue', event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const radius = parseInt(event.target.value, 10);
    store.updateNestedConfig('border', 'radius', isNaN(radius) ? 0 : Math.max(0, Math.min(64, radius)));
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = event.target.value === 'null' ? null : event.target.value as PromptConfig['border']['style'];
    store.updateNestedConfig('border', 'style', newStyle);
  };

  return (
    <div className="py-4 px-2 border-b border-gray-700 space-y-4">
      <h3 className="text-sm font-medium text-gray-300 mb-1 px-2">8. Border Settings</h3>

      {/* Border Color Type */}
      <div>
        <label htmlFor="borderColorType" className="block text-xs font-medium text-gray-400 mb-1">
          Border Color
        </label>
        <select
          id="borderColorType"
          name="borderColorType"
          value={border.color === null ? 'null' : border.color}
          onChange={handleColorTypeChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {borderColorTypeOptions.map((option) => (
            <option key={option || 'null'} value={option || 'null'}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default/None'}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Border Color Value */}
      {border.color === 'custom' && (
        <div>
          <label htmlFor="customBorderColor" className="block text-xs font-medium text-gray-400 mb-1">
            Custom Border Color (Hex)
          </label>
          <input
            type="text"
            id="customBorderColor"
            name="customBorderColor"
            value={border.customColorValue || ''}
            onChange={handleCustomColorChange}
            placeholder="#RRGGBB"
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      {/* Border Radius */}
      <div>
        <label htmlFor="borderRadius" className="block text-xs font-medium text-gray-400 mb-1">
          Border Radius (0-64px) - Current: {border.radius}px
        </label>
        <input
          type="range"
          id="borderRadius"
          name="borderRadius"
          min="0"
          max="64"
          value={border.radius}
          onChange={handleRadiusChange}
          className="mt-1 block w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Border Style */}
      <div>
        <label htmlFor="borderStyle" className="block text-xs font-medium text-gray-400 mb-1">
          Border Style
        </label>
        <select
          id="borderStyle"
          name="borderStyle"
          value={border.style === null ? 'null' : border.style}
          onChange={handleStyleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {borderStyleOptions.map((option) => (
            <option key={option || 'null'} value={option || 'null'}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'Default (Solid)'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BorderSettingsSelector;
