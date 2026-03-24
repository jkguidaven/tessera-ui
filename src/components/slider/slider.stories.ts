// Hand-written stories for ts-slider

export default {
  title: 'Components/Slider',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current slider value.',
    },
    min: {
      control: 'number',
      description: 'Minimum value.',
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
    },
    step: {
      control: 'number',
      description: 'Step increment.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the slider.',
    },
    label: {
      control: 'text',
      description: 'Accessible label.',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to display the current value.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the slider.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.value !== undefined) attrs.push(`value="${args.value}"`);
  if (args.min !== undefined) attrs.push(`min="${args.min}"`);
  if (args.max !== undefined) attrs.push(`max="${args.max}"`);
  if (args.step !== undefined) attrs.push(`step="${args.step}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.label !== undefined) attrs.push(`label="${args.label}"`);
  if (args.showValue) attrs.push('show-value');
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  return `<div style="max-width: 400px;"><ts-slider ${attrs.join(' ')}></ts-slider></div>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    label: 'Volume',
    showValue: true,
    size: 'md',
  },
});

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <ts-slider value="50" label="Small" show-value size="sm"></ts-slider>
    <ts-slider value="50" label="Medium" show-value size="md"></ts-slider>
    <ts-slider value="50" label="Large" show-value size="lg"></ts-slider>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <ts-slider value="70" label="Volume" show-value></ts-slider>
    <ts-slider value="50" label="Disabled slider" show-value disabled></ts-slider>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 400px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 20px;">
      <h4 style="margin: 0;">Audio Settings</h4>
      <ts-slider value="75" label="Volume" show-value min="0" max="100"></ts-slider>
      <ts-slider value="50" label="Brightness" show-value min="0" max="100"></ts-slider>
      <ts-slider value="25" label="Bass" show-value min="0" max="100" step="5"></ts-slider>
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Price range ($0 - $500)</p>
        <ts-slider value="250" label="Price range" show-value min="0" max="500" step="10"></ts-slider>
      </div>
    </div>
  </div>
`;
