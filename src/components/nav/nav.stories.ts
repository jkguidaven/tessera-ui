// Hand-written stories for ts-nav

export default {
  title: 'Components/Nav',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['sidebar', 'horizontal'],
      description: 'The navigation layout variant.',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar nav is collapsed (icons only).',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.collapsed) attrs.push('collapsed');
  return `
    <ts-nav ${attrs.join(' ')}>
      <ts-nav-item icon="layout-dashboard" active>Dashboard</ts-nav-item>
      <ts-nav-item icon="users">Users</ts-nav-item>
      <ts-nav-item icon="settings">Settings</ts-nav-item>
      <ts-nav-item icon="bar-chart-2">Reports</ts-nav-item>
    </ts-nav>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'sidebar',
    collapsed: false,
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Sidebar variant</p>
      <div style="width: 240px;">
        <ts-nav variant="sidebar">
          <ts-nav-item icon="layout-dashboard" active>Dashboard</ts-nav-item>
          <ts-nav-item icon="users">Users</ts-nav-item>
          <ts-nav-item icon="settings">Settings</ts-nav-item>
          <ts-nav-item icon="bar-chart-2">Reports</ts-nav-item>
        </ts-nav>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Horizontal variant</p>
      <ts-nav variant="horizontal">
        <ts-nav-item active>Dashboard</ts-nav-item>
        <ts-nav-item>Users</ts-nav-item>
        <ts-nav-item>Settings</ts-nav-item>
        <ts-nav-item>Reports</ts-nav-item>
      </ts-nav>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Expanded sidebar</p>
      <div style="width: 240px;">
        <ts-nav variant="sidebar">
          <ts-nav-item icon="layout-dashboard" active>Dashboard</ts-nav-item>
          <ts-nav-item icon="users">Users</ts-nav-item>
          <ts-nav-item icon="settings" disabled>Settings</ts-nav-item>
          <ts-nav-item icon="bar-chart-2">Reports</ts-nav-item>
        </ts-nav>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Collapsed sidebar (icons only)</p>
      <div style="width: 64px;">
        <ts-nav variant="sidebar" collapsed>
          <ts-nav-item icon="layout-dashboard" active>Dashboard</ts-nav-item>
          <ts-nav-item icon="users">Users</ts-nav-item>
          <ts-nav-item icon="settings">Settings</ts-nav-item>
          <ts-nav-item icon="bar-chart-2">Reports</ts-nav-item>
        </ts-nav>
      </div>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; border: 1px solid #e2e8f0; border-radius: 8px; height: 400px; overflow: hidden;">
    <div style="width: 240px; border-right: 1px solid #e2e8f0; padding: 16px 0; background: #f8fafc;">
      <div style="padding: 0 16px 16px; font-family: sans-serif; font-weight: 700; font-size: 18px;">Acme App</div>
      <ts-nav variant="sidebar">
        <ts-nav-item icon="layout-dashboard" active href="#">Dashboard</ts-nav-item>
        <ts-nav-item icon="users" href="#">Users</ts-nav-item>
        <ts-nav-item icon="file-text" href="#">Documents</ts-nav-item>
        <ts-nav-item icon="bar-chart-2" href="#">Analytics</ts-nav-item>
        <ts-nav-item icon="settings" href="#">Settings</ts-nav-item>
      </ts-nav>
    </div>
    <div style="flex: 1; padding: 24px; font-family: sans-serif;">
      <h2 style="margin: 0 0 8px;">Dashboard</h2>
      <p style="color: #666;">Welcome back! Here is an overview of your activity.</p>
    </div>
  </div>
`;
