// Hand-written stories for ts-app-layout

export default {
  title: 'Components/App Layout',
  tags: ['autodocs'],
  argTypes: {
    sidebarPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Controls which side the sidebar appears on.',
    },
  },
};

const sidebarContent = `
  <nav slot="sidebar" style="width: 240px; background: var(--ts-color-bg-surface); border-inline-end: 1px solid var(--ts-color-border-default); padding: var(--ts-spacing-4);">
    <div style="font-weight: 600; font-size: 1.125rem; margin-block-end: var(--ts-spacing-4);">Acme App</div>
    <ts-nav>
      <ts-nav-item active>
        <ts-icon slot="prefix" name="home" size="sm"></ts-icon>
        Dashboard
      </ts-nav-item>
      <ts-nav-item>
        <ts-icon slot="prefix" name="users" size="sm"></ts-icon>
        Team Members
      </ts-nav-item>
      <ts-nav-item>
        <ts-icon slot="prefix" name="folder" size="sm"></ts-icon>
        Projects
      </ts-nav-item>
      <ts-nav-divider></ts-nav-divider>
      <ts-nav-item>
        <ts-icon slot="prefix" name="settings" size="sm"></ts-icon>
        Settings
      </ts-nav-item>
    </ts-nav>
  </nav>
`;

const headerContent = `
  <div slot="header" style="display: flex; align-items: center; justify-content: space-between; padding: var(--ts-spacing-3) var(--ts-spacing-4);">
    <h2 style="margin: 0; font-size: 1rem; font-weight: 600;">Dashboard</h2>
    <ts-row gap="2">
      <ts-button size="sm" appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="bell" size="sm"></ts-icon>
        Notifications
      </ts-button>
      <ts-avatar size="sm" initials="JD"></ts-avatar>
    </ts-row>
  </div>
`;

const mainContent = `
  <div style="padding: var(--ts-spacing-6);">
    <ts-stack gap="4">
      <h1 style="margin: 0;">Welcome back, Jane</h1>
      <ts-row gap="4">
        <ts-card bordered style="flex: 1;">
          <span slot="header"><strong>Total Users</strong></span>
          <p style="margin: 0; font-size: 2rem; font-weight: 700;">1,284</p>
        </ts-card>
        <ts-card bordered style="flex: 1;">
          <span slot="header"><strong>Active Projects</strong></span>
          <p style="margin: 0; font-size: 2rem; font-weight: 700;">12</p>
        </ts-card>
        <ts-card bordered style="flex: 1;">
          <span slot="header"><strong>Open Tasks</strong></span>
          <p style="margin: 0; font-size: 2rem; font-weight: 700;">47</p>
        </ts-card>
      </ts-row>
    </ts-stack>
  </div>
`;

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.sidebarPlacement && args.sidebarPlacement !== 'start') {
    attrs.push(`sidebar-placement="${args.sidebarPlacement}"`);
  }
  return `
    <ts-app-layout ${attrs.join(' ')} style="min-height: 500px; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-container);">
      ${sidebarContent}
      ${headerContent}
      ${mainContent}
    </ts-app-layout>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    sidebarPlacement: 'start',
  },
});

export const SidebarEnd = (): string => `
  <ts-app-layout sidebar-placement="end" style="min-height: 500px; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-container);">
    ${mainContent}
    <nav slot="sidebar" style="width: 260px; background: var(--ts-color-bg-surface); border-inline-start: 1px solid var(--ts-color-border-default); padding: var(--ts-spacing-4);">
      <div style="font-weight: 600; margin-block-end: var(--ts-spacing-4);">Details Panel</div>
      <ts-stack gap="3">
        <ts-card bordered>
          <span slot="header"><strong>Task Info</strong></span>
          <p style="margin: 0; color: var(--ts-color-text-secondary);">Review the quarterly metrics report and prepare summary slides.</p>
        </ts-card>
        <ts-button variant="primary" block>
          <ts-icon slot="prefix" name="check" size="sm"></ts-icon>
          Mark Complete
        </ts-button>
      </ts-stack>
    </nav>
    ${headerContent}
  </ts-app-layout>
`;
