import { newSpecPage } from '@stencil/core/testing';
import { TsCommandPalette } from './command-palette';
import { TsCommandPaletteItem } from './command-palette-item';

describe('ts-command-palette', () => {
  it('renders when open', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette, TsCommandPaletteItem],
      html: `
        <ts-command-palette open>
          <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
          <ts-command-palette-item value="open" label="Open File"></ts-command-palette-item>
        </ts-command-palette>
      `,
    });

    const overlay = page.root?.shadowRoot?.querySelector('.command-palette__overlay');
    expect(overlay).not.toBeNull();

    const input = page.root?.shadowRoot?.querySelector('.command-palette__input');
    expect(input).not.toBeNull();
  });

  it('does not render when closed', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette],
      html: '<ts-command-palette></ts-command-palette>',
    });

    const overlay = page.root?.shadowRoot?.querySelector('.command-palette__overlay');
    expect(overlay).toBeNull();
  });

  it('filters items by search query', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette, TsCommandPaletteItem],
      html: `
        <ts-command-palette open>
          <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
          <ts-command-palette-item value="open" label="Open File"></ts-command-palette-item>
          <ts-command-palette-item value="delete" label="Delete File"></ts-command-palette-item>
        </ts-command-palette>
      `,
    });

    const input = page.root?.shadowRoot?.querySelector('.command-palette__input') as HTMLInputElement;
    expect(input).not.toBeNull();

    // Simulate typing "save"
    input.value = 'save';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    // Items that don't match should be hidden
    const items = page.root?.querySelectorAll('ts-command-palette-item');
    const visibleItems = Array.from(items || []).filter(
      (item) => (item as HTMLElement).style.display !== 'none',
    );
    expect(visibleItems.length).toBe(1);
  });

  it('closes on Escape key', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette, TsCommandPaletteItem],
      html: `
        <ts-command-palette open>
          <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
        </ts-command-palette>
      `,
    });

    expect(page.root?.open).toBe(true);

    const panel = page.root?.shadowRoot?.querySelector('.command-palette__panel') as HTMLElement;
    panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();

    expect(page.root?.open).toBe(false);
  });

  it('navigates items with arrow keys', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette, TsCommandPaletteItem],
      html: `
        <ts-command-palette open>
          <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
          <ts-command-palette-item value="open" label="Open File"></ts-command-palette-item>
        </ts-command-palette>
      `,
    });

    const panel = page.root?.shadowRoot?.querySelector('.command-palette__panel') as HTMLElement;

    // First item should be focused by default
    let items = page.root?.querySelectorAll('ts-command-palette-item');
    expect(items?.[0]?.getAttribute('data-focused')).toBe('true');
    expect(items?.[1]?.getAttribute('data-focused')).toBe('false');

    // Press ArrowDown
    panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await page.waitForChanges();

    items = page.root?.querySelectorAll('ts-command-palette-item');
    expect(items?.[0]?.getAttribute('data-focused')).toBe('false');
    expect(items?.[1]?.getAttribute('data-focused')).toBe('true');
  });

  it('emits tsSelect on Enter', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette, TsCommandPaletteItem],
      html: `
        <ts-command-palette open>
          <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
        </ts-command-palette>
      `,
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSelect', spy);

    const panel = page.root?.shadowRoot?.querySelector('.command-palette__panel') as HTMLElement;
    panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'save' });
  });

  it('reflects open prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsCommandPalette],
      html: '<ts-command-palette open></ts-command-palette>',
    });

    expect(page.root).toHaveAttribute('open');
  });
});
