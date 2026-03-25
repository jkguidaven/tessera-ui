// Hand-written stories for ts-radio

export default {
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Whether the radio is checked.' },
    disabled: { control: 'boolean', description: 'Renders the radio as disabled.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The radio size.',
    },
    label: { control: 'text', description: 'Label text. If omitted, use the default slot.' },
    value: { control: 'text', description: 'The value associated with this radio.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.checked) attrs.push('checked');
  if (args.disabled) attrs.push('disabled');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  if (args.value !== undefined && args.value !== null) attrs.push(`value="${args.value}"`);
  if (args.name !== undefined && args.name !== null) attrs.push(`name="${args.name}"`);
  return `<ts-radio ${attrs.join(' ')}></ts-radio>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Standard shipping',
    value: 'standard',
    name: 'shipping',
  },
});

export const Sizes = (): string => `
  <ts-stack gap="2">
    <ts-radio size="sm" label="Small radio" name="size-demo" value="sm"></ts-radio>
    <ts-radio size="md" label="Medium radio" name="size-demo" value="md"></ts-radio>
    <ts-radio size="lg" label="Large radio" name="size-demo" value="lg"></ts-radio>
  </ts-stack>
`;

export const States = (): string => `
  <ts-stack gap="2">
    <ts-radio label="Unchecked" name="states-demo" value="unchecked"></ts-radio>
    <ts-radio checked label="Checked" name="states-checked" value="checked"></ts-radio>
    <ts-radio disabled label="Disabled" name="states-disabled" value="disabled"></ts-radio>
    <ts-radio disabled checked label="Disabled checked" name="states-disabled-checked" value="disabled-checked"></ts-radio>
  </ts-stack>
`;

export const ShippingOptions = (): string => `
  <ts-stack gap="2" style="max-width: 400px;">
    <h3 style="margin: 0; font-family: sans-serif;">Select Shipping Method</h3>
    <ts-radio name="shipping" value="standard" checked label="Standard shipping (5-7 business days)"></ts-radio>
    <ts-radio name="shipping" value="express" label="Express shipping (2-3 business days)"></ts-radio>
    <ts-radio name="shipping" value="overnight" label="Overnight shipping (next business day)"></ts-radio>
    <ts-radio name="shipping" value="pickup" disabled label="In-store pickup (unavailable in your area)"></ts-radio>
  </ts-stack>
`;

export const PaymentMethod = (): string => `
  <ts-stack gap="2" style="max-width: 400px;">
    <h3 style="margin: 0; font-family: sans-serif;">Payment Method</h3>
    <ts-radio name="payment" value="credit" checked label="Credit card"></ts-radio>
    <ts-radio name="payment" value="debit" label="Debit card"></ts-radio>
    <ts-radio name="payment" value="paypal" label="PayPal"></ts-radio>
    <ts-radio name="payment" value="bank" label="Bank transfer"></ts-radio>
  </ts-stack>
`;

export const RadioGroupDefault = (): string => `
  <ts-radio-group label="Shipping Method" name="shipping-group" value="standard" style="max-width: 400px;">
    <ts-radio value="standard">Standard shipping (5-7 business days)</ts-radio>
    <ts-radio value="express">Express shipping (2-3 business days)</ts-radio>
    <ts-radio value="overnight">Overnight shipping (next business day)</ts-radio>
  </ts-radio-group>
`;

export const RadioGroupHorizontal = (): string => `
  <ts-radio-group label="Size" name="size-group" value="md" orientation="horizontal" style="max-width: 400px;">
    <ts-radio value="sm">Small</ts-radio>
    <ts-radio value="md">Medium</ts-radio>
    <ts-radio value="lg">Large</ts-radio>
  </ts-radio-group>
`;

export const RadioGroupDisabled = (): string => `
  <ts-radio-group label="Plan" name="plan-group" value="free" disabled style="max-width: 400px;">
    <ts-radio value="free">Free plan</ts-radio>
    <ts-radio value="pro">Pro plan</ts-radio>
    <ts-radio value="enterprise">Enterprise plan</ts-radio>
  </ts-radio-group>
`;

export const RadioGroupError = (): string => `
  <ts-radio-group label="Priority" name="priority-group" error="Please select a priority level" style="max-width: 400px;">
    <ts-radio value="low">Low</ts-radio>
    <ts-radio value="medium">Medium</ts-radio>
    <ts-radio value="high">High</ts-radio>
  </ts-radio-group>
`;
