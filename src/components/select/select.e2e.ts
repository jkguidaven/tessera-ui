import { newE2EPage } from '@stencil/core/testing';

describe('ts-select e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>
    `);

    const element = await page.find('ts-select');
    expect(element).toHaveClass('hydrated');
  });

  it('opens dropdown on click and selects an option', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-select placeholder="Pick one">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>
    `);

    const tsChange = await page.spyOnEvent('tsChange');

    const trigger = await page.find('ts-select >>> .select__trigger');
    await trigger.click();
    await page.waitForChanges();

    const options = await page.findAll('ts-select >>> .select__option');
    expect(options.length).toBe(2);

    await options[1].click();
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEventDetail({ value: 'b' });
  });

  it('closes dropdown on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-select>
        <option value="a">Option A</option>
      </ts-select>
    `);

    const trigger = await page.find('ts-select >>> .select__trigger');
    await trigger.click();
    await page.waitForChanges();

    let dropdown = await page.find('ts-select >>> .select__dropdown');
    expect(dropdown).not.toBeNull();

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    dropdown = await page.find('ts-select >>> .select__dropdown');
    expect(dropdown).toBeNull();
  });

  it('does not open when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-select disabled>
        <option value="a">Option A</option>
      </ts-select>
    `);

    const trigger = await page.find('ts-select >>> .select__trigger');
    await trigger.click();
    await page.waitForChanges();

    const dropdown = await page.find('ts-select >>> .select__dropdown');
    expect(dropdown).toBeNull();
  });
});
