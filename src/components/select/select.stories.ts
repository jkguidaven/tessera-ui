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

export const Multiple = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 320px;">
    <ts-select multiple label="Departments" placeholder="Select departments" help-text="Choose one or more departments.">
      <option value="engineering">Engineering</option>
      <option value="design">Design</option>
      <option value="marketing">Marketing</option>
      <option value="sales">Sales</option>
      <option value="support">Support</option>
    </ts-select>
    <ts-select multiple label="Tags" placeholder="Add tags" value="frontend,react">
      <option value="frontend">Frontend</option>
      <option value="backend">Backend</option>
      <option value="react">React</option>
      <option value="typescript">TypeScript</option>
      <option value="css">CSS</option>
    </ts-select>
  </div>
`;

export const Searchable = (): string => `
  <div style="max-width: 320px;">
    <ts-select searchable label="Country" placeholder="Search for a country" help-text="Type to filter the list.">
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
      <option value="jp">Japan</option>
      <option value="br">Brazil</option>
      <option value="in">India</option>
      <option value="mx">Mexico</option>
    </ts-select>
  </div>
`;

export const Clearable = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <ts-select clearable label="Timezone" placeholder="Select a timezone" value="utc" help-text="Click the x to clear.">
      <option value="utc">UTC</option>
      <option value="est">Eastern Time</option>
      <option value="cst">Central Time</option>
      <option value="pst">Pacific Time</option>
    </ts-select>
    <ts-select clearable searchable label="Language" placeholder="Search and select a language" value="en">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="ja">Japanese</option>
    </ts-select>
  </div>
`;
