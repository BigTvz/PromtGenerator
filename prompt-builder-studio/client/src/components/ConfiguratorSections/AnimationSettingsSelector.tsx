import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import { PromptConfig } from '../../types/promptConfig';

const availableEffects: Array<PromptConfig['animation']['effects'][0]> = ['fade', 'slide', 'scale', 'blur', 'bounce'];
const triggerOptions: Array<PromptConfig['animation']['trigger']> = [null, 'onload', 'onhover', 'onscroll'];
const directionOptions: Array<PromptConfig['animation']['direction']> = [null, 'normal', 'reverse', 'alternate'];
const easingOptions: Array<PromptConfig['animation']['easing']> = [null, 'ease-in', 'ease-out', 'linear', 'ease-in-out'];
const sequenceOptions: Array<PromptConfig['animation']['sequence']> = ['none', 'chained'];


const AnimationSettingsSelector: React.FC = () => {
  const store = usePromptStore();
  const { animation } = store.config;

  const handleEffectToggle = (effect: PromptConfig['animation']['effects'][0]) => {
    const currentEffects = animation.effects || [];
    const newEffects = currentEffects.includes(effect)
      ? currentEffects.filter(e => e !== effect)
      : [...currentEffects, effect];
    store.updateNestedConfig('animation', 'effects', newEffects);
  };

  const handleChange = (
    field: keyof Omit<PromptConfig['animation'], 'effects' | 'loop'>,
    value: string | number | null
  ) => {
    store.updateNestedConfig('animation', field, value as any);
  };

  const handleNumberChange = (
    field: keyof Pick<PromptConfig['animation'], 'duration' | 'delay'>,
    value: string
  ) => {
    const numValue = parseFloat(value);
    store.updateNestedConfig('animation', field, isNaN(numValue) ? 0 : numValue);
  };

  const handleLoopToggle = () => {
    store.updateNestedConfig('animation', 'loop', !animation.loop);
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow space-y-4">
      <h3 className="text-sm font-medium text-gray-300 mb-1">12. Effects & Animations</h3>

      {/* Effects (Multi-select checkboxes) */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">Effects</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {availableEffects.map((effect) => (
            <label key={effect} className="flex items-center space-x-2 p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={(animation.effects || []).includes(effect)}
                onChange={() => handleEffectToggle(effect)}
                className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-800 border-gray-600 focus:ring-indigo-500 rounded"
              />
              <span className="text-sm text-gray-300 capitalize">{effect}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Trigger */}
      <div>
        <label htmlFor="animationTrigger" className="block text-xs font-medium text-gray-400 mb-1">Trigger</label>
        <select
          id="animationTrigger"
          value={animation.trigger || ''}
          onChange={(e) => handleChange('trigger', e.target.value === '' ? null : e.target.value as PromptConfig['animation']['trigger'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {triggerOptions.map(opt => <option key={opt || 'null'} value={opt || ''}>{opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : 'Default'}</option>)}
        </select>
      </div>

      {/* Duration & Delay */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="animationDuration" className="block text-xs font-medium text-gray-400 mb-1">Duration (s)</label>
          <input
            type="number"
            id="animationDuration"
            value={animation.duration}
            onChange={(e) => handleNumberChange('duration', e.target.value)}
            step="0.1" min="0"
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="animationDelay" className="block text-xs font-medium text-gray-400 mb-1">Delay (s)</label>
          <input
            type="number"
            id="animationDelay"
            value={animation.delay}
            onChange={(e) => handleNumberChange('delay', e.target.value)}
            step="0.1" min="0"
            className="mt-1 block w-full px-3 py-2 border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Direction */}
      <div>
        <label htmlFor="animationDirection" className="block text-xs font-medium text-gray-400 mb-1">Direction</label>
        <select
          id="animationDirection"
          value={animation.direction || ''}
          onChange={(e) => handleChange('direction', e.target.value === '' ? null : e.target.value as PromptConfig['animation']['direction'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {directionOptions.map(opt => <option key={opt || 'null'} value={opt || ''}>{opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : 'Default'}</option>)}
        </select>
      </div>

      {/* Easing */}
      <div>
        <label htmlFor="animationEasing" className="block text-xs font-medium text-gray-400 mb-1">Easing</label>
        <select
          id="animationEasing"
          value={animation.easing || ''}
          onChange={(e) => handleChange('easing', e.target.value === '' ? null : e.target.value as PromptConfig['animation']['easing'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {easingOptions.map(opt => <option key={opt || 'null'} value={opt || ''}>{opt ? opt.charAt(0).toUpperCase() + opt.slice(1).replace(/-/g,' ') : 'Default'}</option>)}
        </select>
      </div>

      {/* Sequence */}
      <div>
        <label htmlFor="animationSequence" className="block text-xs font-medium text-gray-400 mb-1">Sequence</label>
        <select
          id="animationSequence"
          value={animation.sequence || 'none'}
          onChange={(e) => handleChange('sequence', e.target.value as PromptConfig['animation']['sequence'])}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {sequenceOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
      </div>

      {/* Loop */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={animation.loop}
            onChange={handleLoopToggle}
            className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-800 border-gray-600 focus:ring-indigo-500 rounded"
          />
          <span className="text-sm text-gray-300">Loop Animation</span>
        </label>
      </div>

    </div>
  );
};

export default AnimationSettingsSelector;
