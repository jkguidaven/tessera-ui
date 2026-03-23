import { newSpecPage } from '@stencil/core/testing';
import { TsToggle } from './toggle';

describe('ts-toggle', () => {
  it('renders unchecked by default', async () => {
    const page = await newSpecPage({
      components: [TsToggle],
      html: '<ts-toggle>Dark mode</ts-toggle>',
    });

    const switchEl = page.root?.shadowRoot?.querySelector('[role="switch"]');
    expect(switchEl?.getAttribute('aria-checked')).toBe('false');
  });

  it('renders checked state', async () => {
    const page = await newSpecPage({
      components: [TsToggle],
      html: '<ts-toggle checked>Enabled</ts-toggle>',
    });

    const switchEl = page.root?.shadowRoot?.querySelector('[role="switch"]');
    expect(switchEl?.getAttribute('aria-checked')).toBe('true');
  });

  it('emits tsChange on click', async () => {
    const page = await newSpecPage({
      components: [TsToggle],
      html: '<ts-toggle>Toggle</ts-toggle>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.toggle__base');
    base?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.checked).toBe(true);
  });

  it('does not toggle when disabled', async () => {
    const page = await newSpecPage({
      components: [TsToggle],
      html: '<ts-toggle disabled>Disabled</ts-toggle>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.toggle__base');
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('has correct ARIA attributes when disabled', async () => {
    const page = await newSpecPage({
      components: [TsToggle],
      html: '<ts-toggle disabled>Disabled</ts-toggle>',
    });

    const switchEl = page.root?.shadowRoot?.querySelector('[role="switch"]');
    expect(switchEl?.getAttribute('aria-disabled')).toBe('true');
    expect(switchEl?.getAttribute('tabindex')).toBe('-1');
  });
});
