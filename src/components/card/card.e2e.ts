import { newE2EPage } from '@stencil/core/testing';

describe('ts-card e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-card>Hello</ts-card>');

    const element = await page.find('ts-card');
    expect(element).toHaveClass('hydrated');
  });

  it('is focusable when interactive', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-card interactive>Clickable card</ts-card>');

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focused).toBe('ts-card');
  });
});
