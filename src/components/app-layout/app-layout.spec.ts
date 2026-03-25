import { newSpecPage } from '@stencil/core/testing';
import { TsAppLayout } from './app-layout';

describe('ts-app-layout', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsAppLayout],
      html: '<ts-app-layout></ts-app-layout>',
    });

    expect(page.root).not.toBeNull();
    const sidebar = page.root?.shadowRoot?.querySelector('.app-layout__sidebar');
    const header = page.root?.shadowRoot?.querySelector('.app-layout__header');
    const content = page.root?.shadowRoot?.querySelector('.app-layout__content');
    expect(sidebar).not.toBeNull();
    expect(header).not.toBeNull();
    expect(content).not.toBeNull();
  });

  it('defaults sidebarPlacement to start', async () => {
    const page = await newSpecPage({
      components: [TsAppLayout],
      html: '<ts-app-layout></ts-app-layout>',
    });

    expect(page.root?.getAttribute('sidebar-placement')).toBe('start');
  });

  it('applies sidebar-end class when sidebarPlacement is end', async () => {
    const page = await newSpecPage({
      components: [TsAppLayout],
      html: '<ts-app-layout sidebar-placement="end"></ts-app-layout>',
    });

    expect(page.root?.getAttribute('sidebar-placement')).toBe('end');
    expect(page.root?.classList.contains('ts-app-layout--sidebar-end')).toBe(true);
  });

  it('has named slots for sidebar and header', async () => {
    const page = await newSpecPage({
      components: [TsAppLayout],
      html: `
        <ts-app-layout>
          <div slot="sidebar">Sidebar</div>
          <div slot="header">Header</div>
          <p>Main content</p>
        </ts-app-layout>
      `,
    });

    const sidebarSlot = page.root?.shadowRoot?.querySelector('slot[name="sidebar"]');
    const headerSlot = page.root?.shadowRoot?.querySelector('slot[name="header"]');
    const defaultSlot = page.root?.shadowRoot?.querySelector('slot:not([name])');
    expect(sidebarSlot).not.toBeNull();
    expect(headerSlot).not.toBeNull();
    expect(defaultSlot).not.toBeNull();
  });

  it('exposes CSS parts', async () => {
    const page = await newSpecPage({
      components: [TsAppLayout],
      html: '<ts-app-layout></ts-app-layout>',
    });

    const sidebar = page.root?.shadowRoot?.querySelector('[part="sidebar"]');
    const header = page.root?.shadowRoot?.querySelector('[part="header"]');
    const content = page.root?.shadowRoot?.querySelector('[part="content"]');
    expect(sidebar).not.toBeNull();
    expect(header).not.toBeNull();
    expect(content).not.toBeNull();
  });
});
