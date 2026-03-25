import { newE2EPage } from '@stencil/core/testing';

describe('ts-sidebar e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-sidebar>Navigation</ts-sidebar>');

    const element = await page.find('ts-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});
