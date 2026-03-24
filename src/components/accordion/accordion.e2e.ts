import { newE2EPage } from '@stencil/core/testing';

describe('ts-accordion e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-accordion>
        <ts-accordion-item heading="Item 1">Content 1</ts-accordion-item>
      </ts-accordion>
    `);

    const element = await page.find('ts-accordion');
    expect(element).toHaveClass('hydrated');

    const item = await page.find('ts-accordion-item');
    expect(item).toHaveClass('hydrated');
  });

  it('toggles item on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-accordion>
        <ts-accordion-item heading="Item 1">Content 1</ts-accordion-item>
      </ts-accordion>
    `);

    const tsToggle = await page.spyOnEvent('tsToggle');

    const header = await page.find('ts-accordion-item >>> .accordion-item__header');
    await header.click();
    await page.waitForChanges();

    expect(tsToggle).toHaveReceivedEventDetail({ open: true });
  });

  it('toggles item on Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-accordion>
        <ts-accordion-item heading="Item 1">Content 1</ts-accordion-item>
      </ts-accordion>
    `);

    const tsToggle = await page.spyOnEvent('tsToggle');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(tsToggle).toHaveReceivedEvent();
  });

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-accordion>
        <ts-accordion-item heading="Item 1" disabled>Content 1</ts-accordion-item>
      </ts-accordion>
    `);

    const tsToggle = await page.spyOnEvent('tsToggle');

    const header = await page.find('ts-accordion-item >>> .accordion-item__header');
    await header.click();
    await page.waitForChanges();

    expect(tsToggle).not.toHaveReceivedEvent();
  });
});
