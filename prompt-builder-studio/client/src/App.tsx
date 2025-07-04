import React from 'react';
import { motion } from 'framer-motion';
import './App.css'; // Assuming App.css might have some base styles or can be removed if not needed
import LayoutTypeSelector from './components/ConfiguratorSections/LayoutTypeSelector';
import TemplateSelector from './components/ConfiguratorSections/TemplateSelector';
import LayoutConfigurationSelector from './components/ConfiguratorSections/LayoutConfigurationSelector';
import FramingStyleSelector from './components/ConfiguratorSections/FramingStyleSelector';
import VisualStyleSelector from './components/ConfiguratorSections/VisualStyleSelector';
import ThemeModeSelector from './components/ConfiguratorSections/ThemeModeSelector';
import AccentColorSelector from './components/ConfiguratorSections/AccentColorSelector';
import BackgroundColorSelector from './components/ConfiguratorSections/BackgroundColorSelector';
import BorderSettingsSelector from './components/ConfiguratorSections/BorderSettingsSelector';
import ShadowDepthSelector from './components/ConfiguratorSections/ShadowDepthSelector';
import TypographyOptionsSelector from './components/ConfiguratorSections/TypographyOptionsSelector';
import TextSizesSelector from './components/ConfiguratorSections/TextSizesSelector';
import AnimationSettingsSelector from './components/ConfiguratorSections/AnimationSettingsSelector';
import { usePromptStore } from './store/promptStore';
import { generatePrompt } from './utils/promptGenerator';
// Import other configurator sections here as they are created

function App() {
  const { config } = usePromptStore();
  const generatedPrompt = generatePrompt(config);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-semibold">Prompt Builder Studio</h1>
      </header>

      <div className="flex flex-1" style={{ maxHeight: 'calc(100vh - 4rem)' /* Assuming header is 4rem (h-16) */ }}>
        {/* Left Sidebar: Configurator Sections */}
        <motion.aside
          className="w-1/3 bg-gray-800 p-4 space-y-4 overflow-y-auto border-r border-gray-700" // Reduced space-y, added border
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-medium text-gray-200 mb-4">Configuration Options</h2>
          <LayoutTypeSelector />
          <TemplateSelector />
          <LayoutConfigurationSelector />
          <FramingStyleSelector />
          <VisualStyleSelector />
          <ThemeModeSelector />
          <AccentColorSelector />
          <BackgroundColorSelector />
          <BorderSettingsSelector />
          <ShadowDepthSelector />
          <TypographyOptionsSelector />
          <TextSizesSelector />
          <AnimationSettingsSelector />
          {/* More configurator components will be added here */}
          {/* ... and so on for all 12 sections */}
        </motion.aside>

        {/* Right Content Area: Prompt Output and Preview */}
        <motion.main
          className="w-2/3 p-6 bg-gray-900"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-gray-200 mb-4">Generated Prompt</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow relative">
            <pre className="whitespace-pre-wrap text-sm text-gray-300">
              {generatedPrompt}
            </pre>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => {
                const markdownContent = `# Prompt Builder Studio Output\n\n\`\`\`\n${generatedPrompt}\n\`\`\`\n`;
                const blob = new Blob([markdownContent], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'prompt.md';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Export as Markdown
            </button>
          </div>

          {/* Optional: Live Preview Area */}
          {/*
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-200 mb-4">Live Preview (Optional)</h2>
            <div className="bg-gray-800 p-4 rounded-md shadow h-64">
              Placeholder for live preview...
            </div>
          </div>
          */}
        </motion.main>
      </div>
    </div>
  );
}

export default App;
