import { newE2EPage } from '@stencil/core/testing';

describe('ts-switch-group e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-switch-group value="a">
        <ts-switch-option value="a">A</ts-switch-option>
        <ts-switch-option value="b">B</ts-switch-option>
      </ts-switch-group>
    `);

    const element = await page.find('ts-switch-group');
    expect(element).toHaveClass('hydrated');
  });

  it('emits tsChange when option is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-switch-group value="a">
        <ts-switch-option value="a">A</ts-switch-option>
        <ts-switch-option value="b">B</ts-switch-option>
      </ts-switch-group>
    `);

    const tsChange = await page.spyOnEvent('tsChange');
    const optionB = await page.find('ts-switch-option[value="b"]');
    await optionB.click();

    expect(tsChange).toHaveReceivedEventDetail({ value: 'b' });
  });

  it('does not emit when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-switch-group value="a" disabled>
        <ts-switch-option value="a">A</ts-switch-option>
        <ts-switch-option value="b">B</ts-switch-option>
      </ts-switch-group>
    `);

    const tsChange = await page.spyOnEvent('tsChange');
    const optionB = await page.find('ts-switch-option[value="b"]');
    await optionB.click();

    expect(tsChange).not.toHaveReceivedEvent();
  });
});
