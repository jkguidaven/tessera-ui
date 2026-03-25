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
    range: {
      control: 'boolean',
      description: 'Enable range mode (dual thumbs).',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
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

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <ts-slider value="50" label="Small" show-value size="sm"></ts-slider>
    <ts-slider value="50" label="Medium" show-value size="md"></ts-slider>
    <ts-slider value="50" label="Large" show-value size="lg"></ts-slider>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <ts-slider value="70" label="Volume" show-value></ts-slider>
    <ts-slider value="50" label="Disabled slider" show-value disabled></ts-slider>
  </div>
`;

export const Range = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <ts-slider range value-low="200" value-high="800" min="0" max="1000" step="50" label="Price Range ($)" show-value></ts-slider>
    <ts-slider range value-low="18" value-high="35" min="0" max="100" label="Age Range" show-value></ts-slider>
  </div>
`;

export const WithMarks = (): string => `
  <div style="display: flex; flex-direction: column; gap: 48px; max-width: 400px;">
    <ts-slider value="50" label="Percentage" show-value marks='[{"value":0,"label":"0%"},{"value":25,"label":"25%"},{"value":50,"label":"50%"},{"value":75,"label":"75%"},{"value":100,"label":"100%"}]'></ts-slider>
    <ts-slider value="3" min="1" max="5" step="1" label="Rating" show-value marks='[{"value":1,"label":"Poor"},{"value":2,"label":"Fair"},{"value":3,"label":"Good"},{"value":4,"label":"Great"},{"value":5,"label":"Excellent"}]'></ts-slider>
  </div>
`;

export const Vertical = (): string => `
  <div style="display: flex; gap: 48px; align-items: flex-end; height: 250px;">
    <ts-slider orientation="vertical" value="75" label="Volume" show-value></ts-slider>
    <ts-slider orientation="vertical" value="50" label="Bass" show-value></ts-slider>
    <ts-slider orientation="vertical" value="25" label="Treble" show-value></ts-slider>
  </div>
`;

export const RangeWithMarks = (): string => `
  <div style="max-width: 400px; padding-bottom: 24px;">
    <ts-slider range value-low="20" value-high="80" min="0" max="100" label="Budget Range" show-value marks='[{"value":0,"label":"$0"},{"value":25,"label":"$25k"},{"value":50,"label":"$50k"},{"value":75,"label":"$75k"},{"value":100,"label":"$100k"}]'></ts-slider>
  </div>
`;

export const Composition = (): string => `
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
