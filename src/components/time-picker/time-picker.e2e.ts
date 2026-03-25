import { newE2EPage } from '@stencil/core/testing';

describe('ts-time-picker e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-time-picker></ts-time-picker>');

    const element = await page.find('ts-time-picker');
    expect(element).toHaveClass('hydrated');
  });
});
