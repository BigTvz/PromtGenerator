import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

type ThemeMode = PromptConfig['themeMode'];

// Extended to include null for a 'Default' or 'None' option if desired later.
// For now, we'll map null to a default visual if it's part of the options.
const themeOptions: Array<ThemeMode> = [
  'light',
  'dark',
  'auto',
  'toggleable'
  // null can be added if a "none" or "default unselected" state is needed
];

// Simple visual representations (emojis or could be SVG icons)
const themeIcons: Record<Exclude<ThemeMode, null>, string> = {
  light: '☀️',
  dark: '🌙',
  auto: '⚙️', // System/Automatic
  toggleable: '🔄' // Toggle
};

const ThemeModeSelector: React.FC = () => {
  const { config, setConfig } = usePromptStore();
  const selectedTheme = config.themeMode;

  const handleSelect = (theme: ThemeMode) => {
    setConfig({ themeMode: theme });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        5. Theme Mode
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1"> {/* Removed px-2, added mt-1 */}
        {themeOptions.map((theme) => {
          if (!theme) return null; // In case null is added to themeOptions later

          const isActive = selectedTheme === theme;
          const icon = themeIcons[theme];

          return (
            <button
              key={theme}
              type="button"
              onClick={() => handleSelect(theme)}
              className={`p-3 rounded-md border-2 text-center transition-colors flex flex-col items-center justify-center
                ${isActive
                  ? 'bg-indigo-600 border-indigo-500 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-300'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500`}
              title={theme.charAt(0).toUpperCase() + theme.slice(1)}
            >
              <span className="block text-xl">{icon}</span>
              <span className="block text-xs mt-1 capitalize">{theme}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeModeSelector;
