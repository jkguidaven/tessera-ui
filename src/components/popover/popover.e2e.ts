import { newE2EPage } from '@stencil/core/testing';

describe('ts-popover e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>');

    const element = await page.find('ts-popover');
    expect(element).toHaveClass('hydrated');
  });

  it('opens on trigger click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>');

    const tsOpen = await page.spyOnEvent('tsOpen');

    const trigger = await page.find('ts-popover >>> .popover__trigger');
    await trigger.click();
    await page.waitForChanges();

    expect(tsOpen).toHaveReceivedEvent();

    const panel = await page.find('ts-popover >>> .popover__panel');
    expect(panel).toHaveClass('popover__panel--visible');
  });

  it('closes on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-popover open><button slot="trigger">Open</button><p>Content</p></ts-popover>');

    const tsClose = await page.spyOnEvent('tsClose');

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('sets aria-expanded correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-popover><button slot="trigger">Open</button><p>Content</p></ts-popover>');

    const trigger = await page.find('ts-popover >>> .popover__trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await trigger.click();
    await page.waitForChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
