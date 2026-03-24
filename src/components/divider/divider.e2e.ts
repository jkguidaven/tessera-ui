import { newE2EPage } from '@stencil/core/testing';

describe('ts-divider e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-divider></ts-divider>');

    const element = await page.find('ts-divider');
    expect(element).toHaveClass('hydrated');
  });

  it('has separator role and aria-orientation', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-divider orientation="vertical"></ts-divider>');

    const element = await page.find('ts-divider');
    expect(element.getAttribute('role')).toBe('separator');
    expect(element.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders label text when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-divider label="OR"></ts-divider>');

    const label = await page.find('ts-divider >>> .divider__label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('OR');
  });
});
