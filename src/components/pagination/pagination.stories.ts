// Hand-written stories for ts-pagination

export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: 'number',
      description: 'Total number of items.',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page.',
    },
    currentPage: {
      control: 'number',
      description: 'The current active page (1-based).',
    },
    siblingCount: {
      control: 'number',
      description: 'Number of sibling pages shown around the current page.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the pagination buttons.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.total !== undefined) attrs.push(`total="${args.total}"`);
  if (args.pageSize !== undefined) attrs.push(`page-size="${args.pageSize}"`);
  if (args.currentPage !== undefined) attrs.push(`current-page="${args.currentPage}"`);
  if (args.siblingCount !== undefined) attrs.push(`sibling-count="${args.siblingCount}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  return `<ts-pagination ${attrs.join(' ')}></ts-pagination>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    siblingCount: 1,
    size: 'md',
  },
});

export const Sizes = () => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Small</p>
      <ts-pagination total="100" page-size="10" current-page="5" size="sm"></ts-pagination>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Medium (default)</p>
      <ts-pagination total="100" page-size="10" current-page="5" size="md"></ts-pagination>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Large</p>
      <ts-pagination total="100" page-size="10" current-page="5" size="lg"></ts-pagination>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">First page (prev disabled)</p>
      <ts-pagination total="100" page-size="10" current-page="1"></ts-pagination>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Middle page with ellipsis</p>
      <ts-pagination total="100" page-size="10" current-page="5"></ts-pagination>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Last page (next disabled)</p>
      <ts-pagination total="100" page-size="10" current-page="10"></ts-pagination>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 600px; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span style="font-size: 14px; color: #666;">Showing 41-50 of 237 results</span>
    </div>
    <ts-pagination total="237" page-size="10" current-page="5" sibling-count="2"></ts-pagination>
  </div>
`;
