import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

type AccentColor = PromptConfig['accentColor'];

const accentColorOptions: Array<AccentColor> = [
  // null, // Removing 'Default/None' for now, assuming an accent color is usually desired. Can be added back.
  'primary', // This will need special handling or map to a default (e.g., blue or first in list)
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'orange',
  'teal',
  'green',
  'yellow',
  'rose'
];

// Tailwind background color classes for swatches (using -500 shade as an example)
const colorSwatchClasses: Record<Exclude<AccentColor, null | 'primary'>, string> = {
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  rose: 'bg-rose-500',
};

const AccentColorSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();
  const selectedColor = config.accentColor;

  const handleColorSelect = (color: AccentColor) => {
    setConfig({ accentColor: color });
  };

  // Handle 'primary' - map to a default like blue for swatch display, or handle as a special case
  const getSwatchClass = (color: AccentColor): string => {
    if (color === 'primary') {
      return colorSwatchClasses.blue; // Example: 'primary' swatch looks like blue
    }
    return color ? colorSwatchClasses[color as Exclude<AccentColor, null | 'primary'>] || 'bg-gray-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        6. Accent Color <span className="text-xs capitalize">({selectedColor || 'None'})</span>
      </label>
      <div className="flex flex-wrap gap-2 mt-1"> {/* Removed px-2, added mt-1 */}
        {accentColorOptions.map((color) => {
          if (!color) return null; // Skip null if we decide not to have a 'None' swatch

          const swatchClass = getSwatchClass(color);
          const isActive = selectedColor === color;

          return (
            <button
              key={color}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                isActive ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : 'border-gray-600 hover:border-gray-400'
              } ${swatchClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            >
              {/* Optionally, add a checkmark or other indicator for active state if colors are too similar */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AccentColorSelector;
