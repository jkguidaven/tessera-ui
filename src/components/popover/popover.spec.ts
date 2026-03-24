import { newSpecPage } from '@stencil/core/testing';
import { TsPopover } from './popover';

describe('ts-popover', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.popover__panel');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('role')).toBe('dialog');
  });

  it('is hidden by default', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.popover__panel');
    expect(panel?.getAttribute('aria-hidden')).toBe('true');
    expect(panel?.classList.contains('popover__panel--visible')).toBe(false);
  });

  it('shows panel when open is set', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover open><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.popover__panel');
    expect(panel?.classList.contains('popover__panel--visible')).toBe(true);
  });

  it('has aria-expanded on trigger', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const trigger = page.root?.shadowRoot?.querySelector('.popover__trigger');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-expanded to true when open', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover open><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const trigger = page.root?.shadowRoot?.querySelector('.popover__trigger');
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });

  it('reflects placement to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover placement="top"><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    expect(page.root?.getAttribute('placement')).toBe('top');
  });

  it('emits tsOpen when opened', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsOpen', spy);

    page.root!.open = true;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('emits tsClose when closed', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover open><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    page.root!.open = false;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders arrow element', async () => {
    const page = await newSpecPage({
      components: [TsPopover],
      html: '<ts-popover open><button slot="trigger">Open</button><p>Content</p></ts-popover>',
    });

    const arrow = page.root?.shadowRoot?.querySelector('.popover__arrow');
    expect(arrow).not.toBeNull();
  });
});
