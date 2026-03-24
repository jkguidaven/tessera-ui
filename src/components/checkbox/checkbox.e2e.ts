import { newE2EPage } from '@stencil/core/testing';

describe('ts-checkbox e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-checkbox>Accept</ts-checkbox>');

    const element = await page.find('ts-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('toggles on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-checkbox value="terms">Accept terms</ts-checkbox>');

    const tsChange = await page.spyOnEvent('tsChange');

    const control = await page.find('ts-checkbox >>> .checkbox__base');
    await control.click();

    expect(tsChange).toHaveReceivedEventTimes(1);
    expect(tsChange).toHaveReceivedEventDetail({ checked: true, value: 'terms' });
  });

  it('toggles on Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-checkbox>Keyboard</ts-checkbox>');

    const tsChange = await page.spyOnEvent('tsChange');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    expect(tsChange).toHaveReceivedEvent();
  });

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-checkbox disabled>Disabled</ts-checkbox>');

    const tsChange = await page.spyOnEvent('tsChange');

    const control = await page.find('ts-checkbox >>> .checkbox__base');
    await control.click();

    expect(tsChange).not.toHaveReceivedEvent();
  });
});
