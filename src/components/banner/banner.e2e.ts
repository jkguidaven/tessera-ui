import { newE2EPage } from '@stencil/core/testing';

describe('ts-banner e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-banner>Info message</ts-banner>');

    const element = await page.find('ts-banner');
    expect(element).toHaveClass('hydrated');
  });

  it('emits tsClose when dismiss is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-banner dismissible>Dismissible</ts-banner>');

    const tsClose = await page.spyOnEvent('tsClose');
    const closeBtn = await page.find('ts-banner >>> .banner__close');
    await closeBtn.click();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('hides banner after dismissal', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-banner dismissible>Will hide</ts-banner>');

    const closeBtn = await page.find('ts-banner >>> .banner__close');
    await closeBtn.click();
    await page.waitForChanges();

    const base = await page.find('ts-banner >>> .banner__base');
    expect(base).toBeNull();
  });

  it('renders action slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-banner>
        Message
        <button slot="action">Action</button>
      </ts-banner>
    `);

    const actionBtn = await page.find('ts-banner > [slot="action"]');
    expect(actionBtn).not.toBeNull();
  });
});
