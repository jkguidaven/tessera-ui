// Hand-written stories for ts-accordion

export default {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open simultaneously.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.multiple) attrs.push('multiple');
  return `
    <ts-accordion ${attrs.join(' ')}>
      <ts-accordion-item heading="What is your return policy?">
        You can return any item within 30 days of purchase for a full refund.
        Items must be in their original packaging and in unused condition.
      </ts-accordion-item>
      <ts-accordion-item heading="How do I track my order?">
        Once your order ships, you will receive a confirmation email with a tracking
        number. You can also check your order status in your account dashboard.
      </ts-accordion-item>
      <ts-accordion-item heading="Do you ship internationally?">
        Yes, we ship to over 50 countries worldwide. International shipping rates
        and delivery times vary by destination.
      </ts-accordion-item>
    </ts-accordion>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    multiple: false,
  },
});

export const MultipleOpen = (): string => `
  <ts-accordion multiple>
    <ts-accordion-item heading="What is your return policy?" open>
      You can return any item within 30 days of purchase for a full refund.
      Items must be in their original packaging and in unused condition.
    </ts-accordion-item>
    <ts-accordion-item heading="How do I track my order?" open>
      Once your order ships, you will receive a confirmation email with a tracking
      number. You can also check your order status in your account dashboard.
    </ts-accordion-item>
    <ts-accordion-item heading="Do you ship internationally?">
      Yes, we ship to over 50 countries worldwide. International shipping rates
      and delivery times vary by destination.
    </ts-accordion-item>
  </ts-accordion>
`;

export const States = (): string => `
  <ts-accordion>
    <ts-accordion-item heading="Open by default" open>
      This item is expanded when the page loads.
    </ts-accordion-item>
    <ts-accordion-item heading="Closed item">
      Click the header to reveal this content.
    </ts-accordion-item>
    <ts-accordion-item heading="Disabled item" disabled>
      This item cannot be toggled.
    </ts-accordion-item>
  </ts-accordion>
`;

export const Composition = (): string => `
  <div style="max-width: 600px;">
    <h3 style="margin-bottom: 16px; font-family: sans-serif;">Frequently Asked Questions</h3>
    <ts-accordion>
      <ts-accordion-item heading="How do I create an account?">
        Click the "Sign Up" button in the top right corner of the page. Fill in your
        email address, create a password, and follow the verification steps.
      </ts-accordion-item>
      <ts-accordion-item heading="Can I change my subscription plan?">
        Yes, you can upgrade or downgrade your plan at any time from your account
        settings. Changes take effect at the start of your next billing cycle.
      </ts-accordion-item>
      <ts-accordion-item heading="What payment methods do you accept?">
        We accept all major credit cards (Visa, Mastercard, American Express),
        PayPal, and bank transfers for annual plans.
      </ts-accordion-item>
      <ts-accordion-item heading="How do I cancel my subscription?">
        Navigate to Account Settings > Subscription and click "Cancel Plan."
        You will retain access until the end of your current billing period.
      </ts-accordion-item>
    </ts-accordion>
  </div>
`;
