import { generatePrompt } from './promptGenerator';
import { PromptConfig, initialPromptConfig } from '../types/promptConfig';

import { PageType } from '../types/promptConfig'; // Import PageType

describe('generatePrompt', () => {
  it('should generate a basic prompt with default web settings', () => {
    const config: PromptConfig = {
      ...initialPromptConfig, // Start with defaults
      layoutType: 'web',
      template: 'hero',
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a hero section for a web app.');
    // Visual style is now 'flat' by default in initialPromptConfig
    expect(prompt).toContain('flat style.');
    expect(prompt).toContain('Light mode theme.'); // Default theme
    expect(prompt).toContain('Accent color: Primary'); // Default accent
  });

  it('should include layout configuration when specified', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      layoutType: 'mobile',
      template: 'onboarding',
      layoutConfiguration: 'card',
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a onboarding section for a mobile app with a card layout.');
  });

  it('should correctly format framing and visual style', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      framingStyle: 'browser-mockup',
      visualStyle: 'glassmorphism',
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Use browser mockup framing with glassmorphism style.');
  });

  it('should handle theme modes correctly', () => {
    const configToggle: PromptConfig = { ...initialPromptConfig, themeMode: 'toggleable' };
    expect(generatePrompt(configToggle)).toContain('The theme should be toggleable (light/dark).');
    const configDark: PromptConfig = { ...initialPromptConfig, themeMode: 'dark' };
    expect(generatePrompt(configDark)).toContain('Dark mode theme.');
  });

  it('should specify accent color', () => {
    const config: PromptConfig = { ...initialPromptConfig, accentColor: 'blue' };
    expect(generatePrompt(config)).toContain('Accent color: Blue (Tailwind 500 or equivalent).');
  });

  it('should handle different background color types', () => {
    const configTransparent: PromptConfig = { ...initialPromptConfig, backgroundColor: { type: 'transparent' }};
    expect(generatePrompt(configTransparent)).toContain('Background: Transparent.');

    const configGray: PromptConfig = { ...initialPromptConfig, backgroundColor: { type: 'gray', value: 'gray-700' }};
    expect(generatePrompt(configGray)).toContain('Background: gray-700.');

    // Basic check, gradient/image details are simplified in current generator
    const configGradient: PromptConfig = { ...initialPromptConfig, backgroundColor: { type: 'gradient', gradientDetails: { direction: 'to right', fromColor: 'blue-500', toColor: 'purple-600'} }};
    expect(generatePrompt(configGradient)).toContain('Background: Gradient from blue-500 to purple-600, direction to right.');
  });

  it('should detail border settings', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      border: { color: 'slate', radius: 16, style: 'dashed', customColorValue: '' }
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Border: Color slate, Radius 16px, Style dashed.');
  });

  it('should include shadow depth', () => {
    const config: PromptConfig = { ...initialPromptConfig, shadowDepth: 'large' };
    expect(generatePrompt(config)).toContain('Shadow: large.');
  });

  it('should detail typography options', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      typography: {
        ...initialPromptConfig.typography,
        typefaceFamily: 'serif',
        headingFont: 'geist',
        bodyUiFont: 'manrope',
        headingSize: '48-64px',
      }
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Typography: Use serif fonts.');
    expect(prompt).toContain('Heading font: geist.');
    expect(prompt).toContain('Body/UI font: manrope.');
    expect(prompt).toContain('Heading size: 48-64px.');
  });

  it('should detail animation settings', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      animation: {
        effects: ['fade', 'slide'],
        trigger: 'onscroll',
        duration: 1.2,
        delay: 0.3,
        direction: 'alternate',
        easing: 'ease-in-out',
        loop: true,
        sequence: 'chained',
      }
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Animation: Effects: fade, slide.');
    expect(prompt).toContain('Trigger: onscroll.');
    expect(prompt).toContain('Duration: 1.2s.');
    expect(prompt).toContain('Delay: 0.3s.');
    expect(prompt).toContain('Direction: alternate.');
    expect(prompt).toContain('Easing: ease-in-out.');
    expect(prompt).toContain('Looping.');
    expect(prompt).toContain('Sequence: chained.');
  });

  it('should include additional prompt details', () => {
    const config: PromptConfig = { ...initialPromptConfig, additionalPromptDetails: "Make it pop." };
    expect(generatePrompt(config)).toContain("Make it pop.");
  });

  it('should handle null or default values gracefully', () => {
    // Test with mostly initialPromptConfig
    const prompt = generatePrompt(initialPromptConfig);
    expect(prompt).not.toContain("layoutConfiguration"); // Should not be there if null
    expect(prompt).not.toContain("framingStyle"); // Should not be there if null
    // Add more checks for other nullable fields if their absence means specific wording
    // For example, if shadowDepth is 'none', it shouldn't say 'Shadow: none.' but rather omit shadow part or say 'No shadow.'
    // Current generator includes "Shadow: none." if it's none and not null.
    // If shadowDepth is null (which it is in initialPromptConfig), it should not mention shadow.
    expect(prompt).not.toContain("Shadow:");
  });

  // New tests for topic and pageType
  it('should include topic when specified', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      topic: 'sustainable gardening',
      template: 'features',
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a features section for a web app about sustainable gardening.');
  });

  it('should use pageType as the main subject if template is null', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      topic: 'AI-powered analytics',
      pageType: 'Dashboard Overview',
      template: null,
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a Dashboard Overview, including common sections like a hero, features, and testimonials for a web app about AI-powered analytics.');
  });

  it('should use template as a subsection of pageType if both are specified', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      topic: 'gourmet cat food',
      pageType: 'Landing Page',
      template: 'hero',
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a hero section for your Landing Page for a web app about gourmet cat food.');
  });

  it('should handle pageType without topic', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      pageType: 'Contact Page',
      template: null,
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a Contact Page, including common sections like a hero, features, and testimonials for a web app.');
  });

  it('should generate a prompt for a custom section with a topic', () => {
    const config: PromptConfig = {
      ...initialPromptConfig,
      topic: 'vintage cars',
      template: null,
      pageType: null,
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('Create a custom UI component/section for a web app about vintage cars.');
  });

});
