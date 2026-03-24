import { newSpecPage } from '@stencil/core/testing';
import { TsCheckbox } from './checkbox';

describe('ts-checkbox', () => {
  it('renders unchecked by default', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox>Accept terms</ts-checkbox>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('false');
  });

  it('renders checked state', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox checked>Checked</ts-checkbox>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('true');
  });

  it('renders indeterminate state with aria-checked mixed', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox indeterminate>Mixed</ts-checkbox>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('mixed');
  });

  it('renders the label prop as text', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox label="My Label"></ts-checkbox>',
    });

    const label = page.root?.shadowRoot?.querySelector('.checkbox__label');
    expect(label?.textContent).toContain('My Label');
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox size="lg">Large</ts-checkbox>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('emits tsChange on click', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox value="agree">Agree</ts-checkbox>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.checkbox__base');
    base?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'agree' });
  });

  it('does not emit tsChange when disabled', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox disabled>Disabled</ts-checkbox>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const base = page.root?.shadowRoot?.querySelector<HTMLElement>('.checkbox__base');
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('has correct ARIA attributes when disabled', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox disabled>Disabled</ts-checkbox>',
    });

    const el = page.root?.shadowRoot?.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-disabled')).toBe('true');
    expect(el?.getAttribute('tabindex')).toBe('-1');
  });

  it('renders checkmark SVG when checked', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox checked>Checked</ts-checkbox>',
    });

    const svg = page.root?.shadowRoot?.querySelector('.checkbox__icon');
    expect(svg).not.toBeNull();
  });

  it('renders dash SVG when indeterminate', async () => {
    const page = await newSpecPage({
      components: [TsCheckbox],
      html: '<ts-checkbox indeterminate>Indeterminate</ts-checkbox>',
    });

    const svg = page.root?.shadowRoot?.querySelector('.checkbox__icon');
    expect(svg).not.toBeNull();
  });
});
