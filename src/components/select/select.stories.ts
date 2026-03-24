// Hand-written stories for ts-select

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The current value.' },
    placeholder: { control: 'text', description: 'Placeholder text when no value is selected.' },
    disabled: { control: 'boolean', description: 'Renders the select as disabled.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The select size.',
    },
    label: { control: 'text', description: 'Label text displayed above the select.' },
    helpText: { control: 'text', description: 'Help text displayed below the select.' },
    error: { control: 'boolean', description: 'Renders the select in an error state.' },
    errorMessage: { control: 'text', description: 'Error message displayed below the select.' },
    required: { control: 'boolean', description: 'Makes the select required.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
    multiple: { control: 'boolean', description: 'Allow multiple selections.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.placeholder !== undefined && args.placeholder !== null) attrs.push(`placeholder="${args.placeholder}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  if (args.helpText !== undefined && args.helpText !== null) attrs.push(`help-text="${args.helpText}"`);
  if (args.error) attrs.push('error');
  if (args.errorMessage !== undefined && args.errorMessage !== null) attrs.push(`error-message="${args.errorMessage}"`);
  if (args.required) attrs.push('required');
  if (args.name !== undefined && args.name !== null) attrs.push(`name="${args.name}"`);
  if (args.multiple) attrs.push('multiple');
  return `
    <ts-select ${attrs.join(' ')}>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
    </ts-select>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: '',
    placeholder: 'Select a country',
    disabled: false,
    size: 'md',
    label: 'Country',
    helpText: 'Select your country of residence.',
    error: false,
    errorMessage: '',
    required: false,
    name: 'country',
    multiple: false,
  },
});

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <ts-select size="sm" label="Small" placeholder="Choose...">
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </ts-select>
    <ts-select size="md" label="Medium" placeholder="Choose...">
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </ts-select>
    <ts-select size="lg" label="Large" placeholder="Choose...">
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </ts-select>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <ts-select label="Default" placeholder="Select an option">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </ts-select>
    <ts-select label="With value" value="editor" placeholder="Select a role">
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </ts-select>
    <ts-select label="Disabled" disabled placeholder="Cannot select">
      <option value="a">Option A</option>
    </ts-select>
    <ts-select label="Required" required placeholder="Must select" help-text="This field is required.">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </ts-select>
    <ts-select label="Error" error error-message="Please select a valid category." placeholder="Select a category">
      <option value="tech">Technology</option>
      <option value="science">Science</option>
    </ts-select>
  </div>
`;

export const RoleSelector = (): string => `
  <div style="max-width: 320px;">
    <ts-select label="User Role" placeholder="Assign a role" help-text="Determines access permissions." required name="role">
      <option value="owner">Owner</option>
      <option value="admin">Administrator</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
      <option value="guest" disabled>Guest (deprecated)</option>
    </ts-select>
  </div>
`;

export const CategoryFilter = (): string => `
  <div style="max-width: 320px;">
    <ts-select label="Category" placeholder="Filter by category" name="category">
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
      <option value="home">Home &amp; Garden</option>
      <option value="sports">Sports &amp; Outdoors</option>
      <option value="toys">Toys &amp; Games</option>
    </ts-select>
  </div>
`;
