import { newSpecPage } from '@stencil/core/testing';
import { TsStack } from './stack';

describe('ts-stack', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack></ts-stack>',
    });

    expect(page.root).not.toBeNull();
  });

  it('applies default gap style', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack></ts-stack>',
    });

    expect(page.root?.style.gap).toBe('var(--ts-spacing-3)');
  });

  it('applies custom gap style', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack gap="6"></ts-stack>',
    });

    expect(page.root?.style.gap).toBe('var(--ts-spacing-6)');
  });

  it('applies default align-items stretch', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack></ts-stack>',
    });

    expect(page.root?.style.alignItems).toBe('stretch');
  });

  it('applies align center', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack align="center"></ts-stack>',
    });

    expect(page.root?.style.alignItems).toBe('center');
  });

  it('applies align start as flex-start', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack align="start"></ts-stack>',
    });

    expect(page.root?.style.alignItems).toBe('flex-start');
  });

  it('applies align end as flex-end', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack align="end"></ts-stack>',
    });

    expect(page.root?.style.alignItems).toBe('flex-end');
  });

  it('reflects gap prop as attribute', async () => {
    const page = await newSpecPage({
      components: [TsStack],
      html: '<ts-stack gap="8"></ts-stack>',
    });

    expect(page.root?.getAttribute('gap')).toBe('8');
  });
});
