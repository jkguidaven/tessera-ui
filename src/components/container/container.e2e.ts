import { newE2EPage } from '@stencil/core/testing';

describe('ts-container e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-container>Content</ts-container>');

    const element = await page.find('ts-container');
    expect(element).toHaveClass('hydrated');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-container><p>Hello World</p></ts-container>');

    const p = await page.find('ts-container > p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('Hello World');
  });

  it('displays as block', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-container>Content</ts-container>');

    const display = await page.evaluate(() => {
      const el = document.querySelector('ts-container');
      return window.getComputedStyle(el!).display;
    });
    expect(display).toBe('block');
  });

  it('reflects size attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-container size="sm">Content</ts-container>');

    const element = await page.find('ts-container');
    expect(element.getAttribute('size')).toBe('sm');
  });
});
