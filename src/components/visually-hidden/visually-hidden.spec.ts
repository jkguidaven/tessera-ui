import { newSpecPage } from '@stencil/core/testing';
import { TsVisuallyHidden } from './visually-hidden';

describe('ts-visually-hidden', () => {
  it('renders with default slot content', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden>Skip to main content</ts-visually-hidden>',
    });

    expect(page.root).not.toBeNull();
    const span = page.root?.shadowRoot?.querySelector('span');
    expect(span).not.toBeNull();
  });

  it('is present in the DOM', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden>Screen reader text</ts-visually-hidden>',
    });

    expect(page.root).toBeDefined();
    expect(page.root?.textContent).toBe('Screen reader text');
  });

  it('does not have focusable class by default', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden>Hidden text</ts-visually-hidden>',
    });

    expect(page.root).not.toHaveAttribute('focusable');
    expect(page.root?.classList.contains('focusable')).toBe(false);
  });

  it('applies focusable class when focusable prop is set', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden focusable>Skip to content</ts-visually-hidden>',
    });

    expect(page.root).toHaveAttribute('focusable');
    expect(page.root?.classList.contains('focusable')).toBe(true);
  });

  it('reflects focusable prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden focusable>Skip link</ts-visually-hidden>',
    });

    expect(page.root?.getAttribute('focusable')).not.toBeNull();
  });

  it('renders slot content inside a span', async () => {
    const page = await newSpecPage({
      components: [TsVisuallyHidden],
      html: '<ts-visually-hidden>Accessible label</ts-visually-hidden>',
    });

    const span = page.root?.shadowRoot?.querySelector('span');
    expect(span).not.toBeNull();
    const slot = span?.querySelector('slot');
    expect(slot).not.toBeNull();
  });
});
