// Hand-written stories for ts-stepper

export default {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'The index of the currently active step (0-based).',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation.',
    },
    linear: {
      control: 'boolean',
      description: 'If true, steps must be completed in order.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.activeStep !== undefined) attrs.push(`active-step="${args.activeStep}"`);
  if (args.orientation !== undefined) attrs.push(`orientation="${args.orientation}"`);
  if (args.linear) attrs.push('linear');
  return `
    <ts-stepper ${attrs.join(' ')}>
      <ts-step label="Account" description="Create your account"></ts-step>
      <ts-step label="Profile" description="Set up your profile"></ts-step>
      <ts-step label="Confirmation" description="Review and confirm"></ts-step>
    </ts-stepper>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    activeStep: 1,
    orientation: 'horizontal',
    linear: false,
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Horizontal</p>
      <ts-stepper active-step="1" orientation="horizontal">
        <ts-step label="Account" description="Create your account" completed></ts-step>
        <ts-step label="Profile" description="Set up your profile"></ts-step>
        <ts-step label="Confirmation" description="Review and confirm"></ts-step>
      </ts-stepper>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Vertical</p>
      <ts-stepper active-step="1" orientation="vertical">
        <ts-step label="Account" description="Create your account" completed></ts-step>
        <ts-step label="Profile" description="Set up your profile"></ts-step>
        <ts-step label="Confirmation" description="Review and confirm"></ts-step>
      </ts-stepper>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Step 1 active (no completed steps)</p>
      <ts-stepper active-step="0">
        <ts-step label="Account" description="Create your account"></ts-step>
        <ts-step label="Profile" description="Set up your profile"></ts-step>
        <ts-step label="Confirmation" description="Review and confirm"></ts-step>
      </ts-stepper>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Step 2 active (first completed)</p>
      <ts-stepper active-step="1">
        <ts-step label="Account" description="Create your account" completed></ts-step>
        <ts-step label="Profile" description="Set up your profile"></ts-step>
        <ts-step label="Confirmation" description="Review and confirm"></ts-step>
      </ts-stepper>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">All completed</p>
      <ts-stepper active-step="2">
        <ts-step label="Account" completed></ts-step>
        <ts-step label="Profile" completed></ts-step>
        <ts-step label="Confirmation" completed></ts-step>
      </ts-stepper>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">With error</p>
      <ts-stepper active-step="1">
        <ts-step label="Account" completed></ts-step>
        <ts-step label="Profile" error description="Validation failed"></ts-step>
        <ts-step label="Confirmation"></ts-step>
      </ts-stepper>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Linear (future steps disabled)</p>
      <ts-stepper active-step="1" linear>
        <ts-step label="Account" completed></ts-step>
        <ts-step label="Profile" description="Currently editing"></ts-step>
        <ts-step label="Confirmation" description="Locked until profile is complete"></ts-step>
      </ts-stepper>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 700px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
      <ts-stepper active-step="1">
        <ts-step label="Account" description="Create your account" completed></ts-step>
        <ts-step label="Profile" description="Set up your profile"></ts-step>
        <ts-step label="Confirmation" description="Review and confirm"></ts-step>
      </ts-stepper>
      <ts-divider style="margin: 24px 0;"></ts-divider>
      <h3 style="margin: 0 0 16px;">Set Up Your Profile</h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-input label="Full Name" placeholder="John Doe"></ts-input>
        <ts-input label="Company" placeholder="Acme Inc."></ts-input>
        <ts-textarea label="Bio" placeholder="Tell us about yourself..."></ts-textarea>
      </div>
      <div style="margin-top: 24px; display: flex; gap: 8px; justify-content: flex-end;">
        <ts-button appearance="outline">Back</ts-button>
        <ts-button variant="primary">Continue</ts-button>
      </div>
    </div>
  </div>
`;
