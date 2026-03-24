// Hand-written stories for ts-modal

export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Whether the modal is open.' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The modal\'s width size preset.',
    },
    label: { control: 'text', description: 'Label for accessibility (used as aria-label).' },
    closeOnOverlay: { control: 'boolean', description: 'Whether clicking the overlay closes the modal.' },
    closeOnEscape: { control: 'boolean', description: 'Whether pressing Escape closes the modal.' },
    showClose: { control: 'boolean', description: 'Whether to show the close button.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.open) attrs.push('open');
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.label !== undefined && args.label !== null && args.label !== '') attrs.push(`label="${args.label}"`);
  if (args.closeOnOverlay === false) attrs.push('close-on-overlay="false"');
  if (args.closeOnEscape === false) attrs.push('close-on-escape="false"');
  if (args.showClose === false) attrs.push('show-close="false"');
  return `
    <ts-button variant="primary" onclick="this.nextElementSibling.open = true">Open Modal</ts-button>
    <ts-modal ${attrs.join(' ')}>
      <span slot="header"><h3 style="margin: 0;">Edit Profile</h3></span>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-input label="Display Name" value="Sarah Chen" placeholder="Enter your name"></ts-input>
        <ts-input label="Email" type="email" value="sarah@example.com" placeholder="Enter your email"></ts-input>
      </div>
      <span slot="footer">
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
          <ts-button variant="primary">Save Changes</ts-button>
        </div>
      </span>
    </ts-modal>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    open: false,
    size: 'md',
    label: 'Edit Profile',
    closeOnOverlay: true,
    closeOnEscape: true,
    showClose: true,
  },
});

export const Sizes = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('modal-xs').open = true">Extra Small</ts-button>
    <ts-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('modal-sm').open = true">Small</ts-button>
    <ts-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('modal-md').open = true">Medium</ts-button>
    <ts-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('modal-lg').open = true">Large</ts-button>
    <ts-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('modal-xl').open = true">Extra Large</ts-button>
  </div>

  <ts-modal id="modal-xs" size="xs" label="Extra Small Modal">
    <span slot="header"><h3 style="margin: 0;">Quick Confirm</h3></span>
    <p style="margin: 0;">Are you sure?</p>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button size="sm" appearance="outline" variant="neutral">No</ts-button>
        <ts-button size="sm" variant="primary">Yes</ts-button>
      </div>
    </span>
  </ts-modal>

  <ts-modal id="modal-sm" size="sm" label="Small Modal">
    <span slot="header"><h3 style="margin: 0;">Rename File</h3></span>
    <ts-input label="File Name" value="quarterly-report.pdf"></ts-input>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button size="sm" appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button size="sm" variant="primary">Rename</ts-button>
      </div>
    </span>
  </ts-modal>

  <ts-modal id="modal-md" size="md" label="Medium Modal">
    <span slot="header"><h3 style="margin: 0;">Create New Project</h3></span>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ts-input label="Project Name" placeholder="My Awesome Project"></ts-input>
      <ts-input label="Description" placeholder="A brief description of the project"></ts-input>
    </div>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button variant="primary">Create Project</ts-button>
      </div>
    </span>
  </ts-modal>

  <ts-modal id="modal-lg" size="lg" label="Large Modal">
    <span slot="header"><h3 style="margin: 0;">User Preferences</h3></span>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ts-input label="Display Name" placeholder="Your name"></ts-input>
      <ts-input label="Email" type="email" placeholder="you@example.com"></ts-input>
      <ts-input label="Organization" placeholder="Company name"></ts-input>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ts-toggle>Enable email notifications</ts-toggle>
        <ts-toggle checked>Enable dark mode</ts-toggle>
      </div>
    </div>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button variant="primary">Save Preferences</ts-button>
      </div>
    </span>
  </ts-modal>

  <ts-modal id="modal-xl" size="xl" label="Extra Large Modal">
    <span slot="header"><h3 style="margin: 0;">Dashboard Overview</h3></span>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <ts-card bordered style="flex: 1; min-width: 200px;">
        <div style="text-align: center;">
          <div style="font-size: 32px; font-weight: 700; color: var(--ts-color-primary-600);">2,847</div>
          <div style="color: var(--ts-color-text-secondary);">Total Users</div>
        </div>
      </ts-card>
      <ts-card bordered style="flex: 1; min-width: 200px;">
        <div style="text-align: center;">
          <div style="font-size: 32px; font-weight: 700; color: var(--ts-color-success-600);">$12,459</div>
          <div style="color: var(--ts-color-text-secondary);">Revenue</div>
        </div>
      </ts-card>
      <ts-card bordered style="flex: 1; min-width: 200px;">
        <div style="text-align: center;">
          <div style="font-size: 32px; font-weight: 700; color: var(--ts-color-warning-600);">94%</div>
          <div style="color: var(--ts-color-text-secondary);">Uptime</div>
        </div>
      </ts-card>
    </div>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end;">
        <ts-button appearance="outline" variant="neutral">Close</ts-button>
      </div>
    </span>
  </ts-modal>
`;

