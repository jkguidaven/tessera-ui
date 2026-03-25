// Hand-written stories for ts-form

export default {
  title: 'Components/Form',
  tags: ['autodocs'],
  argTypes: {
    novalidate: {
      control: 'boolean',
      description: 'When true, disables native browser validation.',
    },
  },
};

export const Default = (): string => `
  <ts-form>
    <ts-stack gap="4">
      <div>
        <label for="email" style="display: block; margin-block-end: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Email</label>
        <input id="email" name="email" type="email" placeholder="john@example.com" required
          style="width: 100%; padding: var(--ts-spacing-2) var(--ts-spacing-3); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive); font-size: var(--ts-font-size-md);" />
      </div>
      <div>
        <label for="password" style="display: block; margin-block-end: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" required
          style="width: 100%; padding: var(--ts-spacing-2) var(--ts-spacing-3); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive); font-size: var(--ts-font-size-md);" />
      </div>
      <ts-button type="submit" variant="primary">Sign In</ts-button>
    </ts-stack>
  </ts-form>
`;
Default.parameters = {
  docs: {
    description: {
      story: 'A login form that collects email and password values on submit.',
    },
  },
};

export const WithValidation = (): string => `
  <ts-form>
    <ts-stack gap="4">
      <div>
        <label for="name" style="display: block; margin-block-end: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Full Name</label>
        <input id="name" name="name" type="text" placeholder="Jane Doe" required minlength="2"
          style="width: 100%; padding: var(--ts-spacing-2) var(--ts-spacing-3); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive); font-size: var(--ts-font-size-md);" />
      </div>
      <div>
        <label for="val-email" style="display: block; margin-block-end: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Email</label>
        <input id="val-email" name="email" type="email" placeholder="jane@example.com" required
          style="width: 100%; padding: var(--ts-spacing-2) var(--ts-spacing-3); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive); font-size: var(--ts-font-size-md);" />
      </div>
      <div>
        <label for="age" style="display: block; margin-block-end: var(--ts-spacing-1); font-weight: var(--ts-font-weight-medium);">Age</label>
        <input id="age" name="age" type="number" placeholder="25" min="18" max="120"
          style="width: 100%; padding: var(--ts-spacing-2) var(--ts-spacing-3); border: 1px solid var(--ts-color-border-default); border-radius: var(--ts-shape-interactive); font-size: var(--ts-font-size-md);" />
      </div>
      <ts-row gap="2">
        <ts-button type="submit" variant="primary">Register</ts-button>
        <ts-button type="reset" variant="neutral" appearance="outline">Reset</ts-button>
      </ts-row>
    </ts-stack>
  </ts-form>
`;
WithValidation.parameters = {
  docs: {
    description: {
      story: 'A registration form with native HTML validation constraints. Submit without filling required fields to see browser validation.',
    },
  },
};
