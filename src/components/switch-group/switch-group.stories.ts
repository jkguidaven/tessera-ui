// Hand-written stories for ts-switch-group

export default {
  title: 'Components/SwitchGroup',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently active segment value.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch group.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire group.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill the container width.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.value !== undefined) attrs.push(`value="${args.value}"`);
  if (args.size !== undefined) attrs.push(`size="${args.size}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.fullWidth) attrs.push('full-width');
  return `
    <ts-switch-group ${attrs.join(' ')}>
      <ts-switch-option value="daily">Daily</ts-switch-option>
      <ts-switch-option value="weekly">Weekly</ts-switch-option>
      <ts-switch-option value="monthly">Monthly</ts-switch-option>
    </ts-switch-group>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    value: 'weekly',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
});

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Small</p>
      <ts-switch-group value="weekly" size="sm">
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Medium (default)</p>
      <ts-switch-group value="weekly" size="md">
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Large</p>
      <ts-switch-group value="weekly" size="lg">
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Active selection</p>
      <ts-switch-group value="weekly">
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Disabled group</p>
      <ts-switch-group value="weekly" disabled>
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">With disabled option</p>
      <ts-switch-group value="daily">
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly" disabled>Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Full width</p>
      <ts-switch-group value="weekly" full-width>
        <ts-switch-option value="daily">Daily</ts-switch-option>
        <ts-switch-option value="weekly">Weekly</ts-switch-option>
        <ts-switch-option value="monthly">Monthly</ts-switch-option>
      </ts-switch-group>
    </div>
  </div>
`;

export const Composition = (): string => `
  <div style="max-width: 500px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h4 style="margin: 0;">Analytics Overview</h4>
        <ts-switch-group value="weekly" size="sm">
          <ts-switch-option value="daily">Daily</ts-switch-option>
          <ts-switch-option value="weekly">Weekly</ts-switch-option>
          <ts-switch-option value="monthly">Monthly</ts-switch-option>
        </ts-switch-group>
      </div>
      <div style="height: 200px; background: #f8fafc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
        Chart placeholder
      </div>
    </div>
  </div>
`;
