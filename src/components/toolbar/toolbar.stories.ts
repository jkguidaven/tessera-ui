// Hand-written stories for ts-toolbar

export default {
  title: 'Components/Toolbar',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
      description: 'The toolbar variant style.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The toolbar size.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  return `
    <ts-toolbar ${attrs.join(' ')}>
      <div slot="start">
        <ts-button size="sm" appearance="ghost">Bold</ts-button>
        <ts-button size="sm" appearance="ghost">Italic</ts-button>
        <ts-button size="sm" appearance="ghost">Underline</ts-button>
      </div>
      <div slot="end">
        <ts-button size="sm" appearance="outline">Preview</ts-button>
      </div>
    </ts-toolbar>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'bordered',
    size: 'md',
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Default</p>
      <ts-toolbar variant="default">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">Bold</ts-button>
          <ts-button size="sm" appearance="ghost">Italic</ts-button>
        </div>
      </ts-toolbar>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Bordered</p>
      <ts-toolbar variant="bordered">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">Bold</ts-button>
          <ts-button size="sm" appearance="ghost">Italic</ts-button>
        </div>
      </ts-toolbar>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Elevated</p>
      <ts-toolbar variant="elevated">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">Bold</ts-button>
          <ts-button size="sm" appearance="ghost">Italic</ts-button>
        </div>
      </ts-toolbar>
    </div>
  </div>
`;

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Small</p>
      <ts-toolbar variant="bordered" size="sm">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">B</ts-button>
          <ts-button size="sm" appearance="ghost">I</ts-button>
          <ts-button size="sm" appearance="ghost">U</ts-button>
        </div>
      </ts-toolbar>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Medium</p>
      <ts-toolbar variant="bordered" size="md">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">B</ts-button>
          <ts-button size="sm" appearance="ghost">I</ts-button>
          <ts-button size="sm" appearance="ghost">U</ts-button>
        </div>
      </ts-toolbar>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Large</p>
      <ts-toolbar variant="bordered" size="lg">
        <div slot="start">
          <ts-button size="sm" appearance="ghost">B</ts-button>
          <ts-button size="sm" appearance="ghost">I</ts-button>
          <ts-button size="sm" appearance="ghost">U</ts-button>
        </div>
      </ts-toolbar>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 600px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <ts-toolbar variant="bordered">
        <div slot="start" style="display: flex; gap: 4px;">
          <ts-button size="sm" appearance="ghost">Bold</ts-button>
          <ts-button size="sm" appearance="ghost">Italic</ts-button>
          <ts-button size="sm" appearance="ghost">Underline</ts-button>
          <ts-divider orientation="vertical" style="height: 24px; margin: 0 4px;"></ts-divider>
          <ts-button size="sm" appearance="ghost">Link</ts-button>
          <ts-button size="sm" appearance="ghost">Image</ts-button>
        </div>
        <div slot="end" style="display: flex; gap: 4px;">
          <ts-button size="sm" appearance="ghost">Undo</ts-button>
          <ts-button size="sm" appearance="ghost">Redo</ts-button>
        </div>
      </ts-toolbar>
      <div style="padding: 16px; min-height: 200px;">
        <p style="color: #94a3b8; margin: 0;">Start typing here...</p>
      </div>
    </div>
  </div>
`;
