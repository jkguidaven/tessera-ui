// Hand-written stories for ts-toggle

export default {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Whether the toggle is checked.' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The toggle\'s size.',
    },
    disabled: { control: 'boolean', description: 'Renders the toggle as disabled.' },
    name: { control: 'text', description: 'Name for form submission.' },
    value: { control: 'text', description: 'Value for form submission.' },
    slotContent: { control: 'text', description: 'Toggle label text' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.checked) attrs.push('checked');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.name !== undefined && args.name !== null && args.name !== '') attrs.push(`name="${args.name}"`);
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  return `<ts-toggle ${attrs.join(' ')}>${args.slotContent || ''}</ts-toggle>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    checked: false,
    size: 'md',
    disabled: false,
    slotContent: 'Enable notifications',
  },
});

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ts-toggle size="xs">Extra Small</ts-toggle>
    <ts-toggle size="sm">Small</ts-toggle>
    <ts-toggle size="md">Medium</ts-toggle>
    <ts-toggle size="lg">Large</ts-toggle>
    <ts-toggle size="xl">Extra Large</ts-toggle>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ts-toggle>Unchecked</ts-toggle>
    <ts-toggle checked>Checked</ts-toggle>
    <ts-toggle disabled>Disabled (unchecked)</ts-toggle>
    <ts-toggle disabled checked>Disabled (checked)</ts-toggle>
  </div>
`;

export const WithIcons = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <ts-icon name="moon" size="sm"></ts-icon>
      <ts-toggle checked>Dark Mode</ts-toggle>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <ts-icon name="wifi" size="sm"></ts-icon>
      <ts-toggle checked>Wi-Fi</ts-toggle>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <ts-icon name="bluetooth" size="sm"></ts-icon>
      <ts-toggle>Bluetooth</ts-toggle>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <ts-icon name="map-pin" size="sm"></ts-icon>
      <ts-toggle>Location Services</ts-toggle>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
    <ts-card bordered padding="lg">
      <span slot="header"><h3 style="margin: 0;">Notification Preferences</h3></span>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--ts-color-border-default); padding-bottom: 12px;">
          <div>
            <div style="font-weight: 600;">Email Notifications</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Receive updates about your account via email.</div>
          </div>
          <ts-toggle checked></ts-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--ts-color-border-default); padding-bottom: 12px;">
          <div>
            <div style="font-weight: 600;">Push Notifications</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Get real-time alerts on your device.</div>
          </div>
          <ts-toggle checked></ts-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--ts-color-border-default); padding-bottom: 12px;">
          <div>
            <div style="font-weight: 600;">SMS Alerts</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Critical alerts sent to your phone number.</div>
          </div>
          <ts-toggle></ts-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Marketing Emails</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Receive tips, product updates, and promotions.</div>
          </div>
          <ts-toggle></ts-toggle>
        </div>
      </div>
      <span slot="footer">
        <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px;">
          <ts-button appearance="outline" variant="neutral">Reset to Defaults</ts-button>
          <ts-button variant="primary">Save Preferences</ts-button>
        </div>
      </span>
    </ts-card>

    <ts-card bordered padding="lg">
      <span slot="header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <ts-icon name="shield" size="sm"></ts-icon>
          <h3 style="margin: 0;">Privacy & Security</h3>
        </div>
      </span>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Two-Factor Authentication</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Add an extra layer of security to your account.</div>
          </div>
          <ts-toggle checked></ts-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Activity Log</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Track all login sessions and API usage.</div>
          </div>
          <ts-toggle checked></ts-toggle>
        </div>
      </div>
    </ts-card>
  </div>
`;
