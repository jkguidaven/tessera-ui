import { defineCustomElements } from '../loader';

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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f8f9fa' },
        { name: 'dark', value: '#1a1b1e' },
      ],
    },
  },
};

export default preview;
