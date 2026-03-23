import { newSpecPage } from '@stencil/core/testing';
import { TsBadge } from './badge';

describe('ts-badge', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsBadge],
      html: '<ts-badge>New</ts-badge>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('variant')).toBe('primary');
    expect(page.root?.getAttribute('size')).toBe('md');
  });

  it('renders as a dot', async () => {
    const page = await newSpecPage({
      components: [TsBadge],
      html: '<ts-badge dot></ts-badge>',
    });

    expect(page.root).toHaveAttribute('dot');
    // Dot should hide slotted content
    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).toBeNull();
  });

  it('renders as pill', async () => {
    const page = await newSpecPage({
      components: [TsBadge],
      html: '<ts-badge pill>Status</ts-badge>',
    });

    expect(page.root).toHaveAttribute('pill');
  });

  it('renders outline variant', async () => {
    const page = await newSpecPage({
      components: [TsBadge],
      html: '<ts-badge outline variant="danger">Alert</ts-badge>',
    });

    expect(page.root).toHaveAttribute('outline');
    expect(page.root?.getAttribute('variant')).toBe('danger');
  });
});
