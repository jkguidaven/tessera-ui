// Hand-written stories for ts-visually-hidden

export default {
  title: 'Utilities/Visually Hidden',
  tags: ['autodocs'],
  argTypes: {
    focusable: {
      control: 'boolean',
      description: 'When true, the content becomes visible when focused (useful for skip links).',
    },
    slotContent: {
      control: 'text',
      description: 'The hidden content (visible to screen readers).',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.focusable) attrs.push('focusable');
  return `
    <div>
      <p style="color: var(--ts-color-text-secondary); margin-bottom: var(--ts-spacing-2);">
        The text below is visually hidden but readable by screen readers.
        Inspect the DOM to see the content.
      </p>
      <ts-visually-hidden ${attrs.join(' ')}>${args.slotContent || 'This text is only for screen readers'}</ts-visually-hidden>
    </div>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    focusable: false,
    slotContent: 'This text is only for screen readers',
  },
});

export const WithFocusableSkipLink = (): string => `
  <div>
    <p style="color: var(--ts-color-text-secondary); margin-bottom: var(--ts-spacing-2);">
      Press <strong>Tab</strong> to reveal the skip link below:
    </p>
    <ts-visually-hidden focusable>
      <a href="#main-content" style="
        display: inline-block;
        padding: var(--ts-spacing-2) var(--ts-spacing-4);
        background: var(--ts-color-interactive-primary);
        color: var(--ts-color-text-on-primary);
        text-decoration: none;
        border-radius: var(--ts-shape-interactive);
        font-weight: var(--ts-font-weight-medium);
      ">Skip to main content</a>
    </ts-visually-hidden>
    <div id="main-content" style="margin-top: var(--ts-spacing-4); padding: var(--ts-spacing-4); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-container);">
      <p style="margin: 0;">Main page content goes here.</p>
    </div>
  </div>
`;

export const IconButtonLabel = (): string => `
  <div>
    <p style="color: var(--ts-color-text-secondary); margin-bottom: var(--ts-spacing-2);">
      The buttons below use visually hidden text to provide accessible labels for icon-only buttons:
    </p>
    <ts-row gap="2">
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="search" size="sm"></ts-icon>
        <ts-visually-hidden>Search</ts-visually-hidden>
      </ts-button>
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="bell" size="sm"></ts-icon>
        <ts-visually-hidden>Notifications</ts-visually-hidden>
      </ts-button>
      <ts-button appearance="ghost" variant="neutral">
        <ts-icon slot="prefix" name="settings" size="sm"></ts-icon>
        <ts-visually-hidden>Settings</ts-visually-hidden>
      </ts-button>
      <ts-button appearance="ghost" variant="danger">
        <ts-icon slot="prefix" name="trash-2" size="sm"></ts-icon>
        <ts-visually-hidden>Delete item</ts-visually-hidden>
      </ts-button>
    </ts-row>
  </div>
`;

export const FormFieldDescription = (): string => `
  <div style="max-width: 400px;">
    <p style="color: var(--ts-color-text-secondary); margin-bottom: var(--ts-spacing-2);">
      Visually hidden text provides extra context for screen readers alongside form fields:
    </p>
    <ts-stack gap="3">
      <div>
        <label for="email" style="display: block; margin-bottom: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Email</label>
        <ts-visually-hidden>Required field. Enter your work email address.</ts-visually-hidden>
        <ts-input id="email" placeholder="you@company.com" type="email"></ts-input>
      </div>
      <div>
        <label for="password" style="display: block; margin-bottom: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Password</label>
        <ts-visually-hidden>Required field. Must be at least 8 characters with one uppercase letter and one number.</ts-visually-hidden>
        <ts-input id="password" placeholder="Enter your password" type="password"></ts-input>
      </div>
    </ts-stack>
  </div>
`;
