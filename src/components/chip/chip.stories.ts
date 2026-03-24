// Hand-written stories for ts-chip

export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The chip\'s semantic variant.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The chip\'s size.',
    },
    removable: {
      control: 'boolean',
      description: 'Whether the chip shows a remove button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled.',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected.',
    },
    outline: {
      control: 'boolean',
      description: 'Whether to render as outline style.',
    },
    slotContent: {
      control: 'text',
      description: 'Default slot content',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.removable) attrs.push('removable');
  if (args.disabled) attrs.push('disabled');
  if (args.selected) attrs.push('selected');
  if (args.outline) attrs.push('outline');
  return `<ts-chip ${attrs.join(' ')}>${args.slotContent || ''}</ts-chip>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'primary',
    size: 'md',
    removable: false,
    disabled: false,
    selected: false,
    outline: false,
    slotContent: 'React',
  },
});

export const Variants = (): string => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-chip variant="primary">Primary</ts-chip>
    <ts-chip variant="secondary">Secondary</ts-chip>
    <ts-chip variant="success">Success</ts-chip>
    <ts-chip variant="warning">Warning</ts-chip>
    <ts-chip variant="danger">Danger</ts-chip>
    <ts-chip variant="info">Info</ts-chip>
    <ts-chip variant="neutral">Neutral</ts-chip>
  </div>
`;

export const Sizes = (): string => `
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <ts-chip size="sm">Small</ts-chip>
    <ts-chip size="md">Medium</ts-chip>
    <ts-chip size="lg">Large</ts-chip>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666; min-width: 80px;">Default</p>
      <ts-chip>React</ts-chip>
      <ts-chip>Vue</ts-chip>
      <ts-chip>Angular</ts-chip>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666; min-width: 80px;">Selected</p>
      <ts-chip selected>React</ts-chip>
      <ts-chip selected>Vue</ts-chip>
      <ts-chip>Angular</ts-chip>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666; min-width: 80px;">Disabled</p>
      <ts-chip disabled>React</ts-chip>
      <ts-chip disabled>Vue</ts-chip>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666; min-width: 80px;">Outline</p>
      <ts-chip outline>React</ts-chip>
      <ts-chip outline variant="success">Vue</ts-chip>
      <ts-chip outline variant="danger">Angular</ts-chip>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666; min-width: 80px;">Removable</p>
      <ts-chip removable>React</ts-chip>
      <ts-chip removable>Vue</ts-chip>
      <ts-chip removable>Angular</ts-chip>
    </div>
  </div>
`;

export const Composition = (): string => `
  <div style="font-family: sans-serif;">
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-weight: 600;">Tech Stack</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ts-chip variant="primary" removable>React</ts-chip>
        <ts-chip variant="success" removable>Node.js</ts-chip>
        <ts-chip variant="info" removable>TypeScript</ts-chip>
        <ts-chip variant="warning" removable>PostgreSQL</ts-chip>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600;">Filter by category</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ts-chip selected outline>All</ts-chip>
        <ts-chip outline>Frontend</ts-chip>
        <ts-chip outline>Backend</ts-chip>
        <ts-chip outline>DevOps</ts-chip>
        <ts-chip outline>Design</ts-chip>
      </div>
    </div>
  </div>
`;
