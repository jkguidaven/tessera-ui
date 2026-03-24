// Hand-written stories for ts-card

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Elevation level controlling the shadow depth.',
    },
    interactive: { control: 'boolean', description: 'Makes the card interactive (hover effect, cursor pointer).' },
    bordered: { control: 'boolean', description: 'Border style variant.' },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size for the card body.',
    },
    slotContent: { control: 'text', description: 'Default slot content' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.elevation !== undefined && args.elevation !== null) attrs.push(`elevation="${args.elevation}"`);
  if (args.interactive) attrs.push('interactive');
  if (args.bordered) attrs.push('bordered');
  if (args.padding !== undefined && args.padding !== null) attrs.push(`padding="${args.padding}"`);
  return `<div style="max-width: 400px;">
    <ts-card ${attrs.join(' ')}>
      ${args.slotContent || '<p style="margin: 0;">Card body content goes here.</p>'}
    </ts-card>
  </div>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    elevation: 'sm',
    interactive: false,
    bordered: false,
    padding: 'md',
    slotContent: '<p style="margin: 0;">This is a basic card with default settings. Cards are versatile containers for grouping related content.</p>',
  },
});

export const Elevations = (): string => `
  <ts-row gap="4" align="start">
    <div style="text-align: center;">
      <ts-card elevation="none" style="width: 160px;">
        <p style="margin: 0; font-size: 14px;">None</p>
      </ts-card>
    </div>
    <div style="text-align: center;">
      <ts-card elevation="sm" style="width: 160px;">
        <p style="margin: 0; font-size: 14px;">Small</p>
      </ts-card>
    </div>
    <div style="text-align: center;">
      <ts-card elevation="md" style="width: 160px;">
        <p style="margin: 0; font-size: 14px;">Medium</p>
      </ts-card>
    </div>
    <div style="text-align: center;">
      <ts-card elevation="lg" style="width: 160px;">
        <p style="margin: 0; font-size: 14px;">Large</p>
      </ts-card>
    </div>
    <div style="text-align: center;">
      <ts-card elevation="xl" style="width: 160px;">
        <p style="margin: 0; font-size: 14px;">Extra Large</p>
      </ts-card>
    </div>
  </ts-row>
`;

export const Padding = (): string => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-card bordered padding="none">
      <p style="margin: 0;">Padding: none</p>
    </ts-card>
    <ts-card bordered padding="sm">
      <p style="margin: 0;">Padding: small</p>
    </ts-card>
    <ts-card bordered padding="md">
      <p style="margin: 0;">Padding: medium</p>
    </ts-card>
    <ts-card bordered padding="lg">
      <p style="margin: 0;">Padding: large</p>
    </ts-card>
  </ts-stack>
`;

export const States = (): string => `
  <ts-row gap="4" align="start">
    <ts-card bordered style="width: 240px;">
      <p style="margin: 0;">Bordered card</p>
    </ts-card>
    <ts-card interactive style="width: 240px;">
      <p style="margin: 0;">Interactive card (hover me)</p>
    </ts-card>
    <ts-card interactive bordered style="width: 240px;">
      <p style="margin: 0;">Interactive + bordered</p>
    </ts-card>
  </ts-row>
`;

export const WithSlots = (): string => `
  <div style="max-width: 400px;">
    <ts-card bordered>
      <span slot="header">
        <ts-row gap="2" justify="between" align="center">
          <h3 style="margin: 0;">Team Members</h3>
          <ts-badge variant="primary" pill>3 online</ts-badge>
        </ts-row>
      </span>
      <ts-stack gap="2">
        <ts-row gap="2">
          <ts-icon name="user" size="sm"></ts-icon>
          <div>
            <div style="font-weight: 600;">Sarah Chen</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Engineering Lead</div>
          </div>
          <ts-badge variant="success" pill size="sm" style="margin-left: auto;">Active</ts-badge>
        </ts-row>
        <ts-row gap="2">
          <ts-icon name="user" size="sm"></ts-icon>
          <div>
            <div style="font-weight: 600;">Alex Rivera</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Product Designer</div>
          </div>
          <ts-badge variant="success" pill size="sm" style="margin-left: auto;">Active</ts-badge>
        </ts-row>
        <ts-row gap="2">
          <ts-icon name="user" size="sm"></ts-icon>
          <div>
            <div style="font-weight: 600;">Jordan Lee</div>
            <div style="font-size: 13px; color: var(--ts-color-text-secondary);">Backend Developer</div>
          </div>
          <ts-badge variant="neutral" pill size="sm" style="margin-left: auto;">Away</ts-badge>
        </ts-row>
      </ts-stack>
      <span slot="footer">
        <ts-row gap="1" justify="end">
          <ts-button size="sm" appearance="ghost" variant="primary">
            <ts-icon slot="prefix" name="user-plus" size="sm"></ts-icon>
            Invite Member
          </ts-button>
        </ts-row>
      </span>
    </ts-card>
  </div>
`;

