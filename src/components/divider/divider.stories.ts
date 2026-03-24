// Hand-written stories for ts-divider

export default {
  title: 'Components/Divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The divider orientation.',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The line style variant.',
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed in the center of the divider.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.orientation !== undefined) attrs.push(`orientation="${args.orientation}"`);
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.label !== undefined && args.label !== '') attrs.push(`label="${args.label}"`);
  return `<ts-divider ${attrs.join(' ')}></ts-divider>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: '',
  },
});

export const Variants = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Solid</p>
      <ts-divider variant="solid"></ts-divider>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Dashed</p>
      <ts-divider variant="dashed"></ts-divider>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Dotted</p>
      <ts-divider variant="dotted"></ts-divider>
    </div>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Without label</p>
      <ts-divider></ts-divider>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">With label</p>
      <ts-divider label="OR"></ts-divider>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Vertical (in flex container)</p>
      <div style="display: flex; gap: 16px; align-items: center; height: 40px;">
        <span style="font-family: sans-serif;">Section A</span>
        <ts-divider orientation="vertical"></ts-divider>
        <span style="font-family: sans-serif;">Section B</span>
        <ts-divider orientation="vertical"></ts-divider>
        <span style="font-family: sans-serif;">Section C</span>
      </div>
    </div>
  </div>
`;

export const Composition = (): string => `
  <div style="max-width: 400px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <h4 style="margin: 0 0 12px;">Sign in</h4>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
        <ts-button variant="neutral" appearance="outline" block>Continue with Google</ts-button>
        <ts-button variant="neutral" appearance="outline" block>Continue with GitHub</ts-button>
      </div>
      <ts-divider label="or continue with email"></ts-divider>
      <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
        <ts-input label="Email" placeholder="you@example.com"></ts-input>
        <ts-input label="Password" type="password"></ts-input>
        <ts-button variant="primary" block>Sign in</ts-button>
      </div>
    </div>
  </div>
`;
