// prompt-builder-studio/client/src/types/promptConfig.ts

export type PageType =
  | 'Landing Page'
  | 'Home Page'
  | 'About Us Page'
  | 'Contact Page'
  | 'Product List Page'
  | 'Product Detail Page'
  | 'Blog Index Page'
  | 'Blog Post Page'
  | 'Dashboard Overview'
  | 'Settings Page'
  | 'User Profile Page'
  | null;

export interface PromptConfig {
  topic: string;
  pageType: PageType;
  layoutType: 'web' | 'mobile';
  template: 'hero' | 'features' | 'onboarding' | 'docs' | 'updates' | 'portfolio' | 'pricing' | 'contact' | 'testimonials' | 'login' | 'signup' | 'dashboard' | 'blog' | null;
  layoutConfiguration: 'card' | 'list' | '2-2-square' | 'table' | 'sidebar-left' | 'sidebar-right' | 'grid-2x2' | 'grid-3x3' | 'grid-4x4' | 'masonry' | null;
  framingStyle: 'fullscreen' | 'card-frame' | 'browser-mockup' | 'mac-app-mockup' | 'clay-device-frame' | 'windowed-container' | null;
  visualStyle: 'flat' | 'outline' | 'minimalist' | 'glassmorphism' | 'ios-style' | 'material-design' | 'neumorphism' | 'retro-funky' | 'brutalist' | 'soft-ui' | null;
  themeMode: 'light' | 'dark' | 'auto' | 'toggleable' | null;
  accentColor: 'primary' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'orange' | 'teal' | 'green' | 'yellow' | 'rose' | null;
  backgroundColor: {
    type: 'transparent' | 'neutral' | 'gray' | 'slate' | 'zinc' | 'stone' | 'black' | 'white' | 'gradient' | 'image' | null;
    value?: string; // For hex, specific gray shade, gradient details, or image URL
    gradientDetails?: {
      direction: string; // e.g., 'to bottom right'
      fromColor: string;
      toColor: string;
    };
    imageUrl?: string;
  };
  border: {
    color: 'transparent' | 'neutral' | 'gray' | 'slate' | 'zinc' | 'stone' | 'custom' | null;
    customColorValue?: string; // For custom hex
    radius: number; // 0-64px
    style: 'solid' | 'dashed' | 'dotted' | null;
  };
  shadowDepth: 'none' | 'small' | 'medium' | 'large' | 'extra-large' | 'xxl' | 'inset' | null;
  typography: {
    typefaceFamily: 'sans' | 'serif' | 'monospace' | 'condensed' | 'expanded' | 'rounded' | null;
    headingFont: 'inter' | 'geist' | 'manrope' | 'jakarta-sans' | 'space-grotesk' | 'open-sans' | 'lexend' | 'poppins' | 'sora' | null;
    bodyUiFont: 'inter' | 'geist' | 'manrope' | 'plex-sans' | 'instrument-serif' | 'playfair-display' | null;
    headingSize: '20-32px' | '32-40px' | '48-64px' | '64-80px' | null;
    subheadingSize: '16-20px' | '20-24px' | '24-28px' | '28-32px' | null;
    bodySize: '12-14px' | '14-16px' | '16-18px' | null;
  };
  animation: {
    effects: Array<'fade' | 'slide' | 'scale' | 'blur' | 'bounce'>;
    trigger: 'onload' | 'onhover' | 'onscroll' | null;
    duration: number; // in seconds, e.g., 0.5
    delay: number; // in seconds, e.g., 0.1
    direction: 'normal' | 'reverse' | 'alternate' | null;
    easing: 'ease-in' | 'ease-out' | 'linear' | 'ease-in-out' | null;
    loop: boolean;
    sequence: 'none' | 'chained'; // Simplified for now
  };
  // Extras from the initial request, some are covered by specific sections above.
  // This field can hold any truly "extra" textual hints if needed.
  additionalPromptDetails?: string;
}

export const initialPromptConfig: PromptConfig = {
  topic: '',
  pageType: null,
  layoutType: 'web',
  template: null,
  layoutConfiguration: null,
  framingStyle: null,
  visualStyle: 'flat',
  themeMode: 'light',
  accentColor: 'primary',
  backgroundColor: {
    type: 'white',
  },
  border: {
    color: 'transparent',
    radius: 8, // Default to a slight radius
    style: 'solid',
  },
  shadowDepth: 'none',
  typography: {
    typefaceFamily: 'sans',
    headingFont: 'inter',
    bodyUiFont: 'inter',
    headingSize: '32-40px',
    subheadingSize: '20-24px',
    bodySize: '14-16px',
  },
  animation: {
    effects: [],
    trigger: 'onload',
    duration: 0.5,
    delay: 0.1,
    direction: 'normal',
    easing: 'ease-in-out',
    loop: false,
    sequence: 'none',
  },
  additionalPromptDetails: '',
};
