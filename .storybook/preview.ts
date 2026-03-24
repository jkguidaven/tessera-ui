import { defineCustomElements } from '../loader';

// Load global design tokens and theme styles
import '../dist/tessera-ui/tessera-ui.css';

// Register Tessera UI web components
defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Tessera UI theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'high-contrast', title: 'High Contrast', icon: 'accessibility' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      name: 'Density',
      description: 'Tessera UI density',
      defaultValue: 'comfortable',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'comfortable', title: 'Comfortable' },
          { value: 'spacious', title: 'Spacious' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (storyFn: any, context: any) => {
      const theme = context.globals.theme || 'light';
      const density = context.globals.density || 'comfortable';

      // Apply theme and density to the document root so tokens cascade
      document.documentElement.setAttribute('data-theme', theme === 'light' ? '' : theme);
      if (density === 'comfortable') {
        document.documentElement.removeAttribute('data-density');
      } else {
        document.documentElement.setAttribute('data-density', density);
      }

      // Set Storybook background to match theme
      const bgColors: Record<string, string> = {
        'light': '#fafbff',
        'dark': '#111318',
        'high-contrast': '#ffffff',
      };
      document.body.style.backgroundColor = bgColors[theme] || '#fafbff';

      return storyFn();
    },
  ],
};

export default preview;
