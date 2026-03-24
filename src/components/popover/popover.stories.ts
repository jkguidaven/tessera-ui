// Hand-written stories for ts-popover

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the popover is currently visible.',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Placement of the popover relative to the trigger.',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: 'How the popover is triggered.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the popover closes on outside click or Escape.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.open) attrs.push('open');
  if (args.placement !== undefined) attrs.push(`placement="${args.placement}"`);
  if (args.trigger !== undefined) attrs.push(`trigger="${args.trigger}"`);
  if (args.dismissible !== undefined && !args.dismissible) attrs.push('dismissible="false"');
  return `
    <div style="display: flex; justify-content: center; padding: 100px 0;">
      <ts-popover ${attrs.join(' ')}>
        <ts-button slot="trigger">Click me</ts-button>
        <div style="padding: 16px; max-width: 240px;">
          <h4 style="margin: 0 0 8px; font-family: sans-serif;">Popover Title</h4>
          <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #666;">
            This is a rich content popover with some helpful information.
          </p>
        </div>
      </ts-popover>
    </div>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    open: false,
    placement: 'bottom',
    trigger: 'click',
    dismissible: true,
  },
});

export const Variants = () => `
  <div style="display: flex; gap: 24px; justify-content: center; padding: 120px 0;">
    <ts-popover placement="top" trigger="click">
      <ts-button slot="trigger" appearance="outline">Top</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Popover on top</div>
    </ts-popover>
    <ts-popover placement="bottom" trigger="click">
      <ts-button slot="trigger" appearance="outline">Bottom</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Popover on bottom</div>
    </ts-popover>
    <ts-popover placement="left" trigger="click">
      <ts-button slot="trigger" appearance="outline">Left</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Popover on left</div>
    </ts-popover>
    <ts-popover placement="right" trigger="click">
      <ts-button slot="trigger" appearance="outline">Right</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Popover on right</div>
    </ts-popover>
  </div>
`;

export const States = () => `
  <div style="display: flex; gap: 24px; justify-content: center; padding: 120px 0;">
    <ts-popover trigger="click">
      <ts-button slot="trigger">Click trigger</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Opened by click</div>
    </ts-popover>
    <ts-popover trigger="hover">
      <ts-button slot="trigger" appearance="outline">Hover trigger</ts-button>
      <div style="padding: 12px; font-family: sans-serif;">Opened by hover</div>
    </ts-popover>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; justify-content: center; padding: 80px 0 200px;">
    <ts-popover placement="bottom-start" trigger="click">
      <ts-button slot="trigger" variant="primary">User Profile</ts-button>
      <div style="padding: 16px; min-width: 240px; font-family: sans-serif;">
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
          <ts-avatar name="Jane Doe" size="md"></ts-avatar>
          <div>
            <div style="font-weight: 600;">Jane Doe</div>
            <div style="font-size: 13px; color: #666;">jane@example.com</div>
          </div>
        </div>
        <ts-divider></ts-divider>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
          <ts-button appearance="ghost" block size="sm">View Profile</ts-button>
          <ts-button appearance="ghost" block size="sm">Settings</ts-button>
          <ts-button appearance="ghost" block size="sm" variant="danger">Sign out</ts-button>
        </div>
      </div>
    </ts-popover>
  </div>
`;
