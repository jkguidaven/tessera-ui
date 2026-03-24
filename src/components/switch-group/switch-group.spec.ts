import { newSpecPage } from '@stencil/core/testing';
import { TsSwitchGroup } from './switch-group';
import { TsSwitchOption } from './switch-option';

describe('ts-switch-group', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group></ts-switch-group>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('radiogroup');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group size="lg"></ts-switch-group>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('reflects disabled prop', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group disabled></ts-switch-group>',
    });

    expect(page.root).toHaveAttribute('disabled');
  });

  it('reflects fullWidth prop', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group full-width></ts-switch-group>',
    });

    expect(page.root).toHaveAttribute('full-width');
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group><div>option</div></ts-switch-group>',
    });

    const base = page.root?.shadowRoot?.querySelector('.switch-group__base');
    expect(base).not.toBeNull();
  });

  it('applies correct size class', async () => {
    const page = await newSpecPage({
      components: [TsSwitchGroup],
      html: '<ts-switch-group size="sm"></ts-switch-group>',
    });

    expect(page.root?.classList.contains('ts-switch-group--sm')).toBe(true);
  });
});

describe('ts-switch-option', () => {
  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [TsSwitchOption],
      html: '<ts-switch-option value="opt1">Option 1</ts-switch-option>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('radio');
    expect(page.root?.getAttribute('value')).toBe('opt1');
  });

  it('reflects active state', async () => {
    const page = await newSpecPage({
      components: [TsSwitchOption],
      html: '<ts-switch-option value="opt1" active>Option 1</ts-switch-option>',
    });

    expect(page.root?.getAttribute('aria-checked')).toBe('true');
    expect(page.root?.getAttribute('tabindex')).toBe('0');
  });

  it('inactive option has tabindex -1', async () => {
    const page = await newSpecPage({
      components: [TsSwitchOption],
      html: '<ts-switch-option value="opt1">Option 1</ts-switch-option>',
    });

    expect(page.root?.getAttribute('aria-checked')).toBe('false');
    expect(page.root?.getAttribute('tabindex')).toBe('-1');
  });

  it('reflects disabled prop', async () => {
    const page = await newSpecPage({
      components: [TsSwitchOption],
      html: '<ts-switch-option value="opt1" disabled>Option 1</ts-switch-option>',
    });

    expect(page.root?.getAttribute('aria-disabled')).toBe('true');
  });
});
