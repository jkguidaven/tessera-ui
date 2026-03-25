import { newE2EPage } from '@stencil/core/testing';

describe('ts-combobox e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-combobox>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </ts-combobox>
    `);

    const element = await page.find('ts-combobox');
    expect(element).toHaveClass('hydrated');
  });
});
