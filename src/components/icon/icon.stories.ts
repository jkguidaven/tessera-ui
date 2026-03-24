// Hand-written stories for ts-icon — uses Lucide icons for realistic previews

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide icon name (kebab-case or PascalCase). Browse all at lucide.dev/icons.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size variant.',
    },
    color: { control: 'color', description: 'Icon color.' },
    label: { control: 'text', description: 'Accessible label (omit for decorative icons).' },
    src: { control: 'text', description: 'URL to an external SVG file.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.name) attrs.push(`name="${args.name}"`);
  if (args.size) attrs.push(`size="${args.size}"`);
  if (args.color) attrs.push(`color="${args.color}"`);
  if (args.label) attrs.push(`label="${args.label}"`);
  if (args.src) attrs.push(`src="${args.src}"`);
  return `<ts-icon ${attrs.join(' ')}></ts-icon>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    name: 'star',
    size: 'md',
  },
});

export const Sizes = (): string => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <ts-icon name="heart" size="xs"></ts-icon>
    <ts-icon name="heart" size="sm"></ts-icon>
    <ts-icon name="heart" size="md"></ts-icon>
    <ts-icon name="heart" size="lg"></ts-icon>
    <ts-icon name="heart" size="xl"></ts-icon>
  </div>
`;

export const CommonIcons = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <ts-icon name="search" size="md" label="Search"></ts-icon>
    <ts-icon name="home" size="md" label="Home"></ts-icon>
    <ts-icon name="settings" size="md" label="Settings"></ts-icon>
    <ts-icon name="user" size="md" label="User"></ts-icon>
    <ts-icon name="bell" size="md" label="Notifications"></ts-icon>
    <ts-icon name="mail" size="md" label="Mail"></ts-icon>
    <ts-icon name="calendar" size="md" label="Calendar"></ts-icon>
    <ts-icon name="check" size="md" label="Check"></ts-icon>
    <ts-icon name="x" size="md" label="Close"></ts-icon>
    <ts-icon name="plus" size="md" label="Add"></ts-icon>
    <ts-icon name="trash-2" size="md" label="Delete"></ts-icon>
    <ts-icon name="edit" size="md" label="Edit"></ts-icon>
    <ts-icon name="download" size="md" label="Download"></ts-icon>
    <ts-icon name="upload" size="md" label="Upload"></ts-icon>
    <ts-icon name="external-link" size="md" label="External link"></ts-icon>
    <ts-icon name="copy" size="md" label="Copy"></ts-icon>
  </div>
`;

export const NavigationIcons = (): string => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <ts-icon name="arrow-left" size="md"></ts-icon>
    <ts-icon name="arrow-right" size="md"></ts-icon>
    <ts-icon name="arrow-up" size="md"></ts-icon>
    <ts-icon name="arrow-down" size="md"></ts-icon>
    <ts-icon name="chevron-left" size="md"></ts-icon>
    <ts-icon name="chevron-right" size="md"></ts-icon>
    <ts-icon name="chevron-down" size="md"></ts-icon>
    <ts-icon name="menu" size="md"></ts-icon>
    <ts-icon name="more-horizontal" size="md"></ts-icon>
  </div>
`;

export const StatusIcons = (): string => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <ts-icon name="check-circle" size="md" color="var(--ts-color-success-600)"></ts-icon>
    <ts-icon name="alert-triangle" size="md" color="var(--ts-color-warning-600)"></ts-icon>
    <ts-icon name="alert-circle" size="md" color="var(--ts-color-danger-600)"></ts-icon>
    <ts-icon name="info" size="md" color="var(--ts-color-info-600)"></ts-icon>
    <ts-icon name="loader" size="md" color="var(--ts-color-text-tertiary)"></ts-icon>
  </div>
`;

export const WithButtons = (): string => `
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <ts-button appearance="solid" variant="primary">
      <ts-icon slot="prefix" name="save" size="sm"></ts-icon>
      Save
    </ts-button>
    <ts-button appearance="outline" variant="danger">
      <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
      Delete
    </ts-button>
    <ts-button appearance="ghost" variant="neutral">
      <ts-icon slot="prefix" name="settings" size="sm"></ts-icon>
      Settings
    </ts-button>
    <ts-button appearance="solid" variant="primary" aria-label="Add">
      <ts-icon slot="prefix" name="plus" size="sm"></ts-icon>
    </ts-button>
  </div>
`;

export const CustomColor = (): string => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <ts-icon name="heart" size="lg" color="var(--ts-color-danger-500)"></ts-icon>
    <ts-icon name="star" size="lg" color="var(--ts-color-warning-500)"></ts-icon>
    <ts-icon name="check-circle" size="lg" color="var(--ts-color-success-500)"></ts-icon>
    <ts-icon name="info" size="lg" color="var(--ts-color-info-500)"></ts-icon>
    <ts-icon name="zap" size="lg" color="var(--ts-color-primary-500)"></ts-icon>
  </div>
`;
