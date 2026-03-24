// Hand-written stories for ts-drawer

export default {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is open.',
    },
    placement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Which edge the drawer slides in from.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The drawer\'s width/height preset.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether clicking the overlay or pressing Escape closes the drawer.',
    },
    heading: {
      control: 'text',
      description: 'Accessible heading for the drawer.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.open) attrs.push('open');
  if (args.placement !== undefined) attrs.push(`placement="${args.placement}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.dismissible !== undefined && !args.dismissible) {
    // dismissible defaults to true
  } else {
    attrs.push('dismissible');
  }
  if (args.heading !== undefined) attrs.push(`heading="${args.heading}"`);
  return `
    <ts-button onclick="this.nextElementSibling.setAttribute('open','')">Open Drawer</ts-button>
    <ts-drawer ${attrs.join(' ')}>
      <p style="font-family: sans-serif; margin: 0;">This is the drawer content area.</p>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <ts-button appearance="outline" onclick="this.closest('ts-drawer').removeAttribute('open')">Cancel</ts-button>
        <ts-button variant="primary" onclick="this.closest('ts-drawer').removeAttribute('open')">Save</ts-button>
      </div>
    </ts-drawer>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    open: false,
    placement: 'end',
    size: 'md',
    dismissible: true,
    heading: 'Settings',
  },
});

export const Sizes = () => `
  <div style="display: flex; gap: 8px;">
    <ts-button appearance="outline" onclick="document.getElementById('drawer-sm').setAttribute('open','')">Small</ts-button>
    <ts-button appearance="outline" onclick="document.getElementById('drawer-md').setAttribute('open','')">Medium</ts-button>
    <ts-button appearance="outline" onclick="document.getElementById('drawer-lg').setAttribute('open','')">Large</ts-button>
    <ts-button appearance="outline" onclick="document.getElementById('drawer-full').setAttribute('open','')">Full</ts-button>
  </div>
  <ts-drawer id="drawer-sm" heading="Small Drawer" size="sm" dismissible>
    <p style="font-family: sans-serif;">Small drawer content.</p>
  </ts-drawer>
  <ts-drawer id="drawer-md" heading="Medium Drawer" size="md" dismissible>
    <p style="font-family: sans-serif;">Medium drawer content.</p>
  </ts-drawer>
  <ts-drawer id="drawer-lg" heading="Large Drawer" size="lg" dismissible>
    <p style="font-family: sans-serif;">Large drawer content.</p>
  </ts-drawer>
  <ts-drawer id="drawer-full" heading="Full Drawer" size="full" dismissible>
    <p style="font-family: sans-serif;">Full-width drawer content.</p>
  </ts-drawer>
`;

export const States = () => `
  <div style="display: flex; gap: 8px;">
    <ts-button onclick="document.getElementById('drawer-start').setAttribute('open','')">From Start</ts-button>
    <ts-button onclick="document.getElementById('drawer-end').setAttribute('open','')">From End</ts-button>
    <ts-button onclick="document.getElementById('drawer-top').setAttribute('open','')">From Top</ts-button>
    <ts-button onclick="document.getElementById('drawer-bottom').setAttribute('open','')">From Bottom</ts-button>
  </div>
  <ts-drawer id="drawer-start" heading="Start Drawer" placement="start" dismissible>
    <p style="font-family: sans-serif;">Slides in from the start (left) edge.</p>
  </ts-drawer>
  <ts-drawer id="drawer-end" heading="End Drawer" placement="end" dismissible>
    <p style="font-family: sans-serif;">Slides in from the end (right) edge.</p>
  </ts-drawer>
  <ts-drawer id="drawer-top" heading="Top Drawer" placement="top" dismissible>
    <p style="font-family: sans-serif;">Slides in from the top edge.</p>
  </ts-drawer>
  <ts-drawer id="drawer-bottom" heading="Bottom Drawer" placement="bottom" dismissible>
    <p style="font-family: sans-serif;">Slides in from the bottom edge.</p>
  </ts-drawer>
`;

export const Composition = () => `
  <ts-button variant="primary" onclick="document.getElementById('drawer-settings').setAttribute('open','')">Open Settings Panel</ts-button>
  <ts-drawer id="drawer-settings" heading="Settings" placement="end" size="md" dismissible>
    <div style="font-family: sans-serif; display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin: 0 0 12px;">Notifications</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <ts-toggle label="Email notifications"></ts-toggle>
          <ts-toggle label="Push notifications"></ts-toggle>
          <ts-toggle label="SMS alerts"></ts-toggle>
        </div>
      </div>
      <ts-divider></ts-divider>
      <div>
        <h4 style="margin: 0 0 12px;">Appearance</h4>
        <ts-select label="Theme" placeholder="Choose theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">System</option>
        </ts-select>
      </div>
      <ts-divider></ts-divider>
      <div>
        <h4 style="margin: 0 0 12px;">Language</h4>
        <ts-select label="Preferred language" placeholder="Select language">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </ts-select>
      </div>
    </div>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <ts-button appearance="outline" onclick="document.getElementById('drawer-settings').removeAttribute('open')">Cancel</ts-button>
      <ts-button variant="primary" onclick="document.getElementById('drawer-settings').removeAttribute('open')">Save Changes</ts-button>
    </div>
  </ts-drawer>
`;
