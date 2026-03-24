// Hand-written stories for ts-input

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The input\'s value.' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The input\'s size.',
    },
    label: { control: 'text', description: 'Label text displayed above the input.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    helpText: { control: 'text', description: 'Help text displayed below the input.' },
    error: { control: 'text', description: 'Renders the input in an error state with an error message.' },
    required: { control: 'boolean', description: 'Makes the input required.' },
    disabled: { control: 'boolean', description: 'Renders the input as disabled.' },
    readonly: { control: 'boolean', description: 'Renders the input as readonly.' },
    maxlength: { control: 'number', description: 'Maximum character length.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.type !== undefined && args.type !== null) attrs.push(`type="${args.type}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null && args.label !== '') attrs.push(`label="${args.label}"`);
  if (args.placeholder !== undefined && args.placeholder !== null && args.placeholder !== '') attrs.push(`placeholder="${args.placeholder}"`);
  if (args.helpText !== undefined && args.helpText !== null && args.helpText !== '') attrs.push(`help-text="${args.helpText}"`);
  if (args.error !== undefined && args.error !== null && args.error !== '') attrs.push(`error="${args.error}"`);
  if (args.required) attrs.push('required');
  if (args.disabled) attrs.push('disabled');
  if (args.readonly) attrs.push('readonly');
  if (args.maxlength !== undefined && args.maxlength !== null) attrs.push(`maxlength="${args.maxlength}"`);
  if (args.name !== undefined && args.name !== null && args.name !== '') attrs.push(`name="${args.name}"`);
  return `<div style="max-width: 400px;"><ts-input ${attrs.join(' ')}></ts-input></div>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: '',
    type: 'text',
    size: 'md',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helpText: 'As it appears on your government ID.',
    disabled: false,
    readonly: false,
    required: false,
  },
});

export const Sizes = () => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-input size="xs" label="Extra Small" placeholder="xs input"></ts-input>
    <ts-input size="sm" label="Small" placeholder="sm input"></ts-input>
    <ts-input size="md" label="Medium" placeholder="md input"></ts-input>
    <ts-input size="lg" label="Large" placeholder="lg input"></ts-input>
    <ts-input size="xl" label="Extra Large" placeholder="xl input"></ts-input>
  </ts-stack>
`;

export const Types = () => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-input type="text" label="Username" placeholder="johndoe"></ts-input>
    <ts-input type="email" label="Email Address" placeholder="john@example.com"></ts-input>
    <ts-input type="password" label="Password" placeholder="Enter password"></ts-input>
    <ts-input type="number" label="Quantity" placeholder="0"></ts-input>
    <ts-input type="tel" label="Phone Number" placeholder="+1 (555) 000-0000"></ts-input>
    <ts-input type="url" label="Website" placeholder="https://example.com"></ts-input>
    <ts-input type="search" label="Search" placeholder="Search products..."></ts-input>
  </ts-stack>
`;

export const States = () => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-input label="Default" placeholder="Editable input"></ts-input>
    <ts-input label="With Value" value="jane@example.com" placeholder="Email"></ts-input>
    <ts-input label="Disabled" placeholder="Cannot edit" disabled></ts-input>
    <ts-input label="Read Only" value="Read-only content" readonly></ts-input>
    <ts-input label="Required" placeholder="This field is required" required></ts-input>
    <ts-input label="With Help Text" placeholder="Choose a username" help-text="Must be 3-20 characters, letters and numbers only."></ts-input>
    <ts-input label="Error State" value="invalid-email" error="Please enter a valid email address."></ts-input>
  </ts-stack>
`;

export const WithIcons = () => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-input label="Search" placeholder="Search files...">
      <ts-icon slot="prefix" name="search" size="sm"></ts-icon>
    </ts-input>
    <ts-input label="Email" placeholder="you@company.com">
      <ts-icon slot="prefix" name="mail" size="sm"></ts-icon>
    </ts-input>
    <ts-input label="Website" placeholder="https://example.com">
      <ts-icon slot="prefix" name="globe" size="sm"></ts-icon>
    </ts-input>
    <ts-input label="Amount" placeholder="0.00">
      <span slot="prefix" style="font-weight: 600; color: var(--ts-color-text-secondary); padding-left: 4px;">$</span>
      <span slot="suffix" style="color: var(--ts-color-text-secondary); padding-right: 4px;">USD</span>
    </ts-input>
    <ts-input label="Password" type="password" placeholder="Enter password">
      <ts-icon slot="prefix" name="lock" size="sm"></ts-icon>
      <ts-icon slot="suffix" name="eye" size="sm"></ts-icon>
    </ts-input>
  </ts-stack>
`;

export const Composition = () => `
  <ts-stack gap="4" style="max-width: 400px;">
    <ts-card bordered padding="lg">
      <span slot="header"><h3 style="margin: 0;">Sign In</h3></span>
      <ts-stack gap="3">
        <ts-input label="Email" type="email" placeholder="john@example.com" required>
          <ts-icon slot="prefix" name="mail" size="sm"></ts-icon>
        </ts-input>
        <ts-input label="Password" type="password" placeholder="Enter your password" required>
          <ts-icon slot="prefix" name="lock" size="sm"></ts-icon>
        </ts-input>
      </ts-stack>
      <span slot="footer">
        <ts-stack gap="2" style="padding-top: 8px;">
          <ts-button block variant="primary">Sign In</ts-button>
          <ts-button appearance="link" variant="primary">Forgot your password?</ts-button>
        </ts-stack>
      </span>
    </ts-card>

    <ts-row gap="2" align="end">
      <div style="flex: 1;">
        <ts-input placeholder="Enter invite code" label="Invite Code">
          <ts-icon slot="prefix" name="ticket" size="sm"></ts-icon>
        </ts-input>
      </div>
      <ts-button variant="primary">Redeem</ts-button>
    </ts-row>
  </ts-stack>
`;
