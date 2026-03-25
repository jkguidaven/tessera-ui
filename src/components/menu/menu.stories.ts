// Hand-written stories for ts-menu

export default {
  title: 'Components/Menu',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Whether the menu dropdown is open.' },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How the menu is triggered.',
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Placement of the dropdown relative to the trigger.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.open) attrs.push('open');
  if (args.trigger !== undefined && args.trigger !== null) attrs.push(`trigger="${args.trigger}"`);
  if (args.placement !== undefined && args.placement !== null) attrs.push(`placement="${args.placement}"`);
  return `
    <ts-menu ${attrs.join(' ')}>
      <ts-button slot="trigger">Actions</ts-button>
      <ts-menu-item value="edit">Edit</ts-menu-item>
      <ts-menu-item value="duplicate">Duplicate</ts-menu-item>
      <ts-menu-item value="archive">Archive</ts-menu-item>
      <ts-menu-item value="delete">Delete</ts-menu-item>
    </ts-menu>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    open: false,
    trigger: 'click',
    placement: 'bottom-start',
  },
});

export const Placements = (): string => `
  <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 80px 20px;">
    <ts-menu placement="bottom-start">
      <ts-button slot="trigger">Bottom Start</ts-button>
      <ts-menu-item value="one">Option One</ts-menu-item>
      <ts-menu-item value="two">Option Two</ts-menu-item>
      <ts-menu-item value="three">Option Three</ts-menu-item>
    </ts-menu>
    <ts-menu placement="bottom-end">
      <ts-button slot="trigger">Bottom End</ts-button>
      <ts-menu-item value="one">Option One</ts-menu-item>
      <ts-menu-item value="two">Option Two</ts-menu-item>
      <ts-menu-item value="three">Option Three</ts-menu-item>
    </ts-menu>
    <ts-menu placement="top-start">
      <ts-button slot="trigger">Top Start</ts-button>
      <ts-menu-item value="one">Option One</ts-menu-item>
      <ts-menu-item value="two">Option Two</ts-menu-item>
      <ts-menu-item value="three">Option Three</ts-menu-item>
    </ts-menu>
    <ts-menu placement="top-end">
      <ts-button slot="trigger">Top End</ts-button>
      <ts-menu-item value="one">Option One</ts-menu-item>
      <ts-menu-item value="two">Option Two</ts-menu-item>
      <ts-menu-item value="three">Option Three</ts-menu-item>
    </ts-menu>
  </div>
`;

export const WithDisabledItems = (): string => `
  <ts-menu>
    <ts-button slot="trigger">File Actions</ts-button>
    <ts-menu-item value="edit">Edit</ts-menu-item>
    <ts-menu-item value="duplicate">Duplicate</ts-menu-item>
    <ts-menu-item value="move" disabled>Move (no permission)</ts-menu-item>
    <ts-menu-item value="archive">Archive</ts-menu-item>
    <ts-menu-item value="delete" disabled>Delete (locked)</ts-menu-item>
  </ts-menu>
`;

export const HoverTrigger = (): string => `
  <ts-menu trigger="hover">
    <ts-button slot="trigger">Hover Me</ts-button>
    <ts-menu-item value="profile">Profile</ts-menu-item>
    <ts-menu-item value="settings">Settings</ts-menu-item>
    <ts-menu-item value="help">Help Center</ts-menu-item>
    <ts-menu-item value="logout">Log Out</ts-menu-item>
  </ts-menu>
`;

export const WithLinks = (): string => `
  <ts-menu>
    <ts-button slot="trigger">Navigate</ts-button>
    <ts-menu-item value="docs" href="https://example.com/docs">Documentation</ts-menu-item>
    <ts-menu-item value="api" href="https://example.com/api">API Reference</ts-menu-item>
    <ts-menu-item value="changelog" href="https://example.com/changelog">Changelog</ts-menu-item>
    <ts-menu-item value="support" href="https://example.com/support">Support</ts-menu-item>
  </ts-menu>
`;

export const ContextMenu = (): string => `
  <div style="display: flex; gap: 16px;">
    <ts-menu placement="bottom-end">
      <ts-button slot="trigger" appearance="ghost" size="sm">...</ts-button>
      <ts-menu-item value="edit">Edit</ts-menu-item>
      <ts-menu-item value="duplicate">Duplicate</ts-menu-item>
      <ts-menu-item value="archive">Archive</ts-menu-item>
      <ts-menu-item value="delete">Delete</ts-menu-item>
    </ts-menu>
  </div>
`;

export const UserMenu = (): string => `
  <ts-menu placement="bottom-end">
    <ts-button slot="trigger" appearance="ghost">
      <div style="display: flex; align-items: center; gap: 8px;">
        <ts-avatar name="James Kennedy" color="#6366f1" size="xs"></ts-avatar>
        <span>James Kennedy</span>
      </div>
    </ts-button>
    <ts-menu-item value="profile">My Profile</ts-menu-item>
    <ts-menu-item value="settings">Account Settings</ts-menu-item>
    <ts-menu-item value="billing">Billing</ts-menu-item>
    <ts-menu-item value="team">Team Management</ts-menu-item>
    <ts-menu-item value="logout">Sign Out</ts-menu-item>
  </ts-menu>
`;

export const WithDividers = (): string => `
  <ts-menu>
    <ts-button slot="trigger" appearance="outline" variant="neutral">File</ts-button>
    <ts-menu-item value="new">New File</ts-menu-item>
    <ts-menu-item value="open">Open...</ts-menu-item>
    <ts-menu-item value="save">Save</ts-menu-item>
    <ts-menu-divider></ts-menu-divider>
    <ts-menu-item value="export">Export As...</ts-menu-item>
    <ts-menu-item value="print">Print</ts-menu-item>
    <ts-menu-divider></ts-menu-divider>
    <ts-menu-item value="close" variant="danger">Close Project</ts-menu-item>
  </ts-menu>
`;

export const CheckboxItems = (): string => `
  <ts-menu>
    <ts-button slot="trigger" appearance="outline" variant="neutral">View Options</ts-button>
    <ts-menu-item type="checkbox" value="sidebar" checked>Show Sidebar</ts-menu-item>
    <ts-menu-item type="checkbox" value="statusbar" checked>Show Status Bar</ts-menu-item>
    <ts-menu-item type="checkbox" value="minimap">Show Minimap</ts-menu-item>
    <ts-menu-divider></ts-menu-divider>
    <ts-menu-item type="checkbox" value="wordwrap">Word Wrap</ts-menu-item>
  </ts-menu>
`;

export const DangerItem = (): string => `
  <ts-menu>
    <ts-button slot="trigger" appearance="outline" variant="neutral">Actions</ts-button>
    <ts-menu-item value="edit">
      <ts-icon slot="prefix" name="pencil" size="sm"></ts-icon>
      Edit
    </ts-menu-item>
    <ts-menu-item value="duplicate">
      <ts-icon slot="prefix" name="copy" size="sm"></ts-icon>
      Duplicate
    </ts-menu-item>
    <ts-menu-divider></ts-menu-divider>
    <ts-menu-item value="delete" variant="danger">
      <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
      Delete
      <span slot="suffix">⌘⌫</span>
    </ts-menu-item>
  </ts-menu>
`;
