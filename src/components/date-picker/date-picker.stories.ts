// Hand-written stories for ts-date-picker

export default {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected date value in ISO format (YYYY-MM-DD).',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled.',
    },
    min: {
      control: 'text',
      description: 'Minimum selectable date in ISO format.',
    },
    max: {
      control: 'text',
      description: 'Maximum selectable date in ISO format.',
    },
    label: {
      control: 'text',
      description: 'Label text for the input.',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state.',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The input size.',
    },
    name: {
      control: 'text',
      description: 'Form field name.',
    },
    locale: {
      control: 'text',
      description: 'Locale string for date formatting (BCP 47).',
    },
    firstDayOfWeek: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'First day of the week (0 = Sunday, 6 = Saturday).',
    },
    range: {
      control: 'boolean',
      description: 'Enable date range selection mode.',
    },
    valueEnd: {
      control: 'text',
      description: 'End date for range selection in ISO format.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.placeholder !== undefined) attrs.push(`placeholder="${args.placeholder}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.min !== undefined && args.min !== '') attrs.push(`min="${args.min}"`);
  if (args.max !== undefined && args.max !== '') attrs.push(`max="${args.max}"`);
  if (args.label !== undefined) attrs.push(`label="${args.label}"`);
  if (args.error) attrs.push('error');
  if (args.errorMessage !== undefined && args.errorMessage !== '') attrs.push(`error-message="${args.errorMessage}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.name !== undefined && args.name !== '') attrs.push(`name="${args.name}"`);
  if (args.locale !== undefined && args.locale !== '') attrs.push(`locale="${args.locale}"`);
  if (args.firstDayOfWeek !== undefined) attrs.push(`first-day-of-week="${args.firstDayOfWeek}"`);
  if (args.range) attrs.push('range');
  if (args.valueEnd !== undefined && args.valueEnd !== '') attrs.push(`value-end="${args.valueEnd}"`);
  return `<ts-date-picker ${attrs.join(' ')}></ts-date-picker>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    label: 'Start date',
    placeholder: 'Select date',
    size: 'md',
    disabled: false,
    error: false,
  },
});

export const Sizes = (): string => `
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start;">
    <ts-date-picker label="Small" size="sm" placeholder="Select date"></ts-date-picker>
    <ts-date-picker label="Medium" size="md" placeholder="Select date"></ts-date-picker>
    <ts-date-picker label="Large" size="lg" placeholder="Select date"></ts-date-picker>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start;">
    <ts-date-picker label="Default" placeholder="Select date"></ts-date-picker>
    <ts-date-picker label="With value" value="2026-03-15" placeholder="Select date"></ts-date-picker>
    <ts-date-picker label="Disabled" placeholder="Select date" disabled></ts-date-picker>
    <ts-date-picker label="Error state" placeholder="Select date" error error-message="Please select a valid date"></ts-date-picker>
  </div>
`;

export const WithYearNav = (): string => `
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
    <ts-date-picker
      label="Event date"
      placeholder="Pick a date"
      value="2024-06-15"
    ></ts-date-picker>
  </div>
  <p style="margin-top: 12px; font-size: 14px; color: #6b7280;">
    Use the double chevron buttons (&laquo; &raquo;) to navigate between years.
  </p>
`;

export const RangeSelection = (): string => `
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
    <ts-date-picker
      label="Booking dates"
      placeholder="Select date range"
      range
      value="2026-03-10"
      value-end="2026-03-18"
    ></ts-date-picker>
    <ts-date-picker
      label="Select new range"
      placeholder="Click two dates"
      range
    ></ts-date-picker>
  </div>
`;

export const CustomLocale = (): string => `
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
    <ts-date-picker
      label="Week starts Monday"
      placeholder="Select date"
      first-day-of-week="1"
    ></ts-date-picker>
    <ts-date-picker
      label="Week starts Saturday"
      placeholder="Select date"
      first-day-of-week="6"
    ></ts-date-picker>
  </div>
`;

export const Composition = (): string => `
  <div style="max-width: 400px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <h4 style="margin: 0 0 16px;">Travel Dates</h4>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-date-picker
          label="Departure"
          placeholder="Select departure date"
          min="2026-03-24"
          name="departure"
        ></ts-date-picker>
        <ts-date-picker
          label="Return"
          placeholder="Select return date"
          min="2026-03-25"
          name="return"
        ></ts-date-picker>
        <ts-button variant="primary" block>Search Flights</ts-button>
      </div>
    </div>
  </div>
`;
