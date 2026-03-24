// Hand-written stories for ts-breadcrumb

export default {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'The separator character between breadcrumb items.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.separator !== undefined && args.separator !== null) attrs.push(`separator="${args.separator}"`);
  return `
    <ts-breadcrumb ${attrs.join(' ')}>
      <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
      <ts-breadcrumb-item href="/products">Products</ts-breadcrumb-item>
      <ts-breadcrumb-item href="/products/electronics">Electronics</ts-breadcrumb-item>
      <ts-breadcrumb-item current>Headphones</ts-breadcrumb-item>
    </ts-breadcrumb>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    separator: '/',
  },
});

export const Variants = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Slash separator (default)</p>
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/docs">Docs</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Getting Started</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Arrow separator</p>
      <ts-breadcrumb separator=">">
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/docs">Docs</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Getting Started</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Pipe separator</p>
      <ts-breadcrumb separator="|">
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/docs">Docs</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Getting Started</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
  </div>
`;

export const Composition = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">E-commerce navigation</p>
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/products">Products</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/products/electronics">Electronics</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Headphones</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Admin panel</p>
      <ts-breadcrumb separator=">">
        <ts-breadcrumb-item href="/admin">Admin</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/admin/users">Users</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/admin/users/42">John Doe</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Edit Profile</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Documentation path</p>
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/docs">Documentation</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/docs/components">Components</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Breadcrumb</ts-breadcrumb-item>
      </ts-breadcrumb>
    </div>
  </div>
`;
