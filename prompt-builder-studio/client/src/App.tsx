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

      {/* Main content area: Config options on top, prompt output at bottom */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Configuration Options Area (Top) */}
        {/* This will need to be scrollable if content exceeds viewport height */}
        <motion.div
          className="flex-grow bg-gray-800 p-4 overflow-y-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-medium text-gray-200 mb-6 text-center">Configuration Options</h2>
          {/* Grid for configurator sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div> {/* Close grid */}
        </motion.div>

        {/* Generated Prompt Area (Bottom) */}
        {/* This section will be fixed at the bottom, allow its content to scroll if needed */}
        <motion.div
          className="flex-shrink-0 bg-gray-900 p-6 border-t border-gray-700"
          style={{ height: '30vh', overflowY: 'auto' }} // Example fixed height, adjust as needed
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-gray-200 mb-4 sticky top-0 bg-gray-900 py-2">Generated Prompt</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow relative h-full"> {/* Ensure pre takes available height */}
            <pre className="whitespace-pre-wrap text-sm text-gray-300 h-full overflow-y-auto">
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
        </motion.div>
      </div>
    </div>
  );
}

export default App;
