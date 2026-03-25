import { newSpecPage } from '@stencil/core/testing';
import { TsSidebar } from './sidebar';

describe('ts-sidebar', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar>Nav content</ts-sidebar>',
    });

    const container = page.root?.shadowRoot?.querySelector('.sidebar__container');
    expect(container).not.toBeNull();
    expect(page.root?.getAttribute('collapsed')).toBeNull();
  });

  it('applies collapsed class when collapsed prop is set', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar collapsed>Nav content</ts-sidebar>',
    });

    expect(page.root).toHaveClass('ts-sidebar--collapsed');
    expect(page.root).toHaveAttribute('collapsed');
  });

  it('renders toggle button when collapsible', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar collapsible>Nav content</ts-sidebar>',
    });

    const toggle = page.root?.shadowRoot?.querySelector('.sidebar__toggle');
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute('aria-label')).toBe('Collapse sidebar');
  });

  it('does not render toggle button when not collapsible', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar>Nav content</ts-sidebar>',
    });

    const toggle = page.root?.shadowRoot?.querySelector('.sidebar__toggle');
    expect(toggle).toBeNull();
  });

  it('applies custom width via style', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar width="300px">Nav content</ts-sidebar>',
    });

    expect(page.root?.style.width).toBe('300px');
  });

  it('sets width to 64px when collapsed', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar collapsed>Nav content</ts-sidebar>',
    });

    expect(page.root?.style.width).toBe('64px');
  });

  it('emits tsToggle when collapsed changes', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: '<ts-sidebar collapsible>Nav content</ts-sidebar>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsToggle', spy);

    const toggle = page.root?.shadowRoot?.querySelector('.sidebar__toggle') as HTMLButtonElement;
    toggle?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ collapsed: true });
  });

  it('renders header, default, and footer slots', async () => {
    const page = await newSpecPage({
      components: [TsSidebar],
      html: `
        <ts-sidebar>
          <div slot="header">Header</div>
          <nav>Navigation</nav>
          <div slot="footer">Footer</div>
        </ts-sidebar>
      `,
    });

    const header = page.root?.shadowRoot?.querySelector('.sidebar__header');
    const content = page.root?.shadowRoot?.querySelector('.sidebar__content');
    const footer = page.root?.shadowRoot?.querySelector('.sidebar__footer');
    expect(header).not.toBeNull();
    expect(content).not.toBeNull();
    expect(footer).not.toBeNull();
  });
});
