import { newSpecPage } from '@stencil/core/testing';
import { TsGrid } from './grid';

describe('ts-grid', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid></ts-grid>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.tagName.toLowerCase()).toBe('ts-grid');
  });

  it('uses auto-fill columns by default', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.gridTemplateColumns).toContain('auto-fill');
    expect(style?.gridTemplateColumns).toContain('280px');
  });

  it('uses fixed columns when columns prop is a number', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid columns="3"></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('applies gap from spacing token', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid gap="6"></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.gap).toBe('var(--ts-spacing-6)');
  });

  it('applies default gap token', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.gap).toBe('var(--ts-spacing-4)');
  });

  it('applies align-items from align prop', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid align="center"></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.alignItems).toBe('center');
  });

  it('uses custom minColumnWidth', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid min-column-width="200px"></ts-grid>',
    });

    const style = page.root?.style;
    expect(style?.gridTemplateColumns).toContain('200px');
  });

  it('reflects columns prop', async () => {
    const page = await newSpecPage({
      components: [TsGrid],
      html: '<ts-grid columns="4"></ts-grid>',
    });

    expect(page.root?.getAttribute('columns')).toBe('4');
  });
});
