import React from 'react';
import { usePromptStore } from '../../store/promptStore';

const TopicInput: React.FC = () => {
  const { config, setConfig } = usePromptStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ topic: event.target.value });
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow">
      <label htmlFor="topicInput" className="block text-sm font-medium text-gray-300 mb-1">
        Project Topic / Subject Matter
      </label>
      <input
        type="text"
        id="topicInput"
        name="topicInput"
        value={config.topic}
        onChange={handleChange}
        placeholder="e.g., E-commerce site for handmade soaps"
        className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p className="mt-1 text-xs text-gray-400">
        Describe the main subject or purpose of the UI you want to build.
      </p>
    </div>
  );
};

export default TopicInput;
