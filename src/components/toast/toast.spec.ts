import { newSpecPage } from '@stencil/core/testing';
import { TsToast } from './toast';

describe('ts-toast', () => {
  it('renders nothing when not open', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast>Message</ts-toast>',
    });

    const base = page.root?.shadowRoot?.querySelector('.toast__base');
    expect(base).toBeNull();
  });

  it('renders when open is set', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open>Message</ts-toast>',
    });

    const base = page.root?.shadowRoot?.querySelector('.toast__base');
    expect(base).not.toBeNull();
  });

  it('reflects variant to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open variant="success">Done!</ts-toast>',
    });

    expect(page.root?.getAttribute('variant')).toBe('success');
  });

  it('renders close button when dismissible', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open dismissible>Message</ts-toast>',
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.toast__close');
    expect(closeBtn).not.toBeNull();
    expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss notification');
  });

  it('does not render close button when dismissible is false', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open>Message</ts-toast>',
    });

    // Set dismissible to false
    page.root!.dismissible = false;
    await page.waitForChanges();

    const closeBtn = page.root?.shadowRoot?.querySelector('.toast__close');
    expect(closeBtn).toBeNull();
  });

  it('uses assertive aria-live for danger variant', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open variant="danger">Error!</ts-toast>',
    });

    expect(page.root?.getAttribute('aria-live')).toBe('assertive');
  });

  it('uses polite aria-live for non-danger variants', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open variant="info">Info</ts-toast>',
    });

    expect(page.root?.getAttribute('aria-live')).toBe('polite');
  });

  it('emits tsClose when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open>Message</ts-toast>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    const closeBtn = page.root?.shadowRoot?.querySelector('.toast__close') as HTMLButtonElement;
    closeBtn?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('reflects position to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open position="bottom-left">Message</ts-toast>',
    });

    expect(page.root?.getAttribute('position')).toBe('bottom-left');
  });
});
