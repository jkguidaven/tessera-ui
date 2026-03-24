// Hand-written stories for ts-row

export default {
  title: 'Layout/Row',
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Spacing token number controlling the gap between items.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment of items.',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis alignment of items.',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap to the next line.',
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the row direction.',
    },
    stackAt: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'never'],
      description: 'Breakpoint at which the row stacks vertically.',
    },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.gap !== undefined) attrs.push(`gap="${args.gap}"`);
  if (args.align !== undefined) attrs.push(`align="${args.align}"`);
  if (args.justify !== undefined) attrs.push(`justify="${args.justify}"`);
  if (args.wrap === false) attrs.push(`wrap="false"`);
  if (args.reverse) attrs.push(`reverse`);
  if (args.stackAt !== undefined && args.stackAt !== 'never') attrs.push(`stack-at="${args.stackAt}"`);
  return `
    <ts-row ${attrs.join(' ')}>
      <ts-button variant="primary">Save</ts-button>
      <ts-button variant="neutral" appearance="outline">Cancel</ts-button>
      <ts-button variant="danger" appearance="ghost">Delete</ts-button>
    </ts-row>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    gap: '2',
    align: 'center',
    justify: 'start',
    wrap: true,
    reverse: false,
    stackAt: 'never',
  },
});

export const Justify = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">justify="start"</p>
      <ts-row justify="start" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">C</div>
      </ts-row>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">justify="center"</p>
      <ts-row justify="center" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">C</div>
      </ts-row>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">justify="end"</p>
      <ts-row justify="end" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">C</div>
      </ts-row>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">justify="between"</p>
      <ts-row justify="between" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">C</div>
      </ts-row>
    </div>
  </div>
`;

export const Alignment = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="start"</p>
      <ts-row align="start" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px; min-height: 80px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
        <div style="padding: 16px; background: #dbeafe; border-radius: 4px;">Tall item</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
      </ts-row>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="center"</p>
      <ts-row align="center" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px; min-height: 80px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
        <div style="padding: 16px; background: #dbeafe; border-radius: 4px;">Tall item</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
      </ts-row>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">align="stretch"</p>
      <ts-row align="stretch" gap="2" style="border: 1px dashed #cbd5e1; padding: 8px; min-height: 80px;">
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
        <div style="padding: 16px; background: #dbeafe; border-radius: 4px;">Tall item</div>
        <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Short</div>
      </ts-row>
    </div>
  </div>
`;

export const Wrap = () => `
  <div style="font-family: sans-serif;">
    <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Resize browser to see wrapping behavior</p>
    <ts-row gap="2" style="border: 1px dashed #cbd5e1; padding: 8px; max-width: 300px;">
      <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Item 1</div>
      <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Item 2</div>
      <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Item 3</div>
      <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Item 4</div>
      <div style="padding: 8px 16px; background: #dbeafe; border-radius: 4px;">Item 5</div>
    </ts-row>
  </div>
`;

export const StackAt = () => `
  <div style="font-family: sans-serif;">
    <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Resize the browser to see stacking at md breakpoint (767px)</p>
    <ts-row stack-at="md" gap="3" style="border: 1px dashed #cbd5e1; padding: 8px;">
      <div style="padding: 12px 24px; background: #dbeafe; border-radius: 4px;">Navigation</div>
      <div style="padding: 12px 24px; background: #dbeafe; border-radius: 4px;">Content</div>
      <div style="padding: 12px 24px; background: #dbeafe; border-radius: 4px;">Sidebar</div>
    </ts-row>
  </div>
`;

export const Composition = () => `
  <div style="font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <ts-row justify="between" align="center">
        <div style="font-weight: 600; font-size: 18px;">My App</div>
        <ts-row gap="3">
          <a href="#" style="text-decoration: none; color: #475569;">Home</a>
          <a href="#" style="text-decoration: none; color: #475569;">About</a>
          <a href="#" style="text-decoration: none; color: #475569;">Contact</a>
        </ts-row>
        <ts-row gap="2">
          <ts-button variant="neutral" appearance="ghost" size="sm">Sign in</ts-button>
          <ts-button variant="primary" size="sm">Sign up</ts-button>
        </ts-row>
      </ts-row>
    </div>
  </div>
`;
