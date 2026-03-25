import { newSpecPage } from '@stencil/core/testing';
import { TsMenu } from './menu';
import { TsMenuItem } from './menu-item';

describe('ts-menu', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu><button slot="trigger">Open</button></ts-menu>',
    });

    expect(page.root).not.toBeNull();
    const trigger = page.root?.shadowRoot?.querySelector('.menu__trigger');
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders the panel with role="menu"', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu><button slot="trigger">Open</button></ts-menu>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.menu__panel');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('role')).toBe('menu');
  });

  it('reflects open prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu open><button slot="trigger">Open</button></ts-menu>',
    });

    expect(page.root).toHaveAttribute('open');
    const panel = page.root?.shadowRoot?.querySelector('.menu__panel');
    expect(panel?.classList.contains('menu__panel--open')).toBe(true);
  });

  it('reflects placement prop to panel class', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu placement="top-end"><button slot="trigger">Open</button></ts-menu>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.menu__panel');
    expect(panel?.classList.contains('menu__panel--top-end')).toBe(true);
  });

  it('sets aria-expanded to true when open', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu open><button slot="trigger">Open</button></ts-menu>',
    });

    const trigger = page.root?.shadowRoot?.querySelector('.menu__trigger');
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });

  it('sets aria-hidden on panel when closed', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu><button slot="trigger">Open</button></ts-menu>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.menu__panel');
    expect(panel?.getAttribute('aria-hidden')).toBe('true');
  });

  it('defaults trigger to click', async () => {
    const page = await newSpecPage({
      components: [TsMenu],
      html: '<ts-menu><button slot="trigger">Open</button></ts-menu>',
    });

    expect(page.root?.getAttribute('trigger')).toBe('click');
  });
});

describe('ts-menu-item', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item>Item 1</ts-menu-item>',
    });

    const base = page.root?.shadowRoot?.querySelector('.menu-item__base');
    expect(base).not.toBeNull();
    expect(base?.getAttribute('role')).toBe('menuitem');
    expect(base?.getAttribute('tabindex')).toBe('0');
  });

  it('reflects disabled prop', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item disabled>Disabled</ts-menu-item>',
    });

    expect(page.root).toHaveAttribute('disabled');
    const base = page.root?.shadowRoot?.querySelector('.menu-item__base');
    expect(base?.getAttribute('aria-disabled')).toBe('true');
    expect(base?.getAttribute('tabindex')).toBe('-1');
  });

  it('renders as a link when href is provided', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item href="https://example.com">Link</ts-menu-item>',
    });

    const anchor = page.root?.shadowRoot?.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('https://example.com');
    expect(anchor?.getAttribute('role')).toBe('menuitem');
  });

  it('emits tsSelect event on click', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item value="edit">Edit</ts-menu-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSelect', spy);

    const base = page.root?.shadowRoot?.querySelector('.menu-item__base') as HTMLElement;
    base?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'edit' });
  });

  it('does NOT emit tsSelect when disabled', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item disabled value="edit">Edit</ts-menu-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSelect', spy);

    const base = page.root?.shadowRoot?.querySelector('.menu-item__base') as HTMLElement;
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders prefix and suffix slots', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: `
        <ts-menu-item>
          <span slot="prefix">icon</span>
          Label
          <span slot="suffix">Ctrl+C</span>
        </ts-menu-item>
      `,
    });

    const prefix = page.root?.shadowRoot?.querySelector('.menu-item__prefix');
    const suffix = page.root?.shadowRoot?.querySelector('.menu-item__suffix');
    expect(prefix).not.toBeNull();
    expect(suffix).not.toBeNull();
  });

  it('renders checkbox type with menuitemcheckbox role', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item type="checkbox" value="option1">Option 1</ts-menu-item>',
    });

    const base = page.root?.shadowRoot?.querySelector('.menu-item__base');
    expect(base?.getAttribute('role')).toBe('menuitemcheckbox');
    expect(base?.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles checked on checkbox click', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item type="checkbox" value="opt">Toggle</ts-menu-item>',
    });

    const base = page.root?.shadowRoot?.querySelector('.menu-item__base') as HTMLElement;
    base?.click();
    await page.waitForChanges();

    expect(page.root?.getAttribute('checked')).not.toBeNull();
  });

  it('applies danger variant class', async () => {
    const page = await newSpecPage({
      components: [TsMenuItem],
      html: '<ts-menu-item variant="danger" value="delete">Delete</ts-menu-item>',
    });

    expect(page.root).toHaveClass('ts-menu-item--danger');
  });
});

describe('ts-menu-divider', () => {
  it('renders with role="separator"', async () => {
    const { TsMenuDivider } = await import('./menu-divider');
    const page = await newSpecPage({
      components: [TsMenuDivider],
      html: '<ts-menu-divider></ts-menu-divider>',
    });

    const divider = page.root?.shadowRoot?.querySelector('[role="separator"]');
    expect(divider).not.toBeNull();
  });
});
