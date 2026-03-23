import { newE2EPage } from '@stencil/core/testing';

describe('ts-toggle e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toggle>Dark mode</ts-toggle>');

    const element = await page.find('ts-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('toggles on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toggle>Toggle me</ts-toggle>');

    const tsChange = await page.spyOnEvent('tsChange');

    const toggle = await page.find('ts-toggle >>> .toggle__base');
    await toggle.click();

    expect(tsChange).toHaveReceivedEventTimes(1);
    expect(tsChange).toHaveReceivedEventDetail({ checked: true });
  });

  it('toggles on Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toggle>Keyboard</ts-toggle>');

    const tsChange = await page.spyOnEvent('tsChange');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    expect(tsChange).toHaveReceivedEvent();
  });

  it('toggles on Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-toggle>Enter key</ts-toggle>');

    const tsChange = await page.spyOnEvent('tsChange');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(tsChange).toHaveReceivedEvent();
  });
});
