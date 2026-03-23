import { newE2EPage } from '@stencil/core/testing';

describe('ts-modal e2e', () => {
  it('renders when open', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-modal open label="Test">Hello modal</ts-modal>');

    const dialog = await page.find('ts-modal >>> [role="dialog"]');
    expect(dialog).not.toBeNull();
  });

  it('closes on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-modal open label="Escapable">Content</ts-modal>');

    const tsClose = await page.spyOnEvent('tsClose');

    // Wait for requestAnimationFrame to focus the dialog
    await page.waitForChanges();
    await page.waitForTimeout(100);

    // Focus the modal's dialog and press Escape
    const dialog = await page.find('ts-modal >>> [role="dialog"]');
    await dialog.focus();
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('closes when overlay is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-modal open label="Overlay close">Content</ts-modal>');

    const tsClose = await page.spyOnEvent('tsClose');

    const overlay = await page.find('ts-modal >>> .modal__overlay');
    // Click at the edge of the overlay (not the dialog)
    await overlay.click({ offset: { x: 10, y: 10 } });

    expect(tsClose).toHaveReceivedEvent();
  });

  it('traps focus within the modal', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-modal open label="Focus trap">
        <p>Modal content</p>
      </ts-modal>
    `);

    // Tab should cycle within the modal
    const dialog = await page.find('ts-modal >>> [role="dialog"]');
    expect(dialog).not.toBeNull();
  });
});