export const States = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-button variant="danger" onclick="document.getElementById('modal-confirm-delete').open = true">
      <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
      Delete Account
    </ts-button>
    <ts-button variant="primary" onclick="document.getElementById('modal-no-close').open = true">
      Non-dismissible Modal
    </ts-button>
  </div>

  <ts-modal id="modal-confirm-delete" size="sm" label="Confirm Deletion">
    <span slot="header"><h3 style="margin: 0; color: var(--ts-color-danger-600);">Delete Account</h3></span>
    <div>
      <ts-alert variant="danger">This action cannot be undone. All your data will be permanently removed.</ts-alert>
      <div style="margin-top: 16px;">
        <ts-input label="Type DELETE to confirm" placeholder="DELETE" error=""></ts-input>
      </div>
    </div>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button variant="danger">
          <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
          Delete Forever
        </ts-button>
      </div>
    </span>
  </ts-modal>

  <ts-modal id="modal-no-close" size="sm" label="Terms and Conditions" close-on-overlay="false" close-on-escape="false" show-close="false">
    <span slot="header"><h3 style="margin: 0;">Accept Terms</h3></span>
    <p style="margin: 0;">You must accept the terms and conditions to continue using this service. Please review our updated privacy policy.</p>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <ts-button appearance="outline" variant="neutral" onclick="document.getElementById('modal-no-close').open = false">Decline</ts-button>
        <ts-button variant="primary" onclick="document.getElementById('modal-no-close').open = false">Accept</ts-button>
      </div>
    </span>
  </ts-modal>
`;

export const Composition = (): string => `
  <ts-button variant="primary" onclick="document.getElementById('modal-compose').open = true">
    <ts-icon slot="prefix" name="plus" size="sm"></ts-icon>
    Add Team Member
  </ts-button>

  <ts-modal id="modal-compose" size="md" label="Add Team Member">
    <span slot="header">
      <div style="display: flex; align-items: center; gap: 8px;">
        <ts-icon name="user-plus" size="sm"></ts-icon>
        <h3 style="margin: 0;">Add Team Member</h3>
      </div>
    </span>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px;">
        <ts-input label="First Name" placeholder="Jane" style="flex: 1;"></ts-input>
        <ts-input label="Last Name" placeholder="Doe" style="flex: 1;"></ts-input>
      </div>
      <ts-input label="Email Address" type="email" placeholder="jane@company.com" required>
        <ts-icon slot="prefix" name="mail" size="sm"></ts-icon>
      </ts-input>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <span style="font-weight: 600; font-size: 14px;">Permissions</span>
        <ts-toggle>Can edit projects</ts-toggle>
        <ts-toggle>Can manage team members</ts-toggle>
        <ts-toggle checked>Can view analytics</ts-toggle>
      </div>
      <ts-alert variant="info">An invitation email will be sent to the provided address.</ts-alert>
    </div>
    <span slot="footer">
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
        <ts-button variant="primary">
          <ts-icon slot="prefix" name="send" size="sm"></ts-icon>
          Send Invitation
        </ts-button>
      </div>
    </span>
  </ts-modal>
`;
