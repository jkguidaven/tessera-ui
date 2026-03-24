// Hand-written stories for ts-table

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean', description: 'Applies alternating row background colors.' },
    bordered: { control: 'boolean', description: 'Adds borders to all cells.' },
    hoverable: { control: 'boolean', description: 'Highlights rows on hover.' },
    compact: { control: 'boolean', description: 'Reduces cell padding for denser display.' },
    stickyHeader: { control: 'boolean', description: 'Makes the table header stick to the top on scroll.' },
  },
};

const sampleTable = `
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>James Kennedy</td>
        <td>james@example.com</td>
        <td>Admin</td>
        <td>Active</td>
      </tr>
      <tr>
        <td>Alice Smith</td>
        <td>alice@example.com</td>
        <td>Editor</td>
        <td>Active</td>
      </tr>
      <tr>
        <td>Robert Chen</td>
        <td>robert@example.com</td>
        <td>Viewer</td>
        <td>Inactive</td>
      </tr>
      <tr>
        <td>Maria Garcia</td>
        <td>maria@example.com</td>
        <td>Editor</td>
        <td>Active</td>
      </tr>
      <tr>
        <td>David Lee</td>
        <td>david@example.com</td>
        <td>Viewer</td>
        <td>Pending</td>
      </tr>
    </tbody>
  </table>
`;

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.striped) attrs.push('striped');
  if (args.bordered) attrs.push('bordered');
  if (args.hoverable) attrs.push('hoverable');
  if (args.compact) attrs.push('compact');
  if (args.stickyHeader) attrs.push('sticky-header');
  return `<ts-table ${attrs.join(' ')}>${sampleTable}</ts-table>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    striped: false,
    bordered: false,
    hoverable: false,
    compact: false,
    stickyHeader: false,
  },
});

export const Striped = (): string => `
  <ts-table striped>${sampleTable}</ts-table>
`;

export const Bordered = (): string => `
  <ts-table bordered>${sampleTable}</ts-table>
`;

export const Hoverable = (): string => `
  <ts-table hoverable>${sampleTable}</ts-table>
`;

export const Compact = (): string => `
  <ts-table compact>${sampleTable}</ts-table>
`;

export const AllFeatures = (): string => `
  <ts-table striped bordered hoverable>${sampleTable}</ts-table>
`;

export const StickyHeader = (): string => `
  <div style="max-height: 250px; overflow: auto;">
    <ts-table sticky-header hoverable>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>James Kennedy</td><td>james@example.com</td><td>Admin</td><td>Engineering</td><td>Active</td></tr>
          <tr><td>Alice Smith</td><td>alice@example.com</td><td>Editor</td><td>Marketing</td><td>Active</td></tr>
          <tr><td>Robert Chen</td><td>robert@example.com</td><td>Viewer</td><td>Sales</td><td>Inactive</td></tr>
          <tr><td>Maria Garcia</td><td>maria@example.com</td><td>Editor</td><td>Design</td><td>Active</td></tr>
          <tr><td>David Lee</td><td>david@example.com</td><td>Viewer</td><td>Support</td><td>Pending</td></tr>
          <tr><td>Sarah Wilson</td><td>sarah@example.com</td><td>Admin</td><td>Engineering</td><td>Active</td></tr>
          <tr><td>Tom Brown</td><td>tom@example.com</td><td>Editor</td><td>Content</td><td>Active</td></tr>
          <tr><td>Lisa Wang</td><td>lisa@example.com</td><td>Viewer</td><td>HR</td><td>Inactive</td></tr>
          <tr><td>Michael Park</td><td>michael@example.com</td><td>Editor</td><td>Finance</td><td>Active</td></tr>
          <tr><td>Emma Davis</td><td>emma@example.com</td><td>Admin</td><td>Operations</td><td>Active</td></tr>
        </tbody>
      </table>
    </ts-table>
  </div>
`;

export const CompactBordered = (): string => `
  <ts-table compact bordered striped>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>#ORD-001</td><td>James Kennedy</td><td>Widget Pro</td><td>3</td><td>$149.97</td><td>Shipped</td></tr>
        <tr><td>#ORD-002</td><td>Alice Smith</td><td>Gadget Plus</td><td>1</td><td>$79.99</td><td>Processing</td></tr>
        <tr><td>#ORD-003</td><td>Robert Chen</td><td>Tool Kit</td><td>2</td><td>$199.98</td><td>Delivered</td></tr>
        <tr><td>#ORD-004</td><td>Maria Garcia</td><td>Widget Pro</td><td>5</td><td>$249.95</td><td>Shipped</td></tr>
        <tr><td>#ORD-005</td><td>David Lee</td><td>Gadget Plus</td><td>1</td><td>$79.99</td><td>Cancelled</td></tr>
      </tbody>
    </table>
  </ts-table>
`;
