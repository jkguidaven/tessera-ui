// Hand-written stories for ts-button

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The button\'s visual variant.',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'The button\'s visual weight / appearance.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The button\'s size.',
    },
    disabled: { control: 'boolean', description: 'Renders the button in a disabled state.' },
    loading: { control: 'boolean', description: 'Renders a loading spinner and disables the button.' },
    block: { control: 'boolean', description: 'Makes the button take the full width of its container.' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type attribute for the native button.',
    },
    href: { control: 'text', description: 'An optional href — renders an anchor instead of a button.' },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Target attribute when href is set.',
    },
    slotContent: { control: 'text', description: 'Button label text' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined && args.variant !== null) attrs.push(`variant="${args.variant}"`);
  if (args.appearance !== undefined && args.appearance !== null) attrs.push(`appearance="${args.appearance}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.loading) attrs.push('loading');
  if (args.block) attrs.push('block');
  if (args.type !== undefined && args.type !== null) attrs.push(`type="${args.type}"`);
  if (args.href !== undefined && args.href !== null && args.href !== '') attrs.push(`href="${args.href}"`);
  if (args.target !== undefined && args.target !== null) attrs.push(`target="${args.target}"`);
  return `<ts-button ${attrs.join(' ')}>${args.slotContent || 'Save Changes'}</ts-button>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
    type: 'button',
    slotContent: 'Save Changes',
  },
});

export const Variants = () => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button variant="primary">Primary</ts-button>
    <ts-button variant="secondary">Secondary</ts-button>
    <ts-button variant="success">Publish Now</ts-button>
    <ts-button variant="warning">Proceed Anyway</ts-button>
    <ts-button variant="danger">Delete Account</ts-button>
    <ts-button variant="info">Learn More</ts-button>
    <ts-button variant="neutral">Cancel</ts-button>
  </div>
`;

export const Sizes = () => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button size="xs">Extra Small</ts-button>
    <ts-button size="sm">Small</ts-button>
    <ts-button size="md">Medium</ts-button>
    <ts-button size="lg">Large</ts-button>
    <ts-button size="xl">Extra Large</ts-button>
  </div>
`;

export const Appearances = () => `
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Solid</p>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ts-button appearance="solid" variant="primary">Save Changes</ts-button>
        <ts-button appearance="solid" variant="danger">Delete</ts-button>
        <ts-button appearance="solid" variant="neutral">Cancel</ts-button>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Outline</p>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ts-button appearance="outline" variant="primary">Edit Profile</ts-button>
        <ts-button appearance="outline" variant="danger">Remove Item</ts-button>
        <ts-button appearance="outline" variant="neutral">View Details</ts-button>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Ghost</p>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ts-button appearance="ghost" variant="primary">Settings</ts-button>
        <ts-button appearance="ghost" variant="neutral">More Options</ts-button>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Link</p>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ts-button appearance="link" variant="primary">Forgot Password?</ts-button>
        <ts-button appearance="link" variant="primary">View Documentation</ts-button>
      </div>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <ts-button>Default</ts-button>
      <ts-button disabled>Disabled</ts-button>
      <ts-button loading>Saving...</ts-button>
      <ts-button loading variant="danger">Deleting...</ts-button>
    </div>
    <div>
      <ts-button block>Full Width Submit</ts-button>
    </div>
    <div>
      <ts-button block loading>Processing Payment...</ts-button>
    </div>
  </div>
`;

export const WithIcons = () => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button variant="primary">
      <ts-icon slot="prefix" name="plus" size="sm"></ts-icon>
      New Project
    </ts-button>
    <ts-button variant="danger">
      <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
      Delete
    </ts-button>
    <ts-button appearance="outline" variant="neutral">
      <ts-icon slot="prefix" name="download" size="sm"></ts-icon>
      Export CSV
    </ts-button>
    <ts-button variant="success">
      <ts-icon slot="prefix" name="check" size="sm"></ts-icon>
      Approve
    </ts-button>
    <ts-button appearance="ghost" variant="primary">
      Settings
      <ts-icon slot="suffix" name="chevron-right" size="sm"></ts-icon>
    </ts-button>
    <ts-button appearance="outline" variant="primary">
      <ts-icon slot="prefix" name="log-in" size="sm"></ts-icon>
      Sign In
    </ts-button>
  </div>
`;

export const AsLink = () => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button href="https://example.com" target="_blank">
      Visit Website
      <ts-icon slot="suffix" name="external-link" size="sm"></ts-icon>
    </ts-button>
    <ts-button href="https://example.com/docs" appearance="outline" variant="neutral">
      <ts-icon slot="prefix" name="book-open" size="sm"></ts-icon>
      Documentation
    </ts-button>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
      <ts-button variant="primary">
        <ts-icon slot="prefix" name="save" size="sm"></ts-icon>
        Save Changes
      </ts-button>
    </div>

    <ts-card bordered>
      <span slot="header"><h3 style="margin: 0;">Danger Zone</h3></span>
      <p style="margin: 0; color: var(--ts-color-text-secondary);">Once you delete your account, there is no going back. Please be certain.</p>
      <span slot="footer">
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <ts-button variant="danger" appearance="outline">
            <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
            Delete Account
          </ts-button>
        </div>
      </span>
    </ts-card>

    <div style="display: flex; gap: 8px;">
      <ts-button size="sm" appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="chevron-left" size="sm"></ts-icon>
        Back
      </ts-button>
      <div style="flex: 1;"></div>
      <ts-button size="sm" appearance="outline" variant="neutral">Skip</ts-button>
      <ts-button size="sm" variant="primary">
        Continue
        <ts-icon slot="suffix" name="chevron-right" size="sm"></ts-icon>
      </ts-button>
    </div>
  </div>
`;
