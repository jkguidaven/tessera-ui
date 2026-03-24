import { newE2EPage } from '@stencil/core/testing';

describe('ts-tree e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tree><ts-tree-item label="Item 1"></ts-tree-item></ts-tree>');

    const element = await page.find('ts-tree');
    expect(element).toHaveClass('hydrated');
  });

  it('tree item is keyboard focusable', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tree><ts-tree-item label="Item 1"></ts-tree-item></ts-tree>');

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });

    expect(focused).toBe('ts-tree-item');
  });

  it('emits tsToggle event when expanded changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-tree>
        <ts-tree-item label="Parent">
          <ts-tree-item label="Child"></ts-tree-item>
        </ts-tree-item>
      </ts-tree>
    `);

    const item = await page.find('ts-tree-item');
    const tsToggle = await page.spyOnEvent('tsToggle');

    item.setProperty('expanded', true);
    await page.waitForChanges();

    expect(tsToggle).toHaveReceivedEvent();
  });

  it('does not focus disabled items via tab', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-tree>
        <ts-tree-item label="Disabled" disabled></ts-tree-item>
        <ts-tree-item label="Enabled"></ts-tree-item>
      </ts-tree>
    `);

    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      return document.activeElement?.getAttribute('label');
    });

    expect(focused).toBe('Enabled');
  });
});
