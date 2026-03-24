// Hand-written stories for ts-checkbox

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Whether the checkbox is checked.' },
    indeterminate: { control: 'boolean', description: 'Whether the checkbox is in an indeterminate state.' },
    disabled: { control: 'boolean', description: 'Renders the checkbox as disabled.' },
    error: { control: 'boolean', description: 'Renders the checkbox in an error state.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The checkbox size.',
    },
    label: { control: 'text', description: 'Label text. If omitted, use the default slot.' },
    value: { control: 'text', description: 'The value associated with this checkbox.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.checked) attrs.push('checked');
  if (args.indeterminate) attrs.push('indeterminate');
  if (args.disabled) attrs.push('disabled');
  if (args.error) attrs.push('error');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  if (args.value !== undefined && args.value !== null) attrs.push(`value="${args.value}"`);
  if (args.name !== undefined && args.name !== null) attrs.push(`name="${args.name}"`);
  return `<ts-checkbox ${attrs.join(' ')}></ts-checkbox>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    size: 'md',
    label: 'I agree to the terms and conditions',
    value: 'agree',
    name: 'agreement',
  },
});

export const Sizes = () => `
  <ts-stack gap="2">
    <ts-checkbox size="sm" label="Small checkbox"></ts-checkbox>
    <ts-checkbox size="md" label="Medium checkbox"></ts-checkbox>
    <ts-checkbox size="lg" label="Large checkbox"></ts-checkbox>
  </ts-stack>
`;

export const States = () => `
  <ts-stack gap="2">
    <ts-checkbox label="Unchecked"></ts-checkbox>
    <ts-checkbox checked label="Checked"></ts-checkbox>
    <ts-checkbox indeterminate label="Indeterminate"></ts-checkbox>
    <ts-checkbox disabled label="Disabled unchecked"></ts-checkbox>
    <ts-checkbox disabled checked label="Disabled checked"></ts-checkbox>
    <ts-checkbox error label="Error state"></ts-checkbox>
    <ts-checkbox error checked label="Error checked"></ts-checkbox>
  </ts-stack>
`;

export const FormExample = () => `
  <ts-stack gap="3" style="max-width: 400px;">
    <h3 style="margin: 0; font-family: sans-serif;">Newsletter Preferences</h3>
    <ts-checkbox name="terms" value="terms" label="I agree to the terms and conditions"></ts-checkbox>
    <ts-checkbox name="newsletter" value="newsletter" checked label="Subscribe to weekly newsletter"></ts-checkbox>
    <ts-checkbox name="remember" value="remember" label="Remember me on this device"></ts-checkbox>
    <ts-checkbox name="marketing" value="marketing" label="Receive marketing communications"></ts-checkbox>
    <ts-checkbox name="beta" value="beta" disabled label="Join beta program (currently unavailable)"></ts-checkbox>
  </ts-stack>
`;

export const WithSlotContent = () => `
  <ts-stack gap="2">
    <ts-checkbox value="custom">
      Accept the <a href="#" style="color: #2563eb;">privacy policy</a>
    </ts-checkbox>
    <ts-checkbox value="styled">
      <strong>Important:</strong> Enable two-factor authentication
    </ts-checkbox>
  </ts-stack>
`;
