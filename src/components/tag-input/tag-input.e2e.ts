import { newE2EPage } from '@stencil/core/testing';

describe('ts-tag-input e2e', () => {
  it('renders and hydrates', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tag-input label="Tags"></ts-tag-input>');

    const element = await page.find('ts-tag-input');
    expect(element).toHaveClass('hydrated');
  });

  it('adds a tag on Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tag-input label="Tags"></ts-tag-input>');

    const tsChange = await page.spyOnEvent('tsChange');

    const input = await page.find('ts-tag-input >>> input');
    await input.focus();
    await input.type('hello');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEvent();

    const tag = await page.find('ts-tag-input >>> .tag-input__tag');
    expect(tag).not.toBeNull();
  });
});
