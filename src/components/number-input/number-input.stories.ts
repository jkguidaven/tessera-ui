// Hand-written stories for ts-number-input

export default {
  title: 'Components/Number Input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: 'The current numeric value.' },
    min: { control: 'number', description: 'Minimum allowed value.' },
    max: { control: 'number', description: 'Maximum allowed value.' },
    step: { control: 'number', description: 'Step increment/decrement amount.' },
    precision: { control: 'number', description: 'Number of decimal places to display.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The input size.',
    },
    label: { control: 'text', description: 'Label text displayed above the input.' },
    helpText: { control: 'text', description: 'Help text displayed below the input.' },
    error: { control: 'text', description: 'Error message — renders the input in an error state.' },
    disabled: { control: 'boolean', description: 'Renders the input as disabled.' },
    readonly: { control: 'boolean', description: 'Renders the input as readonly.' },
    required: { control: 'boolean', description: 'Makes the input required.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null) attrs.push(`value="${args.value}"`);
  if (args.min !== undefined && args.min !== null) attrs.push(`min="${args.min}"`);
  if (args.max !== undefined && args.max !== null) attrs.push(`max="${args.max}"`);
  if (args.step !== undefined && args.step !== null) attrs.push(`step="${args.step}"`);
  if (args.precision !== undefined && args.precision !== null) attrs.push(`precision="${args.precision}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null && args.label !== '') attrs.push(`label="${args.label}"`);
  if (args.helpText !== undefined && args.helpText !== null && args.helpText !== '') attrs.push(`help-text="${args.helpText}"`);
  if (args.error !== undefined && args.error !== null && args.error !== '') attrs.push(`error="${args.error}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.readonly) attrs.push('readonly');
  if (args.required) attrs.push('required');
  return `<ts-number-input ${attrs.join(' ')}></ts-number-input>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: 0,
    step: 1,
    size: 'md',
    label: 'Quantity',
    helpText: 'Select the number of items',
    disabled: false,
    readonly: false,
    required: false,
  },
});

export const Sizes = (): string => `
  <ts-stack gap="4">
    <ts-number-input size="sm" label="Small" value="1"></ts-number-input>
    <ts-number-input size="md" label="Medium" value="5"></ts-number-input>
    <ts-number-input size="lg" label="Large" value="10"></ts-number-input>
    <ts-number-input size="xl" label="Extra Large" value="25"></ts-number-input>
  </ts-stack>
`;

export const States = (): string => `
  <ts-stack gap="4">
    <ts-number-input label="Disabled" value="3" disabled></ts-number-input>
    <ts-number-input label="Error" value="0" error="Quantity must be at least 1" min="1"></ts-number-input>
    <ts-number-input label="Readonly" value="42" readonly></ts-number-input>
    <ts-number-input label="Required" value="0" required></ts-number-input>
  </ts-stack>
`;

export const WithMinMax = (): string => `
  <ts-stack gap="4">
    <ts-number-input label="Tickets (1–10)" value="1" min="1" max="10" help-text="Maximum 10 tickets per order"></ts-number-input>
    <ts-number-input label="Rating (0–5)" value="3" min="0" max="5" help-text="Rate from 0 to 5"></ts-number-input>
  </ts-stack>
`;

export const WithPrecision = (): string => `
  <ts-stack gap="4">
    <ts-number-input label="Price" value="19.99" step="0.01" precision="2" help-text="Enter the price in dollars"></ts-number-input>
    <ts-number-input label="Weight (kg)" value="2.5" step="0.1" precision="1" help-text="Enter weight in kilograms"></ts-number-input>
  </ts-stack>
`;

export const Composition = (): string => `
  <ts-card bordered style="max-width: 320px;">
    <span slot="header"><h3 style="margin: 0;">Wireless Headphones</h3></span>
    <ts-stack gap="3">
      <p style="margin: 0; color: var(--ts-color-text-secondary);">Premium noise-canceling headphones with 30-hour battery life.</p>
      <div style="font-size: var(--ts-font-size-xl); font-weight: var(--ts-font-weight-bold); color: var(--ts-color-text-primary);">$149.99</div>
      <ts-number-input label="Quantity" value="1" min="1" max="99" help-text="In stock: 24 available"></ts-number-input>
    </ts-stack>
    <span slot="footer">
      <ts-button variant="primary" block>
        <ts-icon slot="prefix" name="shopping-cart" size="sm"></ts-icon>
        Add to Cart
      </ts-button>
    </span>
  </ts-card>
`;
