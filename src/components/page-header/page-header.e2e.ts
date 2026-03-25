import { newE2EPage } from '@stencil/core/testing';

describe('ts-page-header e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-page-header heading="Dashboard"></ts-page-header>');

    const element = await page.find('ts-page-header');
    expect(element).toHaveClass('hydrated');
  });
});
