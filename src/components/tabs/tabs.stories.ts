// Hand-written stories for ts-tabs

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The value of the currently active tab.' },
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'pill'],
      description: 'Visual variant of the tab bar.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tab buttons.',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tab bar.',
    },
    closable: {
      control: 'boolean',
      description: 'Whether tabs display a close button.',
    },
    scrollable: {
      control: 'boolean',
      description: 'Whether the tab list is scrollable on overflow.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined && args.value !== null && args.value !== '') attrs.push(`value="${args.value}"`);
  if (args.variant !== undefined && args.variant !== null) attrs.push(`variant="${args.variant}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.orientation !== undefined && args.orientation !== null) attrs.push(`orientation="${args.orientation}"`);
  if (args.closable) attrs.push('closable');
  if (args.scrollable) attrs.push('scrollable');
  return `
    <ts-tabs ${attrs.join(' ')}>
      <ts-tab-panel tab="Profile" value="profile">
        <div style="padding: 16px; font-family: sans-serif;">
          <h4 style="margin: 0 0 8px;">Profile Information</h4>
          <p style="margin: 0; color: #555;">Manage your name, email address, and personal details.</p>
        </div>
      </ts-tab-panel>
      <ts-tab-panel tab="Settings" value="settings">
        <div style="padding: 16px; font-family: sans-serif;">
          <h4 style="margin: 0 0 8px;">Account Settings</h4>
          <p style="margin: 0; color: #555;">Configure notifications, privacy, and security preferences.</p>
        </div>
      </ts-tab-panel>
      <ts-tab-panel tab="Billing" value="billing">
        <div style="padding: 16px; font-family: sans-serif;">
          <h4 style="margin: 0 0 8px;">Billing &amp; Plans</h4>
          <p style="margin: 0; color: #555;">View invoices, update payment methods, and manage your subscription.</p>
        </div>
      </ts-tab-panel>
    </ts-tabs>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: 'profile',
    variant: 'line',
    size: 'md',
  },
});

export const Variants = (): string => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Line (default)</h4>
      <ts-tabs variant="line" value="tab1">
        <ts-tab-panel tab="Overview" value="tab1">
          <div style="padding: 16px; font-family: sans-serif;">Overview content with line-style tabs.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="Details" value="tab2">
          <div style="padding: 16px;">Details content.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="History" value="tab3">
          <div style="padding: 16px;">History content.</div>
        </ts-tab-panel>
      </ts-tabs>
    </div>
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Enclosed</h4>
      <ts-tabs variant="enclosed" value="tab1">
        <ts-tab-panel tab="Overview" value="tab1">
          <div style="padding: 16px; font-family: sans-serif;">Overview content with enclosed-style tabs.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="Details" value="tab2">
          <div style="padding: 16px;">Details content.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="History" value="tab3">
          <div style="padding: 16px;">History content.</div>
        </ts-tab-panel>
      </ts-tabs>
    </div>
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Pill</h4>
      <ts-tabs variant="pill" value="tab1">
        <ts-tab-panel tab="Overview" value="tab1">
          <div style="padding: 16px; font-family: sans-serif;">Overview content with pill-style tabs.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="Details" value="tab2">
          <div style="padding: 16px;">Details content.</div>
        </ts-tab-panel>
        <ts-tab-panel tab="History" value="tab3">
          <div style="padding: 16px;">History content.</div>
        </ts-tab-panel>
      </ts-tabs>
    </div>
  </div>
`;

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Small</h4>
      <ts-tabs size="sm" value="tab1">
        <ts-tab-panel tab="First" value="tab1"><div style="padding: 12px; font-family: sans-serif;">Small tabs content.</div></ts-tab-panel>
        <ts-tab-panel tab="Second" value="tab2"><div style="padding: 12px;">Second panel.</div></ts-tab-panel>
      </ts-tabs>
    </div>
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Medium</h4>
      <ts-tabs size="md" value="tab1">
        <ts-tab-panel tab="First" value="tab1"><div style="padding: 16px; font-family: sans-serif;">Medium tabs content.</div></ts-tab-panel>
        <ts-tab-panel tab="Second" value="tab2"><div style="padding: 16px;">Second panel.</div></ts-tab-panel>
      </ts-tabs>
    </div>
    <div>
      <h4 style="margin: 0 0 8px; font-family: sans-serif;">Large</h4>
      <ts-tabs size="lg" value="tab1">
        <ts-tab-panel tab="First" value="tab1"><div style="padding: 20px; font-family: sans-serif;">Large tabs content.</div></ts-tab-panel>
        <ts-tab-panel tab="Second" value="tab2"><div style="padding: 20px;">Second panel.</div></ts-tab-panel>
      </ts-tabs>
    </div>
  </div>
`;

