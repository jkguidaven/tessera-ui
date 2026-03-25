// Hand-written stories for ts-sidebar

export default {
  title: 'Components/Sidebar',
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean', description: 'Whether the sidebar is collapsed.' },
    width: { control: 'text', description: 'The expanded width of the sidebar.' },
    collapsible: { control: 'boolean', description: 'Whether the sidebar can be collapsed via a toggle button.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.collapsed) attrs.push('collapsed');
  if (args.collapsible) attrs.push('collapsible');
  if (args.width !== undefined && args.width !== null && args.width !== '') attrs.push(`width="${args.width}"`);
  return `
    <div style="height: 400px; display: flex; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive);">
      <ts-sidebar ${attrs.join(' ')}>
        <div slot="header" style="font-weight: 600; font-size: 1.1em;">My App</div>
        <ts-nav>
          <ts-nav-item active>
            <ts-icon name="home" slot="prefix"></ts-icon>
            Dashboard
          </ts-nav-item>
          <ts-nav-item>
            <ts-icon name="users" slot="prefix"></ts-icon>
            Team
          </ts-nav-item>
          <ts-nav-item>
            <ts-icon name="settings" slot="prefix"></ts-icon>
            Settings
          </ts-nav-item>
        </ts-nav>
        <div slot="footer" style="font-size: 0.85em; color: var(--ts-color-text-secondary);">v1.0.0</div>
      </ts-sidebar>
      <div style="flex: 1; padding: var(--ts-spacing-6);">
        <h2 style="margin: 0;">Main Content</h2>
        <p>This area represents the main content beside the sidebar.</p>
      </div>
    </div>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    collapsed: false,
    width: '260px',
    collapsible: false,
  },
});

export const Collapsible = (): string => `
  <div style="height: 400px; display: flex; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive);">
    <ts-sidebar collapsible>
      <div slot="header" style="font-weight: 600; font-size: 1.1em;">My App</div>
      <ts-nav>
        <ts-nav-item active>
          <ts-icon name="home" slot="prefix"></ts-icon>
          Dashboard
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="file-text" slot="prefix"></ts-icon>
          Documents
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="bar-chart" slot="prefix"></ts-icon>
          Analytics
        </ts-nav-item>
      </ts-nav>
      <div slot="footer" style="font-size: 0.85em; color: var(--ts-color-text-secondary);">v1.0.0</div>
    </ts-sidebar>
    <div style="flex: 1; padding: var(--ts-spacing-6);">
      <h2 style="margin: 0;">Main Content</h2>
      <p>Click the toggle button in the sidebar footer to collapse and expand.</p>
    </div>
  </div>
`;

export const Collapsed = (): string => `
  <div style="height: 400px; display: flex; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive);">
    <ts-sidebar collapsed collapsible>
      <div slot="header" style="font-weight: 600;">
        <ts-icon name="layout-grid"></ts-icon>
      </div>
      <ts-nav>
        <ts-nav-item active>
          <ts-icon name="home" slot="prefix"></ts-icon>
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="users" slot="prefix"></ts-icon>
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="settings" slot="prefix"></ts-icon>
        </ts-nav-item>
      </ts-nav>
    </ts-sidebar>
    <div style="flex: 1; padding: var(--ts-spacing-6);">
      <h2 style="margin: 0;">Collapsed Sidebar</h2>
      <p>The sidebar starts in a collapsed state showing only icons.</p>
    </div>
  </div>
`;

export const WithNav = (): string => `
  <div style="height: 500px; display: flex; border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive);">
    <ts-sidebar collapsible width="280px">
      <div slot="header" style="font-weight: 600; font-size: 1.1em; display: flex; align-items: center; gap: var(--ts-spacing-2);">
        <ts-icon name="box"></ts-icon>
        <span>Acme Inc</span>
      </div>
      <ts-nav>
        <ts-nav-item active>
          <ts-icon name="home" slot="prefix"></ts-icon>
          Dashboard
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="inbox" slot="prefix"></ts-icon>
          Inbox
          <ts-chip slot="suffix" size="sm" variant="primary">12</ts-chip>
        </ts-nav-item>
        <ts-nav-divider></ts-nav-divider>
        <ts-nav-item>
          <ts-icon name="users" slot="prefix"></ts-icon>
          Team Members
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="folder" slot="prefix"></ts-icon>
          Projects
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="calendar" slot="prefix"></ts-icon>
          Schedule
        </ts-nav-item>
        <ts-nav-divider></ts-nav-divider>
        <ts-nav-item>
          <ts-icon name="settings" slot="prefix"></ts-icon>
          Settings
        </ts-nav-item>
        <ts-nav-item>
          <ts-icon name="help-circle" slot="prefix"></ts-icon>
          Help & Support
        </ts-nav-item>
      </ts-nav>
      <div slot="footer" style="display: flex; align-items: center; gap: var(--ts-spacing-2);">
        <ts-avatar size="sm" initials="JD"></ts-avatar>
        <span style="font-size: 0.85em;">Jane Doe</span>
      </div>
    </ts-sidebar>
    <div style="flex: 1; padding: var(--ts-spacing-6);">
      <h2 style="margin: 0;">Welcome back, Jane</h2>
      <p>Here's what's happening with your projects today.</p>
    </div>
  </div>
`;
