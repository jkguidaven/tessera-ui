import { newE2EPage } from '@stencil/core/testing';

describe('ts-button e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button>Hello</ts-button>');

    const element = await page.find('ts-button');
    expect(element).toHaveClass('hydrated');
  });

  it('is keyboard focusable', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button>Focus me</ts-button>');

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const host = document.querySelector('ts-button');
      return host?.shadowRoot?.activeElement?.tagName.toLowerCase();
    });

    expect(focused).toBe('button');
  });

  it('fires tsClick on Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button>Press Enter</ts-button>');

    const tsClick = await page.spyOnEvent('tsClick');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(tsClick).toHaveReceivedEvent();
  });

  it('fires tsClick on Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button>Press Space</ts-button>');

    const tsClick = await page.spyOnEvent('tsClick');

    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Space');
    await page.waitForChanges();

    expect(tsClick).toHaveReceivedEvent();
  });

  it('fires tsClick on Space key when href is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button href="https://example.com">Link</ts-button>');

    const tsClick = await page.spyOnEvent('tsClick');

    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Space');
    await page.waitForChanges();

    expect(tsClick).toHaveReceivedEvent();
  });

  it('does not fire tsClick when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-button disabled>Disabled</ts-button>');

    const tsClick = await page.spyOnEvent('tsClick');

    const button = await page.find('ts-button >>> button');
    await button.click();

    expect(tsClick).not.toHaveReceivedEvent();
  });
});
