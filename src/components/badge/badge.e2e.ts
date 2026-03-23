import { newE2EPage } from '@stencil/core/testing';

describe('ts-badge e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-badge>New</ts-badge>');

    const element = await page.find('ts-badge');
    expect(element).toHaveClass('hydrated');
  });
});
