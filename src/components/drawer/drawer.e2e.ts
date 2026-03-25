import { newE2EPage } from '@stencil/core/testing';

describe('ts-drawer e2e', () => {
  it('renders on the page when open', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-drawer open heading="Test">Content</ts-drawer>');

    const element = await page.find('ts-drawer');
    expect(element).toHaveClass('hydrated');

    const panel = await page.find('ts-drawer >>> .drawer__panel');
    expect(panel).not.toBeNull();
  });

  it('renders close button when dismissible', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-drawer open heading="Test">Content</ts-drawer>');

    const closeBtn = await page.find('ts-drawer >>> .drawer__close');
    expect(closeBtn).not.toBeNull();
  });

  it('closes when overlay is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-drawer open heading="Test">Content</ts-drawer>');

    const tsClose = await page.spyOnEvent('tsClose');

    const overlay = await page.find('ts-drawer >>> .drawer__overlay');
    await overlay.click();
    await page.waitForChanges();
    await page.waitForChanges();

    expect(tsClose).toHaveReceivedEvent();
  });

  it('does not close on Escape when not dismissible', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-drawer open heading="Test" dismissible="false">Content</ts-drawer>');

    const tsClose = await page.spyOnEvent('tsClose');

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(tsClose).not.toHaveReceivedEvent();
  });
});
