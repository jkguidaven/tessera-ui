import { newSpecPage } from '@stencil/core/testing';
import { TsDrawer } from './drawer';

describe('ts-drawer', () => {
  it('renders nothing when closed', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer>Content</ts-drawer>',
    });

    expect(page.root?.shadowRoot?.querySelector('.drawer__panel')).toBeNull();
  });

  it('renders panel when open', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open>Content</ts-drawer>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.drawer__panel');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('role')).toBe('dialog');
    expect(panel?.getAttribute('aria-modal')).toBe('true');
  });

  it('uses heading as aria-label', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open heading="Settings">Content</ts-drawer>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.drawer__panel');
    expect(panel?.getAttribute('aria-label')).toBe('Settings');
  });

  it('displays heading text', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open heading="My Drawer">Content</ts-drawer>',
    });

    const title = page.root?.shadowRoot?.querySelector('.drawer__title');
    expect(title?.textContent).toBe('My Drawer');
  });

  it('reflects placement prop', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open placement="start">Content</ts-drawer>',
    });

    expect(page.root?.getAttribute('placement')).toBe('start');
    const panel = page.root?.shadowRoot?.querySelector('.drawer__panel');
    expect(panel?.classList.contains('drawer__panel--start')).toBe(true);
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open size="lg">Content</ts-drawer>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
    const panel = page.root?.shadowRoot?.querySelector('.drawer__panel');
    expect(panel?.classList.contains('drawer__panel--lg')).toBe(true);
  });

  it('hides close button when not dismissible', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open dismissible="false">Content</ts-drawer>',
    });

    const close = page.root?.shadowRoot?.querySelector('.drawer__close');
    expect(close).toBeNull();
  });

  it('emits tsClose when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: '<ts-drawer open heading="Test">Content</ts-drawer>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    const closeBtn = page.root?.shadowRoot?.querySelector('.drawer__close') as HTMLButtonElement;
    closeBtn?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders footer slot', async () => {
    const page = await newSpecPage({
      components: [TsDrawer],
      html: `
        <ts-drawer open heading="Test">
          <p>Body</p>
          <div slot="footer">Footer</div>
        </ts-drawer>
      `,
    });

    const footer = page.root?.shadowRoot?.querySelector('.drawer__footer');
    expect(footer).not.toBeNull();
  });
});
