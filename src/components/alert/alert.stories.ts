// Hand-written stories for ts-alert

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The alert\'s semantic variant.',
    },
    closable: { control: 'boolean', description: 'Whether the alert can be dismissed.' },
    slotContent: { control: 'text', description: 'Alert message content' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined && args.variant !== null) attrs.push(`variant="${args.variant}"`);
  if (args.closable) attrs.push('closable');
  return `<ts-alert ${attrs.join(' ')}>${args.slotContent || 'This is an alert message.'}</ts-alert>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'info',
    closable: false,
    slotContent: 'Your account settings have been updated successfully.',
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <ts-alert variant="info">A new software update is available. See what's new in version 3.2.</ts-alert>
    <ts-alert variant="success">Your payment of $49.99 has been processed successfully.</ts-alert>
    <ts-alert variant="warning">Your free trial expires in 3 days. Upgrade now to keep your data.</ts-alert>
    <ts-alert variant="danger">Unable to connect to the database. Please check your credentials.</ts-alert>
    <ts-alert variant="primary">Welcome back! You have 5 unread notifications.</ts-alert>
    <ts-alert variant="secondary">This feature is in beta. Your feedback helps us improve.</ts-alert>
    <ts-alert variant="neutral">Scheduled maintenance will occur on Sunday from 2-4 AM UTC.</ts-alert>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <ts-alert variant="info">Standard non-dismissible alert.</ts-alert>
    <ts-alert variant="success" closable>Dismissible alert — click the close button to hide.</ts-alert>
    <ts-alert variant="warning" closable>Your session will expire in 10 minutes. Save your work.</ts-alert>
    <ts-alert variant="danger" closable>Failed to save changes. Please try again.</ts-alert>
  </div>
`;

export const WithIcons = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <ts-alert variant="info">
      <ts-icon slot="icon" name="info" size="sm"></ts-icon>
      Two-factor authentication is now available for your account.
    </ts-alert>
    <ts-alert variant="success">
      <ts-icon slot="icon" name="check-circle" size="sm"></ts-icon>
      Deployment to production completed in 2m 34s.
    </ts-alert>
    <ts-alert variant="warning">
      <ts-icon slot="icon" name="alert-triangle" size="sm"></ts-icon>
      API rate limit approaching. 450 of 500 requests used this hour.
    </ts-alert>
    <ts-alert variant="danger">
      <ts-icon slot="icon" name="x-circle" size="sm"></ts-icon>
      Build failed: 3 test suites did not pass. Check the logs for details.
    </ts-alert>
  </div>
`;

export const WithActions = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <ts-alert variant="info" closable>
      A new version (v3.2.0) is available.
      <span slot="action">
        <ts-button size="sm" appearance="outline" variant="primary">Update Now</ts-button>
      </span>
    </ts-alert>
    <ts-alert variant="warning">
      Your subscription will renew in 5 days at $29/month.
      <span slot="action">
        <ts-button size="sm" appearance="ghost" variant="neutral">Manage Plan</ts-button>
      </span>
    </ts-alert>
    <ts-alert variant="danger" closable>
      <ts-icon slot="icon" name="shield-alert" size="sm"></ts-icon>
      Unusual login attempt detected from a new device.
      <span slot="action">
        <ts-button size="sm" variant="danger">Review Activity</ts-button>
      </span>
    </ts-alert>
    <ts-alert variant="success" closable>
      <ts-icon slot="icon" name="check-circle" size="sm"></ts-icon>
      Your file has been uploaded successfully.
      <span slot="action">
        <ts-button size="sm" appearance="link" variant="primary">View File</ts-button>
      </span>
    </ts-alert>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
    <ts-card bordered padding="lg">
      <span slot="header"><h3 style="margin: 0;">Account Settings</h3></span>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-alert variant="warning">
          <ts-icon slot="icon" name="alert-triangle" size="sm"></ts-icon>
          Your email address has not been verified.
          <span slot="action">
            <ts-button size="sm" appearance="outline" variant="warning">Resend Verification</ts-button>
          </span>
        </ts-alert>
        <ts-input label="Email" value="unverified@example.com" type="email">
          <ts-icon slot="prefix" name="mail" size="sm"></ts-icon>
        </ts-input>
        <ts-input label="Phone" type="tel" placeholder="+1 (555) 000-0000">
          <ts-icon slot="prefix" name="phone" size="sm"></ts-icon>
        </ts-input>
        <ts-toggle checked>Enable two-factor authentication</ts-toggle>
      </div>
      <span slot="footer">
        <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px;">
          <ts-button appearance="outline" variant="neutral">Discard</ts-button>
          <ts-button variant="primary">Save Settings</ts-button>
        </div>
      </span>
    </ts-card>
  </div>
`;
