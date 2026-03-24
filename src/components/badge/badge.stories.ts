// Hand-written stories for ts-badge

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The badge\'s color variant.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The badge\'s size.',
    },
    pill: { control: 'boolean', description: 'Renders the badge with rounded-pill shape.' },
    dot: { control: 'boolean', description: 'Renders the badge as a small dot indicator (content is hidden).' },
    outline: { control: 'boolean', description: 'Renders an outlined style instead of solid.' },
    slotContent: { control: 'text', description: 'Badge label text' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.variant !== undefined && args.variant !== null) attrs.push(`variant="${args.variant}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.pill) attrs.push('pill');
  if (args.dot) attrs.push('dot');
  if (args.outline) attrs.push('outline');
  return `<ts-badge ${attrs.join(' ')}>${args.slotContent || 'Badge'}</ts-badge>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'primary',
    size: 'md',
    pill: false,
    dot: false,
    outline: false,
    slotContent: 'New',
  },
});

export const Variants = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-badge variant="primary">Primary</ts-badge>
    <ts-badge variant="secondary">Secondary</ts-badge>
    <ts-badge variant="success">Success</ts-badge>
    <ts-badge variant="warning">Warning</ts-badge>
    <ts-badge variant="danger">Danger</ts-badge>
    <ts-badge variant="info">Info</ts-badge>
    <ts-badge variant="neutral">Neutral</ts-badge>
  </div>
`;

export const Sizes = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-badge size="xs">Extra Small</ts-badge>
    <ts-badge size="sm">Small</ts-badge>
    <ts-badge size="md">Medium</ts-badge>
    <ts-badge size="lg">Large</ts-badge>
    <ts-badge size="xl">Extra Large</ts-badge>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Solid (default)</p>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <ts-badge variant="primary">Active</ts-badge>
        <ts-badge variant="success">Completed</ts-badge>
        <ts-badge variant="warning">Pending</ts-badge>
        <ts-badge variant="danger">Failed</ts-badge>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Outline</p>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <ts-badge variant="primary" outline>Active</ts-badge>
        <ts-badge variant="success" outline>Completed</ts-badge>
        <ts-badge variant="warning" outline>Pending</ts-badge>
        <ts-badge variant="danger" outline>Failed</ts-badge>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Pill</p>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <ts-badge variant="primary" pill>12</ts-badge>
        <ts-badge variant="danger" pill>99+</ts-badge>
        <ts-badge variant="success" pill>Online</ts-badge>
        <ts-badge variant="neutral" pill>Draft</ts-badge>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Dot Indicator</p>
      <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <ts-badge variant="success" dot></ts-badge> Online
        </span>
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <ts-badge variant="warning" dot></ts-badge> Away
        </span>
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <ts-badge variant="danger" dot></ts-badge> Busy
        </span>
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <ts-badge variant="neutral" dot></ts-badge> Offline
        </span>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-weight: 600; color: var(--ts-color-text-secondary);">Outline + Pill</p>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <ts-badge variant="primary" outline pill>v2.1.0</ts-badge>
        <ts-badge variant="info" outline pill>Beta</ts-badge>
        <ts-badge variant="warning" outline pill>Experimental</ts-badge>
        <ts-badge variant="neutral" outline pill>Archived</ts-badge>
      </div>
    </div>
  </div>
`;

export const WithIcons = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <span style="display: inline-flex; align-items: center; gap: 6px;">
      <ts-icon name="bell" size="sm"></ts-icon>
      Notifications
      <ts-badge variant="danger" pill size="sm">5</ts-badge>
    </span>
    <span style="display: inline-flex; align-items: center; gap: 6px;">
      <ts-icon name="mail" size="sm"></ts-icon>
      Messages
      <ts-badge variant="primary" pill size="sm">23</ts-badge>
    </span>
    <span style="display: inline-flex; align-items: center; gap: 6px;">
      <ts-icon name="git-pull-request" size="sm"></ts-icon>
      Pull Requests
      <ts-badge variant="success" pill size="sm">2</ts-badge>
    </span>
  </div>
`;

export const Composition = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
    <ts-card bordered>
      <span slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">Deployments</h3>
          <ts-badge variant="success" pill size="sm">3 active</ts-badge>
        </div>
      </span>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Production</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">main @ a1b2c3d</div>
          </div>
          <ts-badge variant="success" pill size="sm">Live</ts-badge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Staging</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">develop @ e4f5g6h</div>
          </div>
          <ts-badge variant="info" pill size="sm">Building</ts-badge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Preview</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">feature/auth @ i7j8k9l</div>
          </div>
          <ts-badge variant="warning" pill size="sm">Queued</ts-badge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Canary</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">release/v3 @ m0n1o2p</div>
          </div>
          <ts-badge variant="danger" pill size="sm">Failed</ts-badge>
        </div>
      </div>
    </ts-card>

    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <ts-badge variant="primary" outline pill>React</ts-badge>
      <ts-badge variant="success" outline pill>Node.js</ts-badge>
      <ts-badge variant="info" outline pill>TypeScript</ts-badge>
      <ts-badge variant="warning" outline pill>GraphQL</ts-badge>
      <ts-badge variant="danger" outline pill>Redis</ts-badge>
      <ts-badge variant="neutral" outline pill>Docker</ts-badge>
    </div>
  </div>
`;
