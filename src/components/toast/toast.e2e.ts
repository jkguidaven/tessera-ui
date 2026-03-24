import { newE2EPage } from '@stencil/core/testing';

describe('ts-toast e2e', () => {
  it('renders on the page when open', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toast open>Hello</ts-toast>');

    const element = await page.find('ts-toast');
    expect(element).toHaveClass('hydrated');
  });

  it('fires tsClose when close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toast open>Message</ts-toast>');

    const tsClose = await page.spyOnEvent('tsClose');

    const closeBtn = await page.find('ts-toast >>> .toast__close');
    await closeBtn.click();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('has correct role and aria-live attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toast open variant="danger">Error</ts-toast>');

    const element = await page.find('ts-toast');
    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-live')).toBe('assertive');
  });

  it('does not render content when not open', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toast>Hidden</ts-toast>');

    const base = await page.find('ts-toast >>> .toast__base');
    expect(base).toBeNull();
  });
});
