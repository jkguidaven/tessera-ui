import { newSpecPage } from '@stencil/core/testing';
import { TsCard } from './card';

describe('ts-card', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsCard],
      html: '<ts-card>Content</ts-card>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('elevation')).toBe('sm');
    expect(page.root?.getAttribute('padding')).toBe('md');
  });

  it('reflects elevation prop', async () => {
    const page = await newSpecPage({
      components: [TsCard],
      html: '<ts-card elevation="lg">Content</ts-card>',
    });

    expect(page.root?.getAttribute('elevation')).toBe('lg');
  });

  it('adds interactive attributes', async () => {
    const page = await newSpecPage({
      components: [TsCard],
      html: '<ts-card interactive>Clickable</ts-card>',
    });

    expect(page.root?.getAttribute('role')).toBe('button');
    expect(page.root?.getAttribute('tabindex')).toBe('0');
  });

  it('does NOT add role/tabindex when not interactive', async () => {
    const page = await newSpecPage({
      components: [TsCard],
      html: '<ts-card>Static</ts-card>',
    });

    expect(page.root?.getAttribute('role')).toBeNull();
    expect(page.root?.getAttribute('tabindex')).toBeNull();
  });

  it('applies bordered class', async () => {
    const page = await newSpecPage({
      components: [TsCard],
      html: '<ts-card bordered>Bordered</ts-card>',
    });

    expect(page.root).toHaveAttribute('bordered');
  });
});
