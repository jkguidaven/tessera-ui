import { newE2EPage } from '@stencil/core/testing';

describe('ts-spacer e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spacer></ts-spacer>');

    const element = await page.find('ts-spacer');
    expect(element).toHaveClass('hydrated');
  });

  it('renders as block by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spacer></ts-spacer>');

    const element = await page.find('ts-spacer');
    const display = await element.getComputedStyle();
    expect(display['display']).toBe('block');
  });

  it('applies size and axis attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spacer size="6" axis="horizontal"></ts-spacer>');

    const element = await page.find('ts-spacer');
    expect(element.getAttribute('size')).toBe('6');
    expect(element.getAttribute('axis')).toBe('horizontal');
  });
});