export const WithDisabledTab = (): string => `
  <ts-tabs value="profile">
    <ts-tab-panel tab="Profile" value="profile">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Your profile is active and visible to other users.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Settings" value="settings">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Adjust your account preferences here.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Admin" value="admin" disabled>
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Admin panel content (restricted).</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Billing" value="billing">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Manage your subscription and payment methods.</p>
      </div>
    </ts-tab-panel>
  </ts-tabs>
`;

export const Vertical = (): string => `
  <ts-tabs orientation="vertical" value="general">
    <ts-tab-panel tab="General" value="general">
      <div style="padding: 16px; font-family: sans-serif;">
        <h4 style="margin: 0 0 8px;">General Settings</h4>
        <p style="margin: 0; color: #555;">Configure your application name, language, and timezone preferences.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Notifications" value="notifications">
      <div style="padding: 16px; font-family: sans-serif;">
        <h4 style="margin: 0 0 8px;">Notification Preferences</h4>
        <p style="margin: 0; color: #555;">Choose which notifications you receive and how they are delivered.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Security" value="security">
      <div style="padding: 16px; font-family: sans-serif;">
        <h4 style="margin: 0 0 8px;">Security Settings</h4>
        <p style="margin: 0; color: #555;">Manage two-factor authentication, active sessions, and API keys.</p>
      </div>
    </ts-tab-panel>
  </ts-tabs>
`;

export const Closable = (): string => `
  <ts-tabs closable value="dashboard">
    <ts-tab-panel tab="Dashboard" value="dashboard">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Main dashboard overview with key metrics and activity feed.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Reports" value="reports">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">Generate and view detailed analytics reports.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Logs" value="logs">
      <div style="padding: 16px; font-family: sans-serif;">
        <p style="margin: 0;">System event logs and audit trail.</p>
      </div>
    </ts-tab-panel>
  </ts-tabs>
`;

export const Scrollable = (): string => `
  <div style="max-width: 400px;">
    <ts-tabs scrollable value="jan">
      <ts-tab-panel tab="January" value="jan"><div style="padding: 16px; font-family: sans-serif;">January data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="February" value="feb"><div style="padding: 16px;">February data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="March" value="mar"><div style="padding: 16px;">March data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="April" value="apr"><div style="padding: 16px;">April data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="May" value="may"><div style="padding: 16px;">May data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="June" value="jun"><div style="padding: 16px;">June data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="July" value="jul"><div style="padding: 16px;">July data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="August" value="aug"><div style="padding: 16px;">August data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="September" value="sep"><div style="padding: 16px;">September data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="October" value="oct"><div style="padding: 16px;">October data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="November" value="nov"><div style="padding: 16px;">November data and metrics.</div></ts-tab-panel>
      <ts-tab-panel tab="December" value="dec"><div style="padding: 16px;">December data and metrics.</div></ts-tab-panel>
    </ts-tabs>
  </div>
`;

export const DashboardExample = (): string => `
  <ts-tabs variant="enclosed" value="analytics">
    <ts-tab-panel tab="Analytics" value="analytics">
      <div style="padding: 20px; font-family: sans-serif;">
        <h4 style="margin: 0 0 12px;">Monthly Analytics</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div style="padding: 16px; background: #f0f9ff; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">12,459</div>
            <div style="color: #555; font-size: 14px;">Page Views</div>
          </div>
          <div style="padding: 16px; background: #f0fdf4; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">3,721</div>
            <div style="color: #555; font-size: 14px;">Unique Visitors</div>
          </div>
          <div style="padding: 16px; background: #fefce8; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">2m 34s</div>
            <div style="color: #555; font-size: 14px;">Avg. Session</div>
          </div>
        </div>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Users" value="users">
      <div style="padding: 20px; font-family: sans-serif;">
        <h4 style="margin: 0 0 12px;">Active Users</h4>
        <p style="margin: 0; color: #555;">User management and activity tracking.</p>
      </div>
    </ts-tab-panel>
    <ts-tab-panel tab="Revenue" value="revenue">
      <div style="padding: 20px; font-family: sans-serif;">
        <h4 style="margin: 0 0 12px;">Revenue Overview</h4>
        <p style="margin: 0; color: #555;">Track earnings, refunds, and projections.</p>
      </div>
    </ts-tab-panel>
  </ts-tabs>
`;
