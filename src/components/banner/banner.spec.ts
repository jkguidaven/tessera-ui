import { newSpecPage } from '@stencil/core/testing';
import { TsBanner } from './banner';

describe('ts-banner', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner>Hello</ts-banner>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('banner');
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner variant="success">Done</ts-banner>',
    });

    expect(page.root?.getAttribute('variant')).toBe('success');
  });

  it('uses alert role for danger variant', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner variant="danger">Error!</ts-banner>',
    });

    expect(page.root?.getAttribute('role')).toBe('alert');
    expect(page.root?.getAttribute('aria-live')).toBe('assertive');
  });

  it('renders close button when dismissible', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner dismissible>Info</ts-banner>',
    });

    const close = page.root?.shadowRoot?.querySelector('.banner__close');
    expect(close).not.toBeNull();
    expect(close?.getAttribute('aria-label')).toBe('Dismiss banner');
  });

  it('does not render close button when not dismissible', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner>Info</ts-banner>',
    });

    const close = page.root?.shadowRoot?.querySelector('.banner__close');
    expect(close).toBeNull();
  });

  it('emits tsClose event when close is clicked', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner dismissible>Info</ts-banner>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    const close = page.root?.shadowRoot?.querySelector('.banner__close') as HTMLButtonElement;
    close?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('hides content after close', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner dismissible>Info</ts-banner>',
    });

    const close = page.root?.shadowRoot?.querySelector('.banner__close') as HTMLButtonElement;
    close?.click();
    await page.waitForChanges();

    const base = page.root?.shadowRoot?.querySelector('.banner__base');
    expect(base).toBeNull();
  });

  it('applies sticky class when sticky prop is set', async () => {
    const page = await newSpecPage({
      components: [TsBanner],
      html: '<ts-banner sticky>Sticky</ts-banner>',
    });

    expect(page.root).toHaveAttribute('sticky');
    expect(page.root?.classList.contains('ts-banner--sticky')).toBe(true);
  });
});
