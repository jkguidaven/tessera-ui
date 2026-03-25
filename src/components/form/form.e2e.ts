import { newE2EPage } from '@stencil/core/testing';

describe('ts-form e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-form></ts-form>');

    const element = await page.find('ts-form');
    expect(element).toHaveClass('hydrated');
  });
});
