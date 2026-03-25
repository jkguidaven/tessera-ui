// Hand-written stories for ts-time-picker

export default {
  title: 'Components/Time Picker',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The time value in HH:mm or HH:mm:ss format.' },
    format: {
      control: 'select',
      options: ['12', '24'],
      description: 'Time display format: 12-hour or 24-hour clock.',
    },
    step: { control: 'number', description: 'Minutes increment step.' },
    label: { control: 'text', description: 'Label text displayed above the input.' },
    helpText: { control: 'text', description: 'Help text displayed below the input.' },
    error: { control: 'text', description: 'Error message — renders the input in an error state.' },
    disabled: { control: 'boolean', description: 'Renders the time picker as disabled.' },
    required: { control: 'boolean', description: 'Makes the time picker required.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The time picker\'s size.',
    },
    showSeconds: { control: 'boolean', description: 'Whether to show the seconds segment.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.format !== undefined) attrs.push(`format="${args.format}"`);
  if (args.step !== undefined && args.step !== 1) attrs.push(`step="${args.step}"`);
  if (args.label !== undefined && args.label !== '') attrs.push(`label="${args.label}"`);
  if (args.helpText !== undefined && args.helpText !== '') attrs.push(`help-text="${args.helpText}"`);
  if (args.error !== undefined && args.error !== '') attrs.push(`error="${args.error}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.required) attrs.push('required');
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.showSeconds) attrs.push('show-seconds');
  if (args.name !== undefined && args.name !== '') attrs.push(`name="${args.name}"`);
  return `<ts-time-picker ${attrs.join(' ')}></ts-time-picker>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: '09:30',
    format: '24',
    step: 1,
    label: 'Meeting Time',
    helpText: 'Select the time for your meeting',
    error: '',
    disabled: false,
    required: false,
    size: 'md',
    showSeconds: false,
  },
});

export const TwelveHour = (): string => `
  <ts-stack gap="3">
    <ts-time-picker label="Appointment Time" format="12" value="09:00" help-text="Morning appointments available 8 AM - 12 PM"></ts-time-picker>
    <ts-time-picker label="Reminder" format="12" value="14:30"></ts-time-picker>
    <ts-time-picker label="Alarm" format="12" value="06:45" required></ts-time-picker>
  </ts-stack>
`;

export const WithSeconds = (): string => `
  <ts-stack gap="3">
    <ts-time-picker label="Race Start" show-seconds value="10:30:00" help-text="Precise timing required"></ts-time-picker>
    <ts-time-picker label="Log Timestamp" show-seconds format="12" value="15:45:30"></ts-time-picker>
  </ts-stack>
`;

export const Disabled = (): string => `
  <ts-stack gap="3">
    <ts-time-picker label="Scheduled Time" value="09:00" disabled help-text="This time cannot be changed"></ts-time-picker>
    <ts-time-picker label="End Time" format="12" value="17:00" disabled></ts-time-picker>
  </ts-stack>
`;

export const Sizes = (): string => `
  <ts-stack gap="3">
    <ts-time-picker label="Small" size="sm" value="08:00"></ts-time-picker>
    <ts-time-picker label="Medium" size="md" value="12:00"></ts-time-picker>
    <ts-time-picker label="Large" size="lg" value="16:30"></ts-time-picker>
    <ts-time-picker label="Extra Large" size="xl" value="20:00"></ts-time-picker>
  </ts-stack>
`;

export const States = (): string => `
  <ts-stack gap="3">
    <ts-time-picker label="Default" value="09:00"></ts-time-picker>
    <ts-time-picker label="Required" value="10:00" required></ts-time-picker>
    <ts-time-picker label="With Error" value="25:00" error="Please enter a valid time"></ts-time-picker>
    <ts-time-picker label="With Help Text" value="14:00" help-text="Business hours are 9 AM - 5 PM"></ts-time-picker>
    <ts-time-picker label="Disabled" value="08:30" disabled></ts-time-picker>
  </ts-stack>
`;

export const Composition = (): string => `
  <ts-card bordered style="max-width: 400px;">
    <span slot="header"><h3 style="margin: 0;">Schedule Meeting</h3></span>
    <ts-stack gap="3">
      <ts-input label="Meeting Title" placeholder="Weekly standup"></ts-input>
      <ts-row gap="3">
        <ts-time-picker label="Start Time" format="12" value="09:00"></ts-time-picker>
        <ts-time-picker label="End Time" format="12" value="09:30"></ts-time-picker>
      </ts-row>
    </ts-stack>
    <span slot="footer">
      <ts-row gap="2" justify="end">
        <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button variant="primary">
          <ts-icon slot="prefix" name="calendar" size="sm"></ts-icon>
          Schedule
        </ts-button>
      </ts-row>
    </span>
  </ts-card>
`;
