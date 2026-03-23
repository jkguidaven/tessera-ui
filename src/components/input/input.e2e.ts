import { newE2EPage } from '@stencil/core/testing';

describe('ts-input e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-input></ts-input>');

    const element = await page.find('ts-input');
    expect(element).toHaveClass('hydrated');
  });

  it('accepts keyboard input', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-input></ts-input>');

    const input = await page.find('ts-input >>> input');
    await input.focus();
    await page.keyboard.type('Hello World');

    const value = await input.getProperty('value');
    expect(value).toBe('Hello World');
  });

  it('fires tsFocus and tsBlur events', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-input></ts-input><button>Other</button>');

    const tsFocus = await page.spyOnEvent('tsFocus');
    const tsBlur = await page.spyOnEvent('tsBlur');

    const input = await page.find('ts-input >>> input');
    await input.focus();
    expect(tsFocus).toHaveReceivedEvent();

    const button = await page.find('button');
    await button.focus();
    expect(tsBlur).toHaveReceivedEvent();
  });

  it('does not accept input when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-input disabled value="locked"></ts-input>');

    const input = await page.find('ts-input >>> input');
    const disabled = await input.getProperty('disabled');
    expect(disabled).toBe(true);
  });
});
