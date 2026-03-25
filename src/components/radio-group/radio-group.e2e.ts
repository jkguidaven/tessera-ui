import { newE2EPage } from '@stencil/core/testing';

describe('ts-radio-group e2e', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-radio-group label="Favorite color">
        <ts-radio value="red">Red</ts-radio>
        <ts-radio value="blue">Blue</ts-radio>
      </ts-radio-group>
    `);

    const element = await page.find('ts-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('updates group value when a radio is selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-radio-group label="Pick one">
        <ts-radio value="a">A</ts-radio>
        <ts-radio value="b">B</ts-radio>
      </ts-radio-group>
    `);

    const radioB = await page.find('ts-radio[value="b"] >>> .radio__base');
    await radioB.click();
    await page.waitForChanges();

    const group = await page.find('ts-radio-group');
    const value = await group.getProperty('value');
    expect(value).toBe('b');
  });
});
