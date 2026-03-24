// Hand-written stories for ts-spacer

export default {
  title: 'Layout/Spacer',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Spacing token number controlling the size of the spacer.',
    },
    axis: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The axis along which the spacer adds space.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.axis !== undefined) attrs.push(`axis="${args.axis}"`);
  return `
    <div style="font-family: sans-serif;">
      <div style="padding: 12px; background: #e2e8f0; border-radius: 4px;">Above spacer</div>
      <ts-spacer ${attrs.join(' ')} style="background: rgba(59, 130, 246, 0.15);"></ts-spacer>
      <div style="padding: 12px; background: #e2e8f0; border-radius: 4px;">Below spacer</div>
    </div>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    size: '4',
    axis: 'vertical',
  },
});

export const Vertical = () => `
  <div style="font-family: sans-serif; max-width: 400px;">
    <h2 style="margin: 0;">First Section</h2>
    <p style="margin: 0; color: #64748b;">Some content in the first section.</p>
    <ts-spacer size="6" style="background: rgba(59, 130, 246, 0.1);"></ts-spacer>
    <h2 style="margin: 0;">Second Section</h2>
    <p style="margin: 0; color: #64748b;">Some content in the second section.</p>
    <ts-spacer size="6" style="background: rgba(59, 130, 246, 0.1);"></ts-spacer>
    <h2 style="margin: 0;">Third Section</h2>
    <p style="margin: 0; color: #64748b;">Some content in the third section.</p>
  </div>
`;

export const Horizontal = () => `
  <div style="display: flex; align-items: center; font-family: sans-serif;">
    <span style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px;">Left</span>
    <ts-spacer axis="horizontal" size="4" style="background: rgba(59, 130, 246, 0.15);"></ts-spacer>
    <span style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px;">Middle</span>
    <ts-spacer axis="horizontal" size="8" style="background: rgba(59, 130, 246, 0.15);"></ts-spacer>
    <span style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px;">Right</span>
  </div>
`;

export const Sizes = () => `
  <div style="font-family: sans-serif;">
    <p style="margin: 0 0 16px; font-size: 14px; color: #666;">Different vertical spacer sizes (highlighted in blue)</p>
    <div style="display: flex; gap: 32px;">
      <div style="flex: 1;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #999;">size="1"</p>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Top</div>
        <ts-spacer size="1" style="background: rgba(59, 130, 246, 0.2);"></ts-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Bottom</div>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #999;">size="4"</p>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Top</div>
        <ts-spacer size="4" style="background: rgba(59, 130, 246, 0.2);"></ts-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Bottom</div>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #999;">size="8"</p>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Top</div>
        <ts-spacer size="8" style="background: rgba(59, 130, 246, 0.2);"></ts-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Bottom</div>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #999;">size="12"</p>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Top</div>
        <ts-spacer size="12" style="background: rgba(59, 130, 246, 0.2);"></ts-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Bottom</div>
      </div>
    </div>
  </div>
`;
