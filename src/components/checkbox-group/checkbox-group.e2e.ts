import { newE2EPage } from '@stencil/core/testing';

describe('ts-checkbox-group e2e', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-checkbox-group label="Interests">
        <ts-checkbox value="music">Music</ts-checkbox>
        <ts-checkbox value="sports">Sports</ts-checkbox>
      </ts-checkbox-group>
    `);

    const element = await page.find('ts-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });

  it('updates group value when checkboxes are toggled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-checkbox-group label="Pick any">
        <ts-checkbox value="a">A</ts-checkbox>
        <ts-checkbox value="b">B</ts-checkbox>
      </ts-checkbox-group>
    `);

    const checkboxA = await page.find('ts-checkbox[value="a"] >>> .checkbox__base');
    await checkboxA.click();
    await page.waitForChanges();

    const group = await page.find('ts-checkbox-group');
    const value = await group.getProperty('value');
    expect(value).toContain('a');
  });
});