export const WithMedia = (): string => `
  <ts-grid columns="auto" min-column-width="280px" gap="4">
    <ts-card bordered style="width: 300px;" padding="none">
      <span slot="media">
        <div style="height: 160px; background: linear-gradient(135deg, var(--ts-color-primary-400), var(--ts-color-primary-700)); display: flex; align-items: center; justify-content: center;">
          <ts-icon name="image" size="xl" color="white"></ts-icon>
        </div>
      </span>
      <div style="padding: 16px;">
        <h3 style="margin: 0 0 8px;">Project Aurora</h3>
        <p style="margin: 0; font-size: 14px; color: var(--ts-color-text-secondary);">A next-generation design system built for speed and accessibility.</p>
      </div>
      <span slot="footer">
        <ts-row gap="2" justify="between" style="padding: 0 16px 16px;">
          <ts-badge variant="info" pill size="sm">In Progress</ts-badge>
          <ts-button size="sm" appearance="ghost" variant="primary">View Project</ts-button>
        </ts-row>
      </span>
    </ts-card>

    <ts-card bordered style="width: 300px;" padding="none">
      <span slot="media">
        <div style="height: 160px; background: linear-gradient(135deg, var(--ts-color-success-400), var(--ts-color-success-700)); display: flex; align-items: center; justify-content: center;">
          <ts-icon name="check-circle" size="xl" color="white"></ts-icon>
        </div>
      </span>
      <div style="padding: 16px;">
        <h3 style="margin: 0 0 8px;">Project Nebula</h3>
        <p style="margin: 0; font-size: 14px; color: var(--ts-color-text-secondary);">Analytics dashboard with real-time data visualization and reporting.</p>
      </div>
      <span slot="footer">
        <ts-row gap="2" justify="between" style="padding: 0 16px 16px;">
          <ts-badge variant="success" pill size="sm">Completed</ts-badge>
          <ts-button size="sm" appearance="ghost" variant="primary">View Project</ts-button>
        </ts-row>
      </span>
    </ts-card>
  </ts-grid>
`;

export const Composition = (): string => `
  <ts-stack gap="3" style="max-width: 400px;">
    <ts-card bordered padding="lg">
      <span slot="header">
        <ts-row gap="1">
          <ts-icon name="credit-card" size="sm"></ts-icon>
          <h3 style="margin: 0;">Payment Method</h3>
        </ts-row>
      </span>
      <ts-stack gap="2">
        <ts-input label="Card Number" placeholder="4242 4242 4242 4242">
          <ts-icon slot="prefix" name="credit-card" size="sm"></ts-icon>
        </ts-input>
        <ts-row gap="2">
          <ts-input label="Expiry" placeholder="MM/YY" style="flex: 1;"></ts-input>
          <ts-input label="CVC" placeholder="123" style="flex: 1;">
            <ts-icon slot="suffix" name="lock" size="sm"></ts-icon>
          </ts-input>
        </ts-row>
      </ts-stack>
      <span slot="footer">
        <ts-row gap="2" justify="end" style="padding-top: 8px;">
          <ts-button appearance="outline" variant="neutral">Cancel</ts-button>
          <ts-button variant="primary">
            <ts-icon slot="prefix" name="lock" size="sm"></ts-icon>
            Pay $49.99
          </ts-button>
        </ts-row>
      </span>
    </ts-card>
  </ts-stack>
`;
