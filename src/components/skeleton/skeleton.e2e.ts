import { newE2EPage } from '@stencil/core/testing';

describe('ts-skeleton e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-skeleton></ts-skeleton>');

    const element = await page.find('ts-skeleton');
    expect(element).toHaveClass('hydrated');
  });

  it('is hidden from assistive technology', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-skeleton></ts-skeleton>');

    const element = await page.find('ts-skeleton');
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders multiple lines for text variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-skeleton lines="4"></ts-skeleton>');

    const lines = await page.findAll('ts-skeleton >>> .skeleton__line');
    expect(lines.length).toBe(4);
  });

  it('renders circular variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-skeleton variant="circular" width="40px" height="40px"></ts-skeleton>');

    const element = await page.find('ts-skeleton');
    expect(element.getAttribute('variant')).toBe('circular');
  });
});
