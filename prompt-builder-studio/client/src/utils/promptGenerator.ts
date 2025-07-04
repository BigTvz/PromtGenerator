import { PromptConfig, PageType } from '../types/promptConfig';

export function generatePrompt(config: PromptConfig): string {
  let subject = "";
  let context = `for a ${config.layoutType} app`;

  if (config.topic) {
    context += ` about ${config.topic}`;
  }

  if (config.pageType) {
    subject = config.pageType;
    if (config.template) {
      // e.g., "a hero section for your Landing Page"
      subject = `a ${config.template} section for your ${config.pageType}`;
    } else {
      // e.g., "a Landing Page, including key sections like hero, features, etc."
      // This part could be made more dynamic based on common sections for a pageType
      subject = `a ${config.pageType}, including common sections like a hero, features, and testimonials`;
    }
  } else if (config.template) {
    subject = `a ${config.template} section`;
  } else {
    subject = "a custom UI component/section";
  }

  let prompt = `Create ${subject} ${context}`;

  if (config.layoutConfiguration) {
    prompt += ` with a ${config.layoutConfiguration.replace(/-/g, ' ')} layout`;
  }
  prompt += ".";

  if (config.framingStyle) {
    prompt += ` Use ${config.framingStyle.replace(/-/g, ' ')} framing`;
  }
  if (config.visualStyle) {
    prompt += ` with ${config.visualStyle.replace(/-/g, ' ')} style.`;
  } else {
    prompt += ".";
  }

  if (config.themeMode) {
    if (config.themeMode === 'toggleable') {
      prompt += ` The theme should be toggleable (light/dark).`;
    } else if (config.themeMode === 'auto') {
      prompt += ` Use system default theme (auto light/dark).`;
    } else {
      prompt += ` ${config.themeMode.charAt(0).toUpperCase() + config.themeMode.slice(1)} mode theme.`;
    }
  }

  if (config.accentColor) {
    prompt += ` Accent color: ${config.accentColor.charAt(0).toUpperCase() + config.accentColor.slice(1)} (Tailwind 500 or equivalent).`;
  }

  // Background Color
  let bgDetails = "Background: ";
  switch (config.backgroundColor.type) {
    case 'transparent':
      bgDetails += 'Transparent.';
      break;
    case 'black':
    case 'white':
      bgDetails += `${config.backgroundColor.type.charAt(0).toUpperCase() + config.backgroundColor.type.slice(1)}.`;
      break;
    case 'gray':
    case 'neutral':
    case 'slate':
    case 'zinc':
    case 'stone':
      bgDetails += `${config.backgroundColor.value || config.backgroundColor.type}.`; // e.g., gray-700 or just gray if no value
      break;
    case 'gradient':
      if (config.backgroundColor.gradientDetails) {
        const { direction, fromColor, toColor } = config.backgroundColor.gradientDetails;
        bgDetails += `Gradient from ${fromColor} to ${toColor}, direction ${direction}.`;
      } else {
        bgDetails += `Gradient (details TBD).`;
      }
      break;
    case 'image':
      if (config.backgroundColor.imageUrl) {
        bgDetails += `Image background (URL: ${config.backgroundColor.imageUrl}).`;
      } else {
        bgDetails += `Image background (URL TBD).`;
      }
      break;
    default:
      bgDetails += 'Default.';
      break;
  }
  prompt += ` ${bgDetails}`;

  // Border
  if (config.border.color !== 'transparent' || config.border.radius > 0) {
    let borderDetails = "Border: ";
    if (config.border.color === 'custom' && config.border.customColorValue) {
      borderDetails += `Color ${config.border.customColorValue}`;
    } else if (config.border.color && config.border.color !== 'transparent') {
      borderDetails += `Color ${config.border.color}`;
    }
    if (config.border.radius > 0) {
      borderDetails += `${borderDetails === "Border: " ? "" : ", "}Radius ${config.border.radius}px`;
    }
    if (config.border.style) {
      borderDetails += `${borderDetails === "Border: " ? "" : ", "}Style ${config.border.style}`;
    }
    prompt += ` ${borderDetails.trim() === "Border:" ? "No visible border." : borderDetails + "."}`;
  }


  if (config.shadowDepth && config.shadowDepth !== 'none') {
    prompt += ` Shadow: ${config.shadowDepth.replace(/-/g, ' ')}.`;
  }

  // Typography
  let typoDetails = "Typography: ";
  if (config.typography.typefaceFamily) typoDetails += `Use ${config.typography.typefaceFamily} fonts. `;
  if (config.typography.headingFont) typoDetails += `Heading font: ${config.typography.headingFont.replace(/-/g,' ')}. `;
  if (config.typography.bodyUiFont) typoDetails += `Body/UI font: ${config.typography.bodyUiFont.replace(/-/g,' ')}. `;
  if (config.typography.headingSize) typoDetails += `Heading size: ${config.typography.headingSize}. `;
  if (config.typography.subheadingSize) typoDetails += `Subheading size: ${config.typography.subheadingSize}. `;
  if (config.typography.bodySize) typoDetails += `Body size: ${config.typography.bodySize}.`;
  if (typoDetails.trim() !== "Typography:") prompt += ` ${typoDetails.trim()}`;


  // Animation
  if (config.animation.effects && config.animation.effects.length > 0) {
    let animDetails = "Animation: ";
    animDetails += `Effects: ${config.animation.effects.join(', ')}. `;
    if (config.animation.trigger) animDetails += `Trigger: ${config.animation.trigger}. `;
    animDetails += `Duration: ${config.animation.duration}s. `;
    animDetails += `Delay: ${config.animation.delay}s. `;
    if (config.animation.direction) animDetails += `Direction: ${config.animation.direction}. `;
    if (config.animation.easing) animDetails += `Easing: ${config.animation.easing}. `;
    if (config.animation.loop) animDetails += `Looping. `;
    if (config.animation.sequence && config.animation.sequence !== 'none') animDetails += `Sequence: ${config.animation.sequence}.`;
    prompt += ` ${animDetails.trim()}`;
  }

  if (config.additionalPromptDetails) {
    prompt += ` ${config.additionalPromptDetails}`;
  }

  // Clean up multiple spaces and ensure sentences end properly.
  prompt = prompt.replace(/\s\s+/g, ' ').replace(/\s\./g, '.').trim();
  if (!prompt.endsWith('.')) prompt += '.';

  return prompt;
}
