import { newE2EPage } from '@stencil/core/testing';

describe('ts-alert e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-alert>Info message</ts-alert>');

    const element = await page.find('ts-alert');
    expect(element).toHaveClass('hydrated');
  });

  it('closes when close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-alert closable>Closable</ts-alert>');

    const tsClose = await page.spyOnEvent('tsClose');

    const closeBtn = await page.find('ts-alert >>> .alert__close');
    await closeBtn.click();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('close button is keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-alert closable>Keyboard close</ts-alert>');

    const tsClose = await page.spyOnEvent('tsClose');

    // Tab to focus the close button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(tsClose).toHaveReceivedEvent();
  });
});
