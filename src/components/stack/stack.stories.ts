// Hand-written stories for ts-stack

export default {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Spacing token number controlling the gap between items.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment of items.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.gap !== undefined) attrs.push(`gap="${args.gap}"`);
  if (args.align !== undefined) attrs.push(`align="${args.align}"`);
  return `
    <ts-stack ${attrs.join(' ')} style="max-width: 320px;">
      <input type="text" placeholder="First name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      <input type="text" placeholder="Last name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      <input type="email" placeholder="Email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      <ts-button variant="primary" block>Submit</ts-button>
    </ts-stack>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    gap: '3',
    align: 'stretch',
  },
});

export const Sizes = () => `
  <div style="display: flex; gap: 48px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">gap="1"</p>
      <ts-stack gap="1" style="max-width: 200px;">
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
      </ts-stack>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">gap="3"</p>
      <ts-stack gap="3" style="max-width: 200px;">
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
      </ts-stack>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">gap="6"</p>
      <ts-stack gap="6" style="max-width: 200px;">
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
      </ts-stack>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">gap="10"</p>
      <ts-stack gap="10" style="max-width: 200px;">
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">Item</div>
      </ts-stack>
    </div>
  </div>
`;

export const Alignment = () => `
  <div style="display: flex; gap: 48px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="start"</p>
      <ts-stack align="start" gap="2" style="width: 200px; border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Short</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Medium text</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Long text here</div>
      </ts-stack>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="center"</p>
      <ts-stack align="center" gap="2" style="width: 200px; border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Short</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Medium text</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Long text here</div>
      </ts-stack>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="end"</p>
      <ts-stack align="end" gap="2" style="width: 200px; border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Short</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Medium text</div>
        <div style="padding: 8px; background: #dbeafe; border-radius: 4px; width: fit-content;">Long text here</div>
      </ts-stack>
    </div>
  </div>
`;

export const Composition = () => `
  <div style="max-width: 400px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
      <h3 style="margin: 0 0 4px;">Create Account</h3>
      <p style="margin: 0 0 16px; color: #64748b; font-size: 14px;">Fill in the details below</p>
      <ts-stack gap="3">
        <input type="text" placeholder="Full Name" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px;" />
        <input type="email" placeholder="Email" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px;" />
        <input type="password" placeholder="Password" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px;" />
        <input type="password" placeholder="Confirm Password" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px;" />
        <ts-row justify="end" gap="2">
          <ts-button variant="neutral" appearance="outline">Cancel</ts-button>
          <ts-button variant="primary">Create Account</ts-button>
        </ts-row>
      </ts-stack>
    </div>
  </div>
`;
