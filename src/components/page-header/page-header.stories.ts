// Hand-written stories for ts-page-header

export default {
  title: 'Components/Page Header',
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text', description: 'The page heading text.' },
    description: { control: 'text', description: 'Optional description text below the heading.' },
    backHref: { control: 'text', description: 'Optional URL for the back navigation link.' },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.heading) attrs.push(`heading="${args.heading}"`);
  if (args.description) attrs.push(`description="${args.description}"`);
  if (args.backHref) attrs.push(`back-href="${args.backHref}"`);

  return `<ts-page-header ${attrs.join(' ')}></ts-page-header>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    heading: 'Dashboard',
    description: 'Overview of your workspace activity and metrics.',
  },
});

export const WithBreadcrumb = (): string => `
  <ts-page-header heading="Project Settings" description="Configure your project preferences and integrations.">
    <ts-breadcrumb slot="breadcrumb">
      <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
      <ts-breadcrumb-item href="/projects">Projects</ts-breadcrumb-item>
      <ts-breadcrumb-item>Settings</ts-breadcrumb-item>
    </ts-breadcrumb>
  </ts-page-header>
`;

export const WithActions = (): string => `
  <ts-page-header heading="Team Members" description="Manage who has access to this workspace.">
    <div slot="actions" style="display: flex; gap: 8px;">
      <ts-button variant="neutral" appearance="outline">
        <ts-icon name="download" slot="prefix"></ts-icon>
        Export
      </ts-button>
      <ts-button variant="primary">
        <ts-icon name="plus" slot="prefix"></ts-icon>
        Invite Member
      </ts-button>
    </div>
  </ts-page-header>
`;

export const WithBackLink = (): string => `
  <ts-page-header
    heading="Invoice #1042"
    description="Created on March 15, 2026"
    back-href="/invoices"
  ></ts-page-header>
`;

export const FullFeatured = (): string => `
  <ts-page-header
    heading="Analytics"
    description="Track performance across all your campaigns."
    back-href="/home"
  >
    <ts-breadcrumb slot="breadcrumb">
      <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
      <ts-breadcrumb-item href="/marketing">Marketing</ts-breadcrumb-item>
      <ts-breadcrumb-item>Analytics</ts-breadcrumb-item>
    </ts-breadcrumb>
    <div slot="actions" style="display: flex; gap: 8px;">
      <ts-button variant="neutral" appearance="outline">
        <ts-icon name="calendar" slot="prefix"></ts-icon>
        Date Range
      </ts-button>
      <ts-button variant="primary">
        <ts-icon name="download" slot="prefix"></ts-icon>
        Export Report
      </ts-button>
    </div>
    <ts-tabs slot="tabs">
      <ts-tab-panel label="Overview">Overview content</ts-tab-panel>
      <ts-tab-panel label="Traffic">Traffic content</ts-tab-panel>
      <ts-tab-panel label="Conversions">Conversions content</ts-tab-panel>
    </ts-tabs>
  </ts-page-header>
`;
