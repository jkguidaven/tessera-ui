// Hand-written stories for ts-dialog

export default {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Whether the dialog is open.' },
    heading: { control: 'text', description: 'The dialog heading text.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "The dialog's width size preset.",
    },
    dismissible: { control: 'boolean', description: 'Whether the dialog can be dismissed via close button, Escape, or overlay click.' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.open) attrs.push('open');
  if (args.heading !== undefined && args.heading !== null) attrs.push(`heading="${args.heading}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.dismissible === false) attrs.push('dismissible="false"');
  return `
    <ts-button onclick="this.nextElementSibling.show()">Open Dialog</ts-button>
    <ts-dialog ${attrs.join(' ')}>
      <p style="margin: 0; font-family: sans-serif;">This is the dialog body content. You can place any content here.</p>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Cancel</ts-button>
        <ts-button variant="primary" onclick="this.closest('ts-dialog').close()">Confirm</ts-button>
      </div>
    </ts-dialog>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    open: false,
    heading: 'Dialog Title',
    size: 'sm',
    dismissible: true,
  },
});

export const Sizes = () => `
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <div>
      <ts-button onclick="this.nextElementSibling.show()">Small Dialog</ts-button>
      <ts-dialog heading="Small Dialog" size="sm">
        <p style="margin: 0; font-family: sans-serif;">This is a small dialog, suitable for simple confirmations.</p>
        <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
          <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Close</ts-button>
        </div>
      </ts-dialog>
    </div>
    <div>
      <ts-button onclick="this.nextElementSibling.show()">Medium Dialog</ts-button>
      <ts-dialog heading="Medium Dialog" size="md">
        <p style="margin: 0; font-family: sans-serif;">This is a medium dialog with more room for content. It works well for forms and moderate amounts of information.</p>
        <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
          <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Close</ts-button>
        </div>
      </ts-dialog>
    </div>
    <div>
      <ts-button onclick="this.nextElementSibling.show()">Large Dialog</ts-button>
      <ts-dialog heading="Large Dialog" size="lg">
        <p style="margin: 0; font-family: sans-serif;">This is a large dialog, ideal for complex content like data tables, multi-step forms, or detailed previews.</p>
        <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
          <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Close</ts-button>
        </div>
      </ts-dialog>
    </div>
  </div>
`;

export const DeleteConfirmation = () => `
  <ts-button variant="danger" onclick="this.nextElementSibling.show()">Delete Item</ts-button>
  <ts-dialog heading="Delete this item?" size="sm">
    <p style="margin: 0; font-family: sans-serif; color: #555;">
      Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.
    </p>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Cancel</ts-button>
      <ts-button variant="danger" onclick="this.closest('ts-dialog').close()">Delete</ts-button>
    </div>
  </ts-dialog>
`;

export const UnsavedChanges = () => `
  <ts-button onclick="this.nextElementSibling.show()">Leave Page</ts-button>
  <ts-dialog heading="Unsaved changes" size="sm">
    <p style="margin: 0; font-family: sans-serif; color: #555;">
      You have unsaved changes. If you leave this page, your changes will be lost. Would you like to save before leaving?
    </p>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Discard</ts-button>
      <ts-button variant="primary" onclick="this.closest('ts-dialog').close()">Save Changes</ts-button>
    </div>
  </ts-dialog>
`;

export const NonDismissible = () => `
  <ts-button onclick="this.nextElementSibling.show()">Open Non-Dismissible</ts-button>
  <ts-dialog heading="Terms of Service" size="md" dismissible="false">
    <div style="font-family: sans-serif; color: #555;">
      <p style="margin: 0 0 12px;">Please read and accept the terms of service to continue using this application.</p>
      <div style="padding: 12px; background: #f9fafb; border-radius: 6px; max-height: 150px; overflow-y: auto; font-size: 14px;">
        <p style="margin: 0 0 8px;">1. You agree to use this software responsibly.</p>
        <p style="margin: 0 0 8px;">2. You will not share your credentials with others.</p>
        <p style="margin: 0 0 8px;">3. Data uploaded remains your intellectual property.</p>
        <p style="margin: 0;">4. We reserve the right to update these terms.</p>
      </div>
    </div>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <ts-button variant="primary" onclick="this.closest('ts-dialog').close()">I Accept</ts-button>
    </div>
  </ts-dialog>
`;

export const FormDialog = () => `
  <ts-button onclick="this.nextElementSibling.show()">Edit Profile</ts-button>
  <ts-dialog heading="Edit Profile" size="md">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ts-input label="Full Name" placeholder="Enter your name" value="James Kennedy"></ts-input>
      <ts-input label="Email" placeholder="Enter your email" value="james@example.com"></ts-input>
      <ts-textarea label="Bio" placeholder="Tell us about yourself..." rows="3"></ts-textarea>
    </div>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <ts-button appearance="outline" onclick="this.closest('ts-dialog').close()">Cancel</ts-button>
      <ts-button variant="primary" onclick="this.closest('ts-dialog').close()">Save</ts-button>
    </div>
  </ts-dialog>
`;
