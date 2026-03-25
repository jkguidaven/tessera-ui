import { newSpecPage } from '@stencil/core/testing';
import { TsScrollArea } from './scroll-area';

describe('ts-scroll-area', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area><p>Content</p></ts-scroll-area>',
    });

    const viewport = page.root?.shadowRoot?.querySelector('.scroll-area__viewport');
    expect(viewport).not.toBeNull();
    expect(viewport).toHaveClass('scroll-area__viewport--vertical');
    expect(viewport).not.toHaveClass('scroll-area__viewport--horizontal');
  });

  it('applies maxHeight as inline style', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area max-height="300px"><p>Content</p></ts-scroll-area>',
    });

    const viewport = page.root?.shadowRoot?.querySelector('.scroll-area__viewport') as HTMLElement;
    expect(viewport.style.maxHeight).toBe('300px');
  });

  it('applies vertical orientation class by default', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area><p>Content</p></ts-scroll-area>',
    });

    const viewport = page.root?.shadowRoot?.querySelector('.scroll-area__viewport');
    expect(viewport).toHaveClass('scroll-area__viewport--vertical');
  });

  it('applies horizontal orientation class', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area orientation="horizontal"><p>Content</p></ts-scroll-area>',
    });

    const viewport = page.root?.shadowRoot?.querySelector('.scroll-area__viewport');
    expect(viewport).toHaveClass('scroll-area__viewport--horizontal');
    expect(viewport).not.toHaveClass('scroll-area__viewport--vertical');
  });

  it('applies both orientation classes when set to both', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area orientation="both"><p>Content</p></ts-scroll-area>',
    });

    const viewport = page.root?.shadowRoot?.querySelector('.scroll-area__viewport');
    expect(viewport).toHaveClass('scroll-area__viewport--vertical');
    expect(viewport).toHaveClass('scroll-area__viewport--horizontal');
  });

  it('reflects orientation prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsScrollArea],
      html: '<ts-scroll-area orientation="horizontal"><p>Content</p></ts-scroll-area>',
    });

    expect(page.root?.getAttribute('orientation')).toBe('horizontal');
  });
});
