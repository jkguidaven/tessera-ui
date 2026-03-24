import { newSpecPage } from '@stencil/core/testing';
import { TsSpacer } from './spacer';

describe('ts-spacer', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer></ts-spacer>',
    });

    expect(page.root).not.toBeNull();
  });

  it('applies default vertical spacing', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer></ts-spacer>',
    });

    expect(page.root?.style.height).toBe('var(--ts-spacing-4)');
    expect(page.root?.style.width).toBe('100%');
  });

  it('applies custom size', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer size="8"></ts-spacer>',
    });

    expect(page.root?.style.height).toBe('var(--ts-spacing-8)');
  });

  it('applies horizontal spacing', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer axis="horizontal"></ts-spacer>',
    });

    expect(page.root?.style.width).toBe('var(--ts-spacing-4)');
    expect(page.root?.style.height).toBe('100%');
  });

  it('reflects size prop as attribute', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer size="6"></ts-spacer>',
    });

    expect(page.root?.getAttribute('size')).toBe('6');
  });

  it('reflects axis prop as attribute', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer axis="horizontal"></ts-spacer>',
    });

    expect(page.root?.getAttribute('axis')).toBe('horizontal');
  });

  it('applies horizontal size correctly', async () => {
    const page = await newSpecPage({
      components: [TsSpacer],
      html: '<ts-spacer axis="horizontal" size="10"></ts-spacer>',
    });

    expect(page.root?.style.width).toBe('var(--ts-spacing-10)');
  });
});
