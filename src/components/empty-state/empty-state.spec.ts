import { newSpecPage } from '@stencil/core/testing';
import { TsEmptyState } from './empty-state';

describe('ts-empty-state', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: '<ts-empty-state></ts-empty-state>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.classList.contains('ts-empty-state')).toBe(true);
  });

  it('renders heading text', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: '<ts-empty-state heading="No data"></ts-empty-state>',
    });

    const heading = page.root?.shadowRoot?.querySelector('.empty-state__heading');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toBe('No data');
  });

  it('renders description text', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: '<ts-empty-state description="Nothing to show"></ts-empty-state>',
    });

    const desc = page.root?.shadowRoot?.querySelector('.empty-state__description');
    expect(desc).not.toBeNull();
    expect(desc?.textContent).toBe('Nothing to show');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: '<ts-empty-state size="lg"></ts-empty-state>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
    expect(page.root?.classList.contains('ts-empty-state--lg')).toBe(true);
  });

  it('renders with all slots', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: `
        <ts-empty-state heading="Empty" description="Nothing here">
          <span slot="icon">ICON</span>
          <p>Custom content</p>
          <button slot="action">Add Item</button>
        </ts-empty-state>
      `,
    });

    const base = page.root?.shadowRoot?.querySelector('.empty-state__base');
    expect(base).not.toBeNull();
    expect(base?.getAttribute('part')).toBe('base');
  });

  it('uses semantic heading element', async () => {
    const page = await newSpecPage({
      components: [TsEmptyState],
      html: '<ts-empty-state heading="Title"></ts-empty-state>',
    });

    const h3 = page.root?.shadowRoot?.querySelector('h3');
    expect(h3).not.toBeNull();
  });
});
