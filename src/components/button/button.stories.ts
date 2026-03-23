/**
 * ts-button — Storybook Stories
 *
 * @tag ts-button
 */
export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The button color variant',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'The button visual weight',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The button size',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    label: { control: 'text', description: 'Button label text' },
  },
};

const Template = (args: Record<string, unknown>) => {
  return `<ts-button
    variant="${args.variant || 'primary'}"
    appearance="${args.appearance || 'solid'}"
    size="${args.size || 'md'}"
    ${args.disabled ? 'disabled' : ''}
    ${args.loading ? 'loading' : ''}
    ${args.block ? 'block' : ''}
  >${args.label || 'Button'}</ts-button>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: { label: 'Click me' } as Record<string, unknown>,
});

export const Variants = () => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-button variant="primary">Primary</ts-button>
    <ts-button variant="secondary">Secondary</ts-button>
    <ts-button variant="success">Success</ts-button>
    <ts-button variant="warning">Warning</ts-button>
    <ts-button variant="danger">Danger</ts-button>
    <ts-button variant="info">Info</ts-button>
    <ts-button variant="neutral">Neutral</ts-button>
  </div>
`;

export const Appearances = () => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-button appearance="solid">Solid</ts-button>
    <ts-button appearance="outline">Outline</ts-button>
    <ts-button appearance="ghost">Ghost</ts-button>
    <ts-button appearance="link">Link</ts-button>
  </div>
`;

export const Sizes = () => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-button size="xs">Extra Small</ts-button>
    <ts-button size="sm">Small</ts-button>
    <ts-button size="md">Medium</ts-button>
    <ts-button size="lg">Large</ts-button>
    <ts-button size="xl">Extra Large</ts-button>
  </div>
`;

export const States = () => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-button>Default</ts-button>
    <ts-button disabled>Disabled</ts-button>
    <ts-button loading>Loading</ts-button>
  </div>
`;

export const FullWidth = () => `
  <div style="width: 400px;">
    <ts-button block>Full Width Button</ts-button>
  </div>
`;

export const AsLink = () => `
  <ts-button href="https://example.com" target="_blank">Visit Example</ts-button>
`;
