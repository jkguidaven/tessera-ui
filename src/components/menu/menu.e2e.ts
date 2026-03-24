import { newE2EPage } from '@stencil/core/testing';

describe('ts-menu e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-menu>
        <button slot="trigger">Open Menu</button>
        <ts-menu-item value="one">Item One</ts-menu-item>
        <ts-menu-item value="two">Item Two</ts-menu-item>
      </ts-menu>
    `);

    const element = await page.find('ts-menu');
    expect(element).toHaveClass('hydrated');
  });

  it('opens on trigger click and closes on Escape', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-menu>
        <button slot="trigger">Open Menu</button>
        <ts-menu-item value="one">Item One</ts-menu-item>
        <ts-menu-item value="two">Item Two</ts-menu-item>
      </ts-menu>
    `);

    const tsOpen = await page.spyOnEvent('tsOpen');
    const tsClose = await page.spyOnEvent('tsClose');

    // Click trigger to open
    const trigger = await page.find('ts-menu >>> .menu__trigger');
    await trigger.click();
    await page.waitForChanges();

    expect(tsOpen).toHaveReceivedEvent();

    // Verify open attribute is set
    const menu = await page.find('ts-menu');
    expect(menu).toHaveAttribute('open');

    // Press Escape to close
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('emits tsSelect when a menu item is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-menu open>
        <button slot="trigger">Open Menu</button>
        <ts-menu-item value="edit">Edit</ts-menu-item>
        <ts-menu-item value="delete">Delete</ts-menu-item>
      </ts-menu>
    `);

    const tsSelect = await page.spyOnEvent('tsSelect');

    const item = await page.find('ts-menu-item[value="edit"] >>> .menu-item__base');
    await item.click();
    await page.waitForChanges();

    expect(tsSelect).toHaveReceivedEventDetail({ value: 'edit' });
  });

  it('closes menu after item selection', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-menu open>
        <button slot="trigger">Open Menu</button>
        <ts-menu-item value="edit">Edit</ts-menu-item>
      </ts-menu>
    `);

    const menu = await page.find('ts-menu');
    expect(menu).toHaveAttribute('open');

    const item = await page.find('ts-menu-item[value="edit"] >>> .menu-item__base');
    await item.click();
    await page.waitForChanges();

    expect(menu).not.toHaveAttribute('open');
  });
});
