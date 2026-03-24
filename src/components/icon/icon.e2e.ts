import { newE2EPage } from '@stencil/core/testing';

describe('ts-icon e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-icon><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20z"/></svg></ts-icon>');

    const element = await page.find('ts-icon');
    expect(element).toHaveClass('hydrated');
  });

  it('renders inline SVG via slot', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-icon><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></ts-icon>');

    const svg = await page.find('ts-icon > svg');
    expect(svg).not.toBeNull();
  });

  it('sets aria-hidden="true" when no label is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-icon><svg></svg></ts-icon>');

    const element = await page.find('ts-icon');
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets role="img" and aria-label when label is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-icon label="Close"><svg></svg></ts-icon>');

    const element = await page.find('ts-icon');
    expect(element.getAttribute('role')).toBe('img');
    expect(element.getAttribute('aria-label')).toBe('Close');
  });
});
