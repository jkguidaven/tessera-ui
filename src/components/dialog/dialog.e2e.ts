import { newE2EPage } from '@stencil/core/testing';

describe('ts-dialog e2e', () => {
  it('renders when open', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-dialog open heading="Confirm">Are you sure?</ts-dialog>');

    const dialog = await page.find('ts-dialog >>> [role="dialog"]');
    expect(dialog).not.toBeNull();
  });

  it('closes on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-dialog open heading="Test">Content</ts-dialog>');

    const tsClose = await page.spyOnEvent('tsClose');

    await page.waitForChanges();
    await page.waitForTimeout(100);

    const dialog = await page.find('ts-dialog >>> [role="dialog"]');
    await dialog.focus();
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('closes when overlay is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-dialog open heading="Test">Content</ts-dialog>');

    const tsClose = await page.spyOnEvent('tsClose');

    const overlay = await page.find('ts-dialog >>> .dialog__overlay');
    await overlay.click({ offset: { x: 10, y: 10 } });

    expect(tsClose).toHaveReceivedEvent();
  });
});
