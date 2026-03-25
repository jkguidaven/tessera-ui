import { newE2EPage } from '@stencil/core/testing';

describe('ts-visually-hidden e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-visually-hidden>Screen reader text</ts-visually-hidden>');

    const element = await page.find('ts-visually-hidden');
    expect(element).toHaveClass('hydrated');
  });

  it('content is in the accessibility tree', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-visually-hidden>Important announcement</ts-visually-hidden>');

    const text = await page.evaluate(() => {
      const el = document.querySelector('ts-visually-hidden');
      return el?.textContent?.trim();
    });

    expect(text).toBe('Important announcement');
  });

  it('is visually hidden with clip styles', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-visually-hidden>Hidden text</ts-visually-hidden>');

    const dimensions = await page.evaluate(() => {
      const el = document.querySelector('ts-visually-hidden');
      const styles = window.getComputedStyle(el!);
      return {
        position: styles.position,
        width: styles.width,
        height: styles.height,
        overflow: styles.overflow,
      };
    });

    expect(dimensions.position).toBe('absolute');
    expect(dimensions.width).toBe('1px');
    expect(dimensions.height).toBe('1px');
    expect(dimensions.overflow).toBe('hidden');
  });

  it('becomes visible when focusable and focused', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-visually-hidden focusable>
        <a href="#main">Skip to main content</a>
      </ts-visually-hidden>
      <main id="main">Main content</main>
    `);

    // Tab to focus the skip link
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const isVisible = await page.evaluate(() => {
      const el = document.querySelector('ts-visually-hidden');
      const styles = window.getComputedStyle(el!);
      // When focused, element should not be clipped off-screen
      return styles.clip !== 'rect(0px, 0px, 0px, 0px)' && styles.width !== '1px';
    });

    expect(isVisible).toBe(true);
  });
});
