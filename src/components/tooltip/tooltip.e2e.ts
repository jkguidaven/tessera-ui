import { newE2EPage } from '@stencil/core/testing';

describe('ts-tooltip e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tooltip content="Tip"><button>Hover me</button></ts-tooltip>');

    const element = await page.find('ts-tooltip');
    expect(element).toHaveClass('hydrated');
  });

  it('shows on hover', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tooltip content="Hello tooltip" show-delay="0"><button>Hover me</button></ts-tooltip>');

    const trigger = await page.find('ts-tooltip');
    await trigger.hover();
    await page.waitForTimeout(300);

    const popup = await page.find('ts-tooltip >>> .tooltip__popup');
    const classes = await popup.getProperty('className');
    expect(classes).toContain('tooltip__popup--visible');
  });

  it('hides on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-tooltip content="Escape me" show-delay="0"><button>Focus me</button></ts-tooltip>');

    // Focus trigger to show tooltip
    const button = await page.find('button');
    await button.focus();
    await page.waitForTimeout(300);

    // Press Escape and wait for state update
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    await page.waitForTimeout(500);
    await page.waitForChanges();

    const popup = await page.find('ts-tooltip >>> .tooltip__popup');
    const classes = await popup.getProperty('className');
    expect(classes).not.toContain('tooltip__popup--visible');
  });
});
