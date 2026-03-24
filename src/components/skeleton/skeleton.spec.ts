import { newSpecPage } from '@stencil/core/testing';
import { TsSkeleton } from './skeleton';

describe('ts-skeleton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton></ts-skeleton>',
    });

    expect(page.root).toHaveAttribute('aria-hidden');
    expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    const base = page.root?.shadowRoot?.querySelector('.skeleton__base');
    expect(base).not.toBeNull();
  });

  it('renders single line for text variant by default', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton></ts-skeleton>',
    });

    const lines = page.root?.shadowRoot?.querySelectorAll('.skeleton__line');
    expect(lines?.length).toBe(1);
  });

  it('renders multiple lines when lines prop is set', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton lines="3"></ts-skeleton>',
    });

    const lines = page.root?.shadowRoot?.querySelectorAll('.skeleton__line');
    expect(lines?.length).toBe(3);
  });

  it('marks last line shorter when multiple lines', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton lines="3"></ts-skeleton>',
    });

    const lines = page.root?.shadowRoot?.querySelectorAll('.skeleton__line');
    const lastLine = lines?.[2];
    expect(lastLine?.classList.contains('skeleton__line--last')).toBe(true);
  });

  it('reflects variant to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton variant="circular"></ts-skeleton>',
    });

    expect(page.root?.getAttribute('variant')).toBe('circular');
  });

  it('renders circular variant without lines', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton variant="circular" width="48px" height="48px"></ts-skeleton>',
    });

    const lines = page.root?.shadowRoot?.querySelectorAll('.skeleton__line');
    expect(lines?.length).toBe(0);
  });

  it('reflects animation to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton animation="wave"></ts-skeleton>',
    });

    expect(page.root?.getAttribute('animation')).toBe('wave');
  });

  it('applies width style', async () => {
    const page = await newSpecPage({
      components: [TsSkeleton],
      html: '<ts-skeleton width="200px"></ts-skeleton>',
    });

    expect(page.root?.style.width).toBe('200px');
  });
});
