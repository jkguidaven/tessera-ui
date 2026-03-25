import { newE2EPage } from '@stencil/core/testing';

describe('ts-number-input e2e', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-number-input></ts-number-input>');

    const element = await page.find('ts-number-input');
    expect(element).toHaveClass('hydrated');
  });

  it('increments via button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-number-input value="0"></ts-number-input>');

    const tsInput = await page.spyOnEvent('tsInput');

    const incrementBtn = await page.find('ts-number-input >>> .number-input__button--increment');
    await incrementBtn.click();
    await page.waitForChanges();

    expect(tsInput).toHaveReceivedEvent();
  });

  it('decrements via button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-number-input value="5"></ts-number-input>');

    const tsInput = await page.spyOnEvent('tsInput');

    const decrementBtn = await page.find('ts-number-input >>> .number-input__button--decrement');
    await decrementBtn.click();
    await page.waitForChanges();

    expect(tsInput).toHaveReceivedEvent();
  });
});
