import { newE2EPage } from '@stencil/core/testing';

describe('ts-textarea e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-textarea></ts-textarea>');

    const element = await page.find('ts-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('emits tsInput on typing', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-textarea></ts-textarea>');

    const tsInput = await page.spyOnEvent('tsInput');

    const textarea = await page.find('ts-textarea >>> textarea');
    await textarea.focus();
    await page.keyboard.type('hello');
    await page.waitForChanges();

    expect(tsInput).toHaveReceivedEvent();
  });

  it('emits tsFocus and tsBlur events', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-textarea></ts-textarea><button>other</button>');

    const tsFocus = await page.spyOnEvent('tsFocus');
    const tsBlur = await page.spyOnEvent('tsBlur');

    const textarea = await page.find('ts-textarea >>> textarea');
    await textarea.focus();
    await page.waitForChanges();

    expect(tsFocus).toHaveReceivedEvent();

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    expect(tsBlur).toHaveReceivedEvent();
  });

  it('does not allow input when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-textarea disabled></ts-textarea>');

    const textarea = await page.find('ts-textarea >>> textarea');
    const isDisabled = await textarea.getProperty('disabled');
    expect(isDisabled).toBe(true);
  });
});
