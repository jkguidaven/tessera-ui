import { newSpecPage } from '@stencil/core/testing';
import { TsToolbar } from './toolbar';

describe('ts-toolbar', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar></ts-toolbar>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('toolbar');
    expect(page.root?.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar variant="bordered"></ts-toolbar>',
    });

    expect(page.root?.getAttribute('variant')).toBe('bordered');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar size="lg"></ts-toolbar>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('applies variant class to host', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar variant="elevated"></ts-toolbar>',
    });

    expect(page.root?.classList.contains('ts-toolbar--elevated')).toBe(true);
  });

  it('renders start, center, and end sections', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar></ts-toolbar>',
    });

    const start = page.root?.shadowRoot?.querySelector('.toolbar__start');
    const center = page.root?.shadowRoot?.querySelector('.toolbar__center');
    const end = page.root?.shadowRoot?.querySelector('.toolbar__end');
    expect(start).not.toBeNull();
    expect(center).not.toBeNull();
    expect(end).not.toBeNull();
  });

  it('has correct part attributes', async () => {
    const page = await newSpecPage({
      components: [TsToolbar],
      html: '<ts-toolbar></ts-toolbar>',
    });

    const base = page.root?.shadowRoot?.querySelector('.toolbar__base');
    expect(base?.getAttribute('part')).toBe('base');
  });
});
