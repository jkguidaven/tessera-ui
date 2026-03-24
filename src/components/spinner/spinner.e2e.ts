import { newE2EPage } from '@stencil/core/testing';

describe('ts-spinner e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spinner></ts-spinner>');

    const element = await page.find('ts-spinner');
    expect(element).toHaveClass('hydrated');
  });

  it('has role="status" for accessibility', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spinner label="Loading data"></ts-spinner>');

    const element = await page.find('ts-spinner');
    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-label')).toBe('Loading data');
  });

  it('renders SVG animation element', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-spinner></ts-spinner>');

    const svg = await page.find('ts-spinner >>> svg');
    expect(svg).not.toBeNull();
  });
});
