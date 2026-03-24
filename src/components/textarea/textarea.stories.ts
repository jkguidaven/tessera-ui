// Hand-written stories for ts-textarea

export default {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The textarea value.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    disabled: { control: 'boolean', description: 'Renders the textarea as disabled.' },
    readonly: { control: 'boolean', description: 'Renders the textarea as readonly.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The textarea size.',
    },
    label: { control: 'text', description: 'Label text displayed above the textarea.' },
    helpText: { control: 'text', description: 'Help text displayed below the textarea.' },
    error: { control: 'boolean', description: 'Renders the textarea in an error state.' },
    errorMessage: { control: 'text', description: 'Error message displayed below the textarea.' },
    required: { control: 'boolean', description: 'Makes the textarea required.' },
    rows: { control: 'number', description: 'Number of visible text rows.' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior.',
    },
    maxlength: { control: 'number', description: 'Maximum character length.' },
    name: { control: 'text', description: 'Name attribute for form submission.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.placeholder !== undefined && args.placeholder !== null) attrs.push(`placeholder="${args.placeholder}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.readonly) attrs.push('readonly');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  if (args.helpText !== undefined && args.helpText !== null) attrs.push(`help-text="${args.helpText}"`);
  if (args.error) attrs.push('error');
  if (args.errorMessage !== undefined && args.errorMessage !== null) attrs.push(`error-message="${args.errorMessage}"`);
  if (args.required) attrs.push('required');
  if (args.rows !== undefined && args.rows !== null) attrs.push(`rows="${args.rows}"`);
  if (args.resize !== undefined && args.resize !== null) attrs.push(`resize="${args.resize}"`);
  if (args.maxlength !== undefined && args.maxlength !== null) attrs.push(`maxlength="${args.maxlength}"`);
  if (args.name !== undefined && args.name !== null) attrs.push(`name="${args.name}"`);
  return `<ts-textarea ${attrs.join(' ')}></ts-textarea>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: '',
    placeholder: 'Enter additional notes...',
    disabled: false,
    readonly: false,
    size: 'md',
    label: 'Additional Notes',
    helpText: 'Provide any relevant details or context.',
    error: false,
    errorMessage: '',
    required: false,
    rows: 3,
    resize: 'vertical',
    name: 'notes',
  },
});

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <ts-textarea size="sm" label="Small" placeholder="Small textarea..." rows="2"></ts-textarea>
    <ts-textarea size="md" label="Medium" placeholder="Medium textarea..." rows="3"></ts-textarea>
    <ts-textarea size="lg" label="Large" placeholder="Large textarea..." rows="4"></ts-textarea>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <ts-textarea label="Default" placeholder="Type something..."></ts-textarea>
    <ts-textarea label="With value" value="This textarea has pre-filled content that the user can edit."></ts-textarea>
    <ts-textarea label="Disabled" disabled placeholder="Cannot edit this field" value="This content is locked."></ts-textarea>
    <ts-textarea label="Readonly" readonly value="This content can be read but not modified."></ts-textarea>
    <ts-textarea label="Required" required placeholder="This field is required" help-text="You must fill in this field."></ts-textarea>
    <ts-textarea label="Error" error error-message="Description must be at least 20 characters." placeholder="Enter a description..."></ts-textarea>
  </div>
`;

export const ResizeBehaviors = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <ts-textarea label="Vertical resize (default)" resize="vertical" placeholder="Drag the bottom-right corner vertically..."></ts-textarea>
    <ts-textarea label="Horizontal resize" resize="horizontal" placeholder="Drag horizontally..."></ts-textarea>
    <ts-textarea label="Both directions" resize="both" placeholder="Drag in any direction..."></ts-textarea>
    <ts-textarea label="No resize" resize="none" placeholder="This textarea cannot be resized."></ts-textarea>
  </div>
`;

export const FeedbackForm = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <h3 style="margin: 0; font-family: sans-serif;">Submit Feedback</h3>
    <ts-textarea
      label="Description"
      placeholder="Describe the issue or suggestion in detail..."
      required
      rows="5"
      maxlength="500"
      help-text="Maximum 500 characters."
      name="description"
    ></ts-textarea>
    <ts-textarea
      label="Steps to Reproduce"
      placeholder="1. Go to...  2. Click on...  3. Observe..."
      rows="4"
      name="steps"
    ></ts-textarea>
    <ts-textarea
      label="Expected Behavior"
      placeholder="What did you expect to happen?"
      rows="2"
      name="expected"
    ></ts-textarea>
  </div>
`;
