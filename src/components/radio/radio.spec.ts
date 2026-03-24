import { newSpecPage } from '@stencil/core/testing';
import { TsRadio } from './radio';

describe('ts-radio', () => {
  it('renders unchecked by default', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio>Option A</ts-radio>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="radio"]');
    expect(el?.getAttribute('aria-checked')).toBe('false');
  });

  it('renders checked state', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio checked>Option A</ts-radio>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="radio"]');
    expect(el?.getAttribute('aria-checked')).toBe('true');
  });

  it('renders the label prop as text', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio label="Option B"></ts-radio>',
    });

    const label = page.root?.shadowRoot?.querySelector('.radio__label');
    expect(label?.textContent).toContain('Option B');
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio size="lg">Large</ts-radio>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('emits tsChange on click', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio value="a">Option A</ts-radio>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.radio__base');
    base?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'a' });
  });

  it('does not emit tsChange when already checked', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio checked value="a">Option A</ts-radio>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.radio__base');
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit tsChange when disabled', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio disabled>Disabled</ts-radio>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.radio__base');
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('has correct ARIA attributes when disabled', async () => {
    const page = await newSpecPage({
      components: [TsRadio],
      html: '<ts-radio disabled>Disabled</ts-radio>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="radio"]');
    expect(el?.getAttribute('aria-disabled')).toBe('true');
    expect(el?.getAttribute('tabindex')).toBe('-1');
  });
});
