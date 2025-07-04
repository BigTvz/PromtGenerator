import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

type LayoutType = PromptConfig['layoutType'];

const layoutTypes: LayoutType[] = ['web', 'mobile'];

const LayoutTypeSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();
  const selectedLayoutType = config.layoutType;

  const handleSelect = (layoutType: LayoutType) => {
    setConfig({ layoutType });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow"> {/* New card style */}
      <label className="block text-sm font-medium text-gray-300 mb-2"> {/* Removed px-2 from label, relying on card padding */}
        1. Layout Type
      </label>
      <div className="flex space-x-2 mt-1"> {/* Removed px-2, added mt-1 for spacing from label */}
        {layoutTypes.map((layoutType) => {
          const isActive = selectedLayoutType === layoutType;
          return (
            <button
              key={layoutType}
              type="button"
              onClick={() => handleSelect(layoutType)}
              className={`flex-1 p-3 rounded-md border-2 text-center transition-colors
                ${isActive
                  ? 'bg-indigo-600 border-indigo-500 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-300'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500`}
              title={layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}
            >
              {/* Basic representation - could be replaced with actual icons */}
              <span className="block text-lg">
                {layoutType === 'web' ? '🖥️' : '📱'}
              </span>
              <span className="block text-xs mt-1 capitalize">{layoutType}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutTypeSelector;
