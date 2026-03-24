// Hand-written stories for ts-skeleton

export default {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'The skeleton shape variant.',
    },
    width: {
      control: 'text',
      description: 'CSS width of the skeleton.',
    },
    height: {
      control: 'text',
      description: 'CSS height of the skeleton.',
    },
    lines: {
      control: 'number',
      description: 'Number of lines to render (text variant only).',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation style.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.width !== undefined) attrs.push(`width="${args.width}"`);
  if (args.height !== undefined) attrs.push(`height="${args.height}"`);
  if (args.lines !== undefined) attrs.push(`lines="${args.lines}"`);
  if (args.animation !== undefined) attrs.push(`animation="${args.animation}"`);
  return `<ts-skeleton ${attrs.join(' ')}></ts-skeleton>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'text',
    width: '100%',
    lines: 3,
    animation: 'pulse',
  },
});

export const Variants = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Text (3 lines)</p>
      <ts-skeleton variant="text" lines="3"></ts-skeleton>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Circular (avatar)</p>
      <ts-skeleton variant="circular" width="48px" height="48px"></ts-skeleton>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Rectangular (image)</p>
      <ts-skeleton variant="rectangular" width="100%" height="200px"></ts-skeleton>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Pulse animation (default)</p>
      <ts-skeleton variant="text" lines="2" animation="pulse"></ts-skeleton>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Wave animation</p>
      <ts-skeleton variant="text" lines="2" animation="wave"></ts-skeleton>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">No animation</p>
      <ts-skeleton variant="text" lines="2" animation="none"></ts-skeleton>
    </div>
  </div>
`;

export const LoadingCard = () => `
  <div style="max-width: 320px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
    <ts-skeleton variant="rectangular" width="100%" height="180px"></ts-skeleton>
    <ts-skeleton variant="text" width="60%" lines="1"></ts-skeleton>
    <ts-skeleton variant="text" lines="3"></ts-skeleton>
    <div style="display: flex; gap: 8px;">
      <ts-skeleton variant="rectangular" width="80px" height="32px"></ts-skeleton>
      <ts-skeleton variant="rectangular" width="80px" height="32px"></ts-skeleton>
    </div>
  </div>
`;

export const LoadingList = () => `
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <ts-skeleton variant="circular" width="40px" height="40px"></ts-skeleton>
      <div style="flex: 1;">
        <ts-skeleton variant="text" width="70%" lines="1"></ts-skeleton>
        <ts-skeleton variant="text" width="40%" lines="1"></ts-skeleton>
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <ts-skeleton variant="circular" width="40px" height="40px"></ts-skeleton>
      <div style="flex: 1;">
        <ts-skeleton variant="text" width="70%" lines="1"></ts-skeleton>
        <ts-skeleton variant="text" width="40%" lines="1"></ts-skeleton>
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <ts-skeleton variant="circular" width="40px" height="40px"></ts-skeleton>
      <div style="flex: 1;">
        <ts-skeleton variant="text" width="70%" lines="1"></ts-skeleton>
        <ts-skeleton variant="text" width="40%" lines="1"></ts-skeleton>
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <ts-skeleton variant="circular" width="40px" height="40px"></ts-skeleton>
      <div style="flex: 1;">
        <ts-skeleton variant="text" width="70%" lines="1"></ts-skeleton>
        <ts-skeleton variant="text" width="40%" lines="1"></ts-skeleton>
      </div>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <ts-skeleton variant="circular" width="56px" height="56px"></ts-skeleton>
      <div style="flex: 1;">
        <ts-skeleton variant="text" width="50%" lines="1"></ts-skeleton>
        <ts-skeleton variant="text" width="30%" lines="1"></ts-skeleton>
      </div>
    </div>
    <ts-skeleton variant="rectangular" width="100%" height="240px"></ts-skeleton>
    <ts-skeleton variant="text" lines="4"></ts-skeleton>
  </div>
`;
