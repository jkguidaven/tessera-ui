// Hand-written stories for ts-combobox

export default {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The current selected value.' },
    label: { control: 'text', description: 'Label text displayed above the combobox.' },
    placeholder: { control: 'text', description: 'Placeholder text for the input.' },
    disabled: { control: 'boolean', description: 'Renders the combobox as disabled.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The combobox size.',
    },
    error: { control: 'text', description: 'Error message displayed below the combobox.' },
    helpText: { control: 'text', description: 'Help text displayed below the combobox.' },
    required: { control: 'boolean', description: 'Makes the combobox required.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  if (args.placeholder !== undefined && args.placeholder !== null) attrs.push(`placeholder="${args.placeholder}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.error !== undefined && args.error !== null && args.error !== '') attrs.push(`error="${args.error}"`);
  if (args.helpText !== undefined && args.helpText !== null) attrs.push(`help-text="${args.helpText}"`);
  if (args.required) attrs.push('required');
  return `
    <ts-combobox ${attrs.join(' ')}>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
      <option value="jp">Japan</option>
      <option value="br">Brazil</option>
    </ts-combobox>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: '',
    label: 'Country',
    placeholder: 'Search for a country',
    disabled: false,
    size: 'md',
    error: '',
    helpText: 'Type to filter the list of countries.',
    required: false,
  },
});

export const WithFiltering = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 320px;">
    <ts-combobox label="Programming Language" placeholder="Type to search..." help-text="Start typing to filter options.">
      <option value="js">JavaScript</option>
      <option value="ts">TypeScript</option>
      <option value="py">Python</option>
      <option value="rs">Rust</option>
      <option value="go">Go</option>
      <option value="java">Java</option>
      <option value="rb">Ruby</option>
      <option value="cpp">C++</option>
    </ts-combobox>
    <ts-combobox label="City" placeholder="Search cities..." value="nyc">
      <option value="nyc">New York</option>
      <option value="ldn">London</option>
      <option value="tky">Tokyo</option>
      <option value="par">Paris</option>
      <option value="syd">Sydney</option>
      <option value="ber">Berlin</option>
    </ts-combobox>
  </div>
`;

export const ErrorState = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 320px;">
    <ts-combobox label="Department" placeholder="Select a department" error="Please select a valid department." required>
      <option value="eng">Engineering</option>
      <option value="des">Design</option>
      <option value="mkt">Marketing</option>
      <option value="sales">Sales</option>
    </ts-combobox>
    <ts-combobox label="Manager" placeholder="Search for a manager" error="This field is required." required>
      <option value="jd">Jane Doe</option>
      <option value="js">John Smith</option>
      <option value="ak">Alice Kim</option>
    </ts-combobox>
  </div>
`;

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <ts-combobox size="sm" label="Small" placeholder="Search...">
      <option value="opt1">First option</option>
      <option value="opt2">Second option</option>
      <option value="opt3">Third option</option>
    </ts-combobox>
    <ts-combobox size="md" label="Medium" placeholder="Search...">
      <option value="opt1">First option</option>
      <option value="opt2">Second option</option>
      <option value="opt3">Third option</option>
    </ts-combobox>
    <ts-combobox size="lg" label="Large" placeholder="Search...">
      <option value="opt1">First option</option>
      <option value="opt2">Second option</option>
      <option value="opt3">Third option</option>
    </ts-combobox>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <ts-combobox label="Default" placeholder="Type to search">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </ts-combobox>
    <ts-combobox label="With Value" value="react" placeholder="Search framework">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </ts-combobox>
    <ts-combobox label="Disabled" disabled placeholder="Cannot search">
      <option value="a">Option A</option>
    </ts-combobox>
    <ts-combobox label="Required" required placeholder="Must select" help-text="This field is required.">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </ts-combobox>
  </div>
`;
