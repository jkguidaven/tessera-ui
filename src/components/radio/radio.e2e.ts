import { newE2EPage } from '@stencil/core/testing';

describe('ts-radio e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-radio>Option A</ts-radio>');

    const element = await page.find('ts-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('selects on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-radio value="a">Option A</ts-radio>');

    const tsChange = await page.spyOnEvent('tsChange');

    const control = await page.find('ts-radio >>> .radio__base');
    await control.click();

    expect(tsChange).toHaveReceivedEventTimes(1);
    expect(tsChange).toHaveReceivedEventDetail({ checked: true, value: 'a' });
  });

  it('selects on Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-radio>Keyboard</ts-radio>');

    const tsChange = await page.spyOnEvent('tsChange');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    expect(tsChange).toHaveReceivedEvent();
  });

  it('does not select when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-radio disabled>Disabled</ts-radio>');

    const tsChange = await page.spyOnEvent('tsChange');

    const control = await page.find('ts-radio >>> .radio__base');
    await control.click();

    expect(tsChange).not.toHaveReceivedEvent();
  });
});
