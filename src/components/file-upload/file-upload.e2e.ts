import { newE2EPage } from '@stencil/core/testing';

describe('ts-file-upload e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-file-upload></ts-file-upload>');

    const element = await page.find('ts-file-upload');
    expect(element).toHaveClass('hydrated');
  });

  it('is keyboard focusable', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-file-upload></ts-file-upload>');

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const host = document.querySelector('ts-file-upload');
      return host?.shadowRoot?.activeElement?.classList.contains('file-upload__dropzone');
    });

    expect(focused).toBe(true);
  });

  it('has correct ARIA attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-file-upload label="Upload files"></ts-file-upload>');

    const dropzone = await page.find('ts-file-upload >>> .file-upload__dropzone');
    expect(dropzone.getAttribute('role')).toBe('button');
    expect(dropzone.getAttribute('aria-label')).toBe('Upload files');
  });
});
