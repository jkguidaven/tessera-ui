// Hand-written stories for ts-tooltip

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'The tooltip text content.' },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: 'Placement of the tooltip relative to the trigger.',
    },
    showDelay: { control: 'number', description: 'Delay in ms before showing the tooltip.' },
    hideDelay: { control: 'number', description: 'Delay in ms before hiding the tooltip.' },
    disabled: { control: 'boolean', description: 'Disables the tooltip.' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const attrs: string[] = [];
  if (args.content !== undefined && args.content !== null) attrs.push(`content="${args.content}"`);
  if (args.placement !== undefined && args.placement !== null) attrs.push(`placement="${args.placement}"`);
  if (args.showDelay !== undefined && args.showDelay !== null) attrs.push(`show-delay="${args.showDelay}"`);
  if (args.hideDelay !== undefined && args.hideDelay !== null) attrs.push(`hide-delay="${args.hideDelay}"`);
  if (args.disabled) attrs.push('disabled');
  return `<div style="padding: 60px; display: flex; justify-content: center;">
    <ts-tooltip ${attrs.join(' ')}>
      <ts-button variant="primary">Hover Me</ts-button>
    </ts-tooltip>
  </div>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    content: 'Save your current changes',
    placement: 'top',
    showDelay: 200,
    hideDelay: 0,
    disabled: false,
  },
});

export const Placements = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; padding: 80px 40px;">
    <div style="display: flex; gap: 16px; justify-content: center;">
      <ts-tooltip content="Top Start" placement="top-start">
        <ts-button size="sm" appearance="outline" variant="neutral">Top Start</ts-button>
      </ts-tooltip>
      <ts-tooltip content="Top" placement="top">
        <ts-button size="sm" appearance="outline" variant="neutral">Top</ts-button>
      </ts-tooltip>
      <ts-tooltip content="Top End" placement="top-end">
        <ts-button size="sm" appearance="outline" variant="neutral">Top End</ts-button>
      </ts-tooltip>
    </div>

    <div style="display: flex; gap: 200px; justify-content: center;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-tooltip content="Left Start" placement="left-start">
          <ts-button size="sm" appearance="outline" variant="neutral">Left Start</ts-button>
        </ts-tooltip>
        <ts-tooltip content="Left" placement="left">
          <ts-button size="sm" appearance="outline" variant="neutral">Left</ts-button>
        </ts-tooltip>
        <ts-tooltip content="Left End" placement="left-end">
          <ts-button size="sm" appearance="outline" variant="neutral">Left End</ts-button>
        </ts-tooltip>
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ts-tooltip content="Right Start" placement="right-start">
          <ts-button size="sm" appearance="outline" variant="neutral">Right Start</ts-button>
        </ts-tooltip>
        <ts-tooltip content="Right" placement="right">
          <ts-button size="sm" appearance="outline" variant="neutral">Right</ts-button>
        </ts-tooltip>
        <ts-tooltip content="Right End" placement="right-end">
          <ts-button size="sm" appearance="outline" variant="neutral">Right End</ts-button>
        </ts-tooltip>
      </div>
    </div>

    <div style="display: flex; gap: 16px; justify-content: center;">
      <ts-tooltip content="Bottom Start" placement="bottom-start">
        <ts-button size="sm" appearance="outline" variant="neutral">Bottom Start</ts-button>
      </ts-tooltip>
      <ts-tooltip content="Bottom" placement="bottom">
        <ts-button size="sm" appearance="outline" variant="neutral">Bottom</ts-button>
      </ts-tooltip>
      <ts-tooltip content="Bottom End" placement="bottom-end">
        <ts-button size="sm" appearance="outline" variant="neutral">Bottom End</ts-button>
      </ts-tooltip>
    </div>
  </div>
`;

export const States = () => `
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap; padding: 60px 40px;">
    <ts-tooltip content="This tooltip is active" placement="top">
      <ts-button variant="primary">Active Tooltip</ts-button>
    </ts-tooltip>
    <ts-tooltip content="This tooltip is disabled" placement="top" disabled>
      <ts-button appearance="outline" variant="neutral">Disabled Tooltip</ts-button>
    </ts-tooltip>
    <ts-tooltip content="Shows after 500ms" placement="top" show-delay="500">
      <ts-button appearance="outline" variant="neutral">Slow Show (500ms)</ts-button>
    </ts-tooltip>
    <ts-tooltip content="Hides after 300ms" placement="top" hide-delay="300">
      <ts-button appearance="outline" variant="neutral">Slow Hide (300ms)</ts-button>
    </ts-tooltip>
  </div>
`;

export const WithIcons = () => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 60px 40px;">
    <ts-tooltip content="Create a new document" placement="top">
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="file-plus" size="sm"></ts-icon>
      </ts-button>
    </ts-tooltip>
    <ts-tooltip content="Edit this item" placement="top">
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="pencil" size="sm"></ts-icon>
      </ts-button>
    </ts-tooltip>
    <ts-tooltip content="Copy to clipboard" placement="top">
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="copy" size="sm"></ts-icon>
      </ts-button>
    </ts-tooltip>
    <ts-tooltip content="Delete permanently" placement="top">
      <ts-button appearance="ghost" variant="danger">
        <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
      </ts-button>
    </ts-tooltip>
    <ts-tooltip content="Share with team" placement="top">
      <ts-button appearance="ghost" variant="primary">
        <ts-icon slot="prefix" name="share-2" size="sm"></ts-icon>
      </ts-button>
    </ts-tooltip>
  </div>
`;

export const Composition = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px; padding: 40px;">
    <ts-card bordered padding="lg">
      <span slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">Quick Actions</h3>
          <ts-tooltip content="Keyboard shortcuts available" placement="left">
            <ts-icon name="keyboard" size="sm" color="var(--ts-color-text-secondary)"></ts-icon>
          </ts-tooltip>
        </div>
      </span>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ts-tooltip content="Create new project (Ctrl+N)" placement="bottom">
          <ts-button size="sm" variant="primary">
            <ts-icon slot="prefix" name="plus" size="sm"></ts-icon>
            New Project
          </ts-button>
        </ts-tooltip>
        <ts-tooltip content="Import from file (Ctrl+I)" placement="bottom">
          <ts-button size="sm" appearance="outline" variant="neutral">
            <ts-icon slot="prefix" name="upload" size="sm"></ts-icon>
            Import
          </ts-button>
        </ts-tooltip>
        <ts-tooltip content="Export as PDF (Ctrl+E)" placement="bottom">
          <ts-button size="sm" appearance="outline" variant="neutral">
            <ts-icon slot="prefix" name="download" size="sm"></ts-icon>
            Export
          </ts-button>
        </ts-tooltip>
      </div>
    </ts-card>

    <div style="display: flex; align-items: center; gap: 12px;">
      <ts-input placeholder="Enter your API key" label="API Key" style="flex: 1;">
        <ts-icon slot="prefix" name="key" size="sm"></ts-icon>
      </ts-input>
      <div style="align-self: flex-end; padding-bottom: 2px;">
        <ts-tooltip content="Your API key can be found in Settings > Developer" placement="right">
          <ts-icon name="help-circle" size="sm" color="var(--ts-color-text-secondary)"></ts-icon>
        </ts-tooltip>
      </div>
    </div>
  </div>
`;
