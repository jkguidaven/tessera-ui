import { newE2EPage } from '@stencil/core/testing';

describe('ts-nav e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-nav>
        <ts-nav-item>Home</ts-nav-item>
        <ts-nav-item>About</ts-nav-item>
      </ts-nav>
    `);

    const element = await page.find('ts-nav');
    expect(element).toHaveClass('hydrated');
  });

  it('nav-item is keyboard focusable', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-nav>
        <ts-nav-item>Home</ts-nav-item>
      </ts-nav>
    `);

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const host = document.querySelector('ts-nav-item');
      return host?.shadowRoot?.activeElement?.tagName.toLowerCase();
    });

    expect(focused).toBe('button');
  });

  it('fires tsSelect on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-nav>
        <ts-nav-item>Home</ts-nav-item>
      </ts-nav>
    `);

    const tsSelect = await page.spyOnEvent('tsSelect');

    const item = await page.find('ts-nav-item >>> .nav-item__link');
    await item.click();

    expect(tsSelect).toHaveReceivedEvent();
  });
});
