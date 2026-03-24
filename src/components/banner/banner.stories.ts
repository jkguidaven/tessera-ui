// Hand-written stories for ts-banner

export default {
  title: 'Components/Banner',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The banner\'s semantic variant.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the banner can be dismissed.',
    },
    icon: {
      control: 'text',
      description: 'Optional Lucide icon name.',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the banner sticks to the top of the viewport.',
    },
    slotContent: {
      control: 'text',
      description: 'Default slot content',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.dismissible) attrs.push('dismissible');
  if (args.icon !== undefined && args.icon !== '') attrs.push(`icon="${args.icon}"`);
  if (args.sticky) attrs.push('sticky');
  return `<ts-banner ${attrs.join(' ')}>${args.slotContent || ''}</ts-banner>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'info',
    dismissible: true,
    slotContent: 'System maintenance scheduled for Sunday, March 29 at 2:00 AM UTC.',
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <ts-banner variant="info">A new version of the application is available.</ts-banner>
    <ts-banner variant="success">Your payment was processed successfully.</ts-banner>
    <ts-banner variant="warning">Your storage is almost full. Consider upgrading your plan.</ts-banner>
    <ts-banner variant="danger">Your account has been flagged for suspicious activity.</ts-banner>
    <ts-banner variant="neutral">We have updated our terms of service.</ts-banner>
    <ts-banner variant="primary">New feature available: Try our advanced analytics dashboard.</ts-banner>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Dismissible</p>
      <ts-banner variant="info" dismissible>System maintenance scheduled for Sunday at 2:00 AM UTC.</ts-banner>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Not dismissible</p>
      <ts-banner variant="warning">This banner cannot be dismissed.</ts-banner>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">With action</p>
      <ts-banner variant="info" dismissible>
        A new feature is available.
        <ts-button slot="action" size="sm" appearance="outline">Learn More</ts-button>
      </ts-banner>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <ts-banner variant="warning" dismissible>
      Your trial expires in 3 days. Upgrade now to keep access to all features.
      <ts-button slot="action" size="sm" variant="warning" appearance="outline">Upgrade Plan</ts-button>
    </ts-banner>
    <ts-banner variant="success" dismissible>
      Welcome! Your account has been verified successfully.
    </ts-banner>
    <ts-banner variant="danger">
      Action required: Please verify your email address to continue.
      <ts-button slot="action" size="sm" variant="danger" appearance="outline">Verify Email</ts-button>
    </ts-banner>
  </div>
`;
