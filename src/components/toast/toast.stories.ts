// Hand-written stories for ts-toast

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'The toast\'s visual variant.',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in ms. Set 0 to disable.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the toast shows a close button.',
    },
    open: {
      control: 'boolean',
      description: 'Whether the toast is visible.',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      description: 'Position of the toast on screen.',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Whether auto-dismiss pauses on hover/focus.',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show a countdown progress bar.',
    },
    slotContent: {
      control: 'text',
      description: 'Default slot content',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.variant !== undefined) attrs.push(`variant="${args.variant}"`);
  if (args.duration !== undefined) attrs.push(`duration="${args.duration}"`);
  if (args.dismissible !== undefined && args.dismissible) attrs.push('dismissible');
  if (args.open) attrs.push('open');
  if (args.position !== undefined) attrs.push(`position="${args.position}"`);
  if (args.pauseOnHover !== undefined && args.pauseOnHover) attrs.push('pause-on-hover');
  if (args.showProgress !== undefined && args.showProgress) attrs.push('show-progress');
  return `<ts-toast ${attrs.join(' ')}>${args.slotContent || ''}</ts-toast>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    variant: 'success',
    duration: 0,
    dismissible: true,
    open: true,
    position: 'top-right',
    slotContent: 'Changes saved successfully',
  },
});

export const Variants = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative; min-height: 300px;">
    <ts-toast variant="success" open duration="0" style="position: relative;">Changes saved successfully</ts-toast>
    <ts-toast variant="danger" open duration="0" style="position: relative;">Error: Connection failed</ts-toast>
    <ts-toast variant="warning" open duration="0" style="position: relative;">Your session will expire in 5 minutes</ts-toast>
    <ts-toast variant="info" open duration="0" style="position: relative;">A new version is available</ts-toast>
    <ts-toast variant="neutral" open duration="0" style="position: relative;">3 items were moved to archive</ts-toast>
  </div>
`;

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Dismissible</p>
      <ts-toast variant="info" open duration="0" dismissible style="position: relative;">Click the X to dismiss this toast</ts-toast>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Not dismissible</p>
      <ts-toast variant="warning" open duration="0" style="position: relative;">This toast cannot be manually dismissed</ts-toast>
    </div>
  </div>
`;

export const PauseOnHover = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Hover over the toast to pause auto-dismiss (default behavior)</p>
      <ts-toast variant="info" open duration="8000" pause-on-hover dismissible style="position: relative;">Hover me to pause the countdown — I auto-dismiss in 8 seconds</ts-toast>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Pause disabled — auto-dismiss continues on hover</p>
      <ts-toast variant="warning" open duration="8000" pause-on-hover="false" dismissible style="position: relative;">I will auto-dismiss even if you hover me</ts-toast>
    </div>
  </div>
`;

export const WithProgressBar = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
    <ts-toast variant="success" open duration="8000" show-progress dismissible style="position: relative;">File uploaded successfully — auto-dismiss with progress bar</ts-toast>
    <ts-toast variant="info" open duration="10000" show-progress pause-on-hover dismissible style="position: relative;">Hover to pause the progress bar countdown</ts-toast>
    <ts-toast variant="danger" open duration="6000" show-progress dismissible style="position: relative;">Error detected — dismissing in 6 seconds</ts-toast>
  </div>
`;

export const Composition = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
    <ts-toast variant="success" open duration="0" dismissible style="position: relative;">
      Your profile has been updated
      <ts-button slot="action" size="sm" variant="success" appearance="ghost">Undo</ts-button>
    </ts-toast>
    <ts-toast variant="danger" open duration="0" dismissible style="position: relative;">
      Failed to upload file. Please try again.
      <ts-button slot="action" size="sm" variant="danger" appearance="ghost">Retry</ts-button>
    </ts-toast>
  </div>
`;
