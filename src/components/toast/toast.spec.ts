import { newSpecPage } from '@stencil/core/testing';
import { TsToast } from './toast';

describe('ts-toast', () => {
  it('always renders the live region container in the DOM', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast>Message</ts-toast>',
    });

    // The Host element should always have role="status" and aria-live
    expect(page.root?.getAttribute('role')).toBe('status');
    expect(page.root?.getAttribute('aria-live')).toBe('polite');
  });

  it('renders empty container when not open (no visible content)', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast>Message</ts-toast>',
    });

    const base = page.root?.shadowRoot?.querySelector('.toast__base');
    expect(base).toBeNull();
  });

  it('renders content when open is set', async () => {
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

  it('sets aria-live on the container even when not open', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast variant="danger">Error!</ts-toast>',
    });

    expect(page.root?.getAttribute('role')).toBe('status');
    expect(page.root?.getAttribute('aria-live')).toBe('assertive');
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

  it('renders progress bar when showProgress is true and open', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open show-progress duration="5000">Message</ts-toast>',
    });

    const progress = page.root?.shadowRoot?.querySelector('.toast__progress');
    expect(progress).not.toBeNull();
  });

  it('does not render progress bar when showProgress is false', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open duration="5000">Message</ts-toast>',
    });

    const progress = page.root?.shadowRoot?.querySelector('.toast__progress');
    expect(progress).toBeNull();
  });

  it('does not render progress bar when duration is 0', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open show-progress duration="0">Message</ts-toast>',
    });

    const progress = page.root?.shadowRoot?.querySelector('.toast__progress');
    expect(progress).toBeNull();
  });

  it('sets isPaused state on mouseenter and clears on mouseleave', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open pause-on-hover duration="5000">Message</ts-toast>',
    });

    const toast = page.rootInstance as TsToast;
    expect(toast.isPaused).toBe(false);

    const base = page.root?.shadowRoot?.querySelector('.toast__base') as HTMLElement;
    base?.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(toast.isPaused).toBe(true);

    base?.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    expect(toast.isPaused).toBe(false);
  });

  it('adds paused class to progress bar when hovered', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open show-progress pause-on-hover duration="5000">Message</ts-toast>',
    });

    const base = page.root?.shadowRoot?.querySelector('.toast__base') as HTMLElement;
    base?.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const progress = page.root?.shadowRoot?.querySelector('.toast__progress');
    expect(progress?.classList.contains('toast__progress--paused')).toBe(true);
  });

  it('has pauseOnHover defaulting to true', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast open>Message</ts-toast>',
    });

    const toast = page.rootInstance as TsToast;
    expect(toast.pauseOnHover).toBe(true);
  });

  it('populates content into existing live region when opened', async () => {
    const page = await newSpecPage({
      components: [TsToast],
      html: '<ts-toast>Message</ts-toast>',
    });

    // Initially no content
    let base = page.root?.shadowRoot?.querySelector('.toast__base');
    expect(base).toBeNull();
    // But live region exists
    expect(page.root?.getAttribute('role')).toBe('status');

    // Open the toast — content populates into existing live region
    page.root!.open = true;
    await page.waitForChanges();

    base = page.root?.shadowRoot?.querySelector('.toast__base');
    expect(base).not.toBeNull();
  });
});
