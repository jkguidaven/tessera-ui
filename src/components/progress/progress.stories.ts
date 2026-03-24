// Hand-written stories for ts-progress

export default {
  title: 'Components/Progress',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0 to max).',
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      description: 'The color variant.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the progress bar.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the progress is indeterminate.',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the progress bar.',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to display the percentage value.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.value !== undefined) attrs.push(`value="${args.value}"`);
  if (args.max !== undefined) attrs.push(`max="${args.max}"`);
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.indeterminate) attrs.push('indeterminate');
  if (args.label !== undefined) attrs.push(`label="${args.label}"`);
  if (args.showValue) attrs.push('show-value');
  return `<ts-progress ${attrs.join(' ')}></ts-progress>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: 65,
    max: 100,
    variant: 'primary',
    size: 'md',
    indeterminate: false,
    label: 'Upload progress',
    showValue: true,
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Primary</p>
      <ts-progress value="65" variant="primary" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Success</p>
      <ts-progress value="100" variant="success" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Warning</p>
      <ts-progress value="75" variant="warning" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Danger</p>
      <ts-progress value="30" variant="danger" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Info</p>
      <ts-progress value="50" variant="info" show-value></ts-progress>
    </div>
  </div>
`;

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Small</p>
      <ts-progress value="60" size="sm"></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Medium (default)</p>
      <ts-progress value="60" size="md"></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Large</p>
      <ts-progress value="60" size="lg"></ts-progress>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Upload progress 65%</p>
      <ts-progress value="65" label="Upload progress" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Profile completion 40%</p>
      <ts-progress value="40" variant="warning" label="Profile completion" show-value></ts-progress>
    </div>
    <div>
      <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 14px; color: #666;">Indeterminate</p>
      <ts-progress indeterminate label="Loading..."></ts-progress>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 400px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <h4 style="margin: 0 0 4px;">Uploading files...</h4>
      <p style="margin: 0 0 12px; font-size: 14px; color: #666;">3 of 5 files uploaded</p>
      <ts-progress value="60" variant="primary" show-value label="File upload progress"></ts-progress>
    </div>
  </div>
`;
