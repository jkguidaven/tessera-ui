import { newE2EPage } from '@stencil/core/testing';

describe('ts-chip e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-chip>Label</ts-chip>');

    const element = await page.find('ts-chip');
    expect(element).toHaveClass('hydrated');
  });

  it('is keyboard focusable and clickable', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-chip>Tag</ts-chip>');

    const tsClick = await page.spyOnEvent('tsClick');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(tsClick).toHaveReceivedEvent();
  });

  it('fires tsRemove when remove button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-chip removable>Tag</ts-chip>');

    const tsRemove = await page.spyOnEvent('tsRemove');

    const removeBtn = await page.find('ts-chip >>> .chip__remove');
    await removeBtn.click();

    expect(tsRemove).toHaveReceivedEvent();
  });

  it('does not fire events when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-chip disabled>Tag</ts-chip>');

    const tsClick = await page.spyOnEvent('tsClick');

    const base = await page.find('ts-chip >>> .chip__base');
    await base.click();

    expect(tsClick).not.toHaveReceivedEvent();
  });
});
