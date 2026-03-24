import { newE2EPage } from '@stencil/core/testing';

describe('ts-toolbar e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toolbar>Content</ts-toolbar>');

    const element = await page.find('ts-toolbar');
    expect(element).toHaveClass('hydrated');
  });

  it('has toolbar role', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toolbar>Content</ts-toolbar>');

    const element = await page.find('ts-toolbar');
    expect(element.getAttribute('role')).toBe('toolbar');
    expect(element.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders slotted content in start and end', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-toolbar>
        <button slot="start">Start</button>
        <span>Center</span>
        <button slot="end">End</button>
      </ts-toolbar>
    `);

    const startBtn = await page.find('ts-toolbar > [slot="start"]');
    const endBtn = await page.find('ts-toolbar > [slot="end"]');
    expect(startBtn).not.toBeNull();
    expect(endBtn).not.toBeNull();
  });
});
