// Hand-written stories for ts-empty-state

export default {
  title: 'Components/EmptyState',
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text.',
    },
    description: {
      control: 'text',
      description: 'The description text.',
    },
    icon: {
      control: 'text',
      description: 'Lucide icon name displayed large.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the empty state.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.heading !== undefined) attrs.push(`heading="${args.heading}"`);
  if (args.description !== undefined) attrs.push(`description="${args.description}"`);
  if (args.icon !== undefined) attrs.push(`icon="${args.icon}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  return `
    <ts-empty-state ${attrs.join(' ')}>
      <ts-button slot="action" variant="primary">Create Project</ts-button>
    </ts-empty-state>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    heading: 'No results found',
    description: 'Try adjusting your search or filter criteria to find what you are looking for.',
    icon: 'search',
    size: 'md',
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <ts-empty-state
      heading="No results found"
      description="Try adjusting your search or filter criteria to find what you are looking for."
      icon="search"
    >
      <ts-button slot="action" appearance="outline">Clear Filters</ts-button>
    </ts-empty-state>

    <ts-divider></ts-divider>

    <ts-empty-state
      heading="Create your first project"
      description="Projects help you organize your work and collaborate with your team."
      icon="folder-plus"
    >
      <ts-button slot="action" variant="primary">New Project</ts-button>
    </ts-empty-state>

    <ts-divider></ts-divider>

    <ts-empty-state
      heading="No notifications"
      description="When you receive notifications, they will appear here."
      icon="bell-off"
    >
    </ts-empty-state>
  </div>
`;

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Small</p>
      <ts-empty-state heading="No items" description="Nothing to display." icon="inbox" size="sm"></ts-empty-state>
    </div>
    <ts-divider></ts-divider>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Medium (default)</p>
      <ts-empty-state heading="No items" description="Nothing to display." icon="inbox" size="md"></ts-empty-state>
    </div>
    <ts-divider></ts-divider>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Large</p>
      <ts-empty-state heading="No items" description="Nothing to display." icon="inbox" size="lg"></ts-empty-state>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 500px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 48px 24px;">
      <ts-empty-state
        heading="Create your first project"
        description="Projects let you group related tasks, track progress, and collaborate with your team. Get started by creating a new project."
        icon="rocket"
      >
        <div slot="action" style="display: flex; gap: 8px;">
          <ts-button appearance="outline">Learn More</ts-button>
          <ts-button variant="primary">Create Project</ts-button>
        </div>
      </ts-empty-state>
    </div>
  </div>
`;
