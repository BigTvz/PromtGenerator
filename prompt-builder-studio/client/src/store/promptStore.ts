import { create } from 'zustand';
import { PromptConfig, initialPromptConfig } from '../types/promptConfig';

interface PromptState {
  config: PromptConfig;
  setConfig: (newConfig: Partial<PromptConfig>) => void;
  // Simplified signature to avoid complex generic errors with Zustand and CRA's TS setup
  updateNestedConfig: (
    key: keyof PromptConfig, // Any key of PromptConfig
    nestedKey: string,       // Assume it's a valid key for the object at config[key]
    value: any               // Assume it's a valid value for that nestedKey
  ) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  config: initialPromptConfig,
  setConfig: (newConfig) =>
    set((state) => ({ config: { ...state.config, ...newConfig } })),

  updateNestedConfig: (key, nestedKey, value) =>
    set((state) => {
      const targetObject = state.config[key] as Record<string, any>;
      if (typeof targetObject !== 'object' || targetObject === null) {
        // This case should ideally not happen if called correctly,
        // e.g. calling updateNestedConfig with a top-level primitive key
        console.warn(`updateNestedConfig called on non-object property: ${String(key)}`);
        return state; // Or handle error appropriately
      }

      return {
        config: {
          ...state.config,
          [key]: {
            ...targetObject,
            [nestedKey]: value,
          },
        },
      };
    }),
}));

// Example of how to update a nested property like typography.headingFont:
// usePromptStore.getState().updateNestedConfig('typography', 'headingFont', 'geist');
// Call sites need to ensure that 'typography' is a key for an object,
// 'headingFont' is a key in that object, and 'geist' is the correct type.

// Example of how to update a top-level property like layoutType:
// usePromptStore.getState().setConfig({ layoutType: 'mobile' });
