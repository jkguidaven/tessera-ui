// Hand-written stories for ts-spinner

export default {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the spinner.',
    },
    color: { control: 'color', description: 'The color of the spinning indicator.' },
    label: { control: 'text', description: 'Accessible label for screen readers.' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.color !== undefined && args.color !== null && args.color !== 'currentColor') attrs.push(`color="${args.color}"`);
  if (args.label !== undefined && args.label !== null) attrs.push(`label="${args.label}"`);
  return `<ts-spinner ${attrs.join(' ')}></ts-spinner>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    size: 'md',
    color: 'currentColor',
    label: 'Loading',
  },
});

export const Sizes = () => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <div style="text-align: center; font-family: sans-serif;">
      <ts-spinner size="xs"></ts-spinner>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">XS</div>
    </div>
    <div style="text-align: center; font-family: sans-serif;">
      <ts-spinner size="sm"></ts-spinner>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">SM</div>
    </div>
    <div style="text-align: center; font-family: sans-serif;">
      <ts-spinner size="md"></ts-spinner>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">MD</div>
    </div>
    <div style="text-align: center; font-family: sans-serif;">
      <ts-spinner size="lg"></ts-spinner>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">LG</div>
    </div>
    <div style="text-align: center; font-family: sans-serif;">
      <ts-spinner size="xl"></ts-spinner>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">XL</div>
    </div>
  </div>
`;

export const CustomColors = () => `
  <div style="display: flex; gap: 24px; align-items: center;">
    <ts-spinner color="#2563eb" label="Loading primary content"></ts-spinner>
    <ts-spinner color="#16a34a" label="Loading success data"></ts-spinner>
    <ts-spinner color="#dc2626" label="Loading error details"></ts-spinner>
    <ts-spinner color="#f59e0b" label="Loading warnings"></ts-spinner>
    <ts-spinner color="#8b5cf6" label="Loading custom data"></ts-spinner>
  </div>
`;

export const LoadingState = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <ts-spinner size="sm" label="Saving changes"></ts-spinner>
      <span>Saving changes...</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <ts-spinner size="sm" label="Uploading file"></ts-spinner>
      <span>Uploading file...</span>
    </div>
    <div style="padding: 48px; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center;">
      <ts-spinner size="lg" label="Loading dashboard data"></ts-spinner>
      <div style="margin-top: 12px; color: #555;">Loading dashboard data...</div>
    </div>
  </div>
`;

export const OnDarkBackground = () => `
  <div style="display: flex; gap: 24px; align-items: center; padding: 32px; background: #1e293b; border-radius: 8px;">
    <ts-spinner size="sm" color="#ffffff" label="Loading"></ts-spinner>
    <ts-spinner size="md" color="#ffffff" label="Loading"></ts-spinner>
    <ts-spinner size="lg" color="#38bdf8" label="Loading"></ts-spinner>
  </div>
`;
