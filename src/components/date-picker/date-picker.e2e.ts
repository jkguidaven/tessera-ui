import { newE2EPage } from '@stencil/core/testing';

describe('ts-date-picker e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-date-picker></ts-date-picker>');

    const element = await page.find('ts-date-picker');
    expect(element).toHaveClass('hydrated');
  });

  it('opens calendar on input click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-date-picker></ts-date-picker>');

    const trigger = await page.find('ts-date-picker >>> .date-picker__trigger');
    await trigger.click();
    await page.waitForChanges();

    const calendar = await page.find('ts-date-picker >>> .date-picker__calendar');
    expect(calendar).not.toBeNull();
  });

  it('selects a date and emits tsChange', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-date-picker></ts-date-picker>');

    const tsChange = await page.spyOnEvent('tsChange');

    const trigger = await page.find('ts-date-picker >>> .date-picker__trigger');
    await trigger.click();
    await page.waitForChanges();

    const days = await page.findAll('ts-date-picker >>> .date-picker__day:not(.date-picker__day--empty):not(.date-picker__day--disabled)');
    if (days.length > 0) {
      await days[0].click();
      await page.waitForChanges();
    }

    expect(tsChange).toHaveReceivedEvent();
  });

  it('closes calendar on Escape', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-date-picker></ts-date-picker>');

    const trigger = await page.find('ts-date-picker >>> .date-picker__trigger');
    await trigger.click();
    await page.waitForChanges();

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const calendar = await page.find('ts-date-picker >>> .date-picker__calendar');
    expect(calendar).toBeNull();
  });
});
