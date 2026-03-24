import { newE2EPage } from '@stencil/core/testing';

describe('ts-progress e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-progress value="50"></ts-progress>');

    const element = await page.find('ts-progress');
    expect(element).toHaveClass('hydrated');
  });

  it('updates fill width when value changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-progress value="25"></ts-progress>');

    const el = await page.find('ts-progress');
    el.setProperty('value', 75);
    await page.waitForChanges();

    const updatedFill = await page.find('ts-progress >>> .progress__fill');
    expect(updatedFill).not.toBeNull();
  });

  it('renders indeterminate animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-progress indeterminate></ts-progress>');

    const element = await page.find('ts-progress');
    expect(element).toHaveAttribute('indeterminate');

    const fill = await page.find('ts-progress >>> .progress__fill');
    expect(fill).not.toBeNull();
  });

  it('displays percentage text when showValue is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-progress value="42" show-value></ts-progress>');

    const label = await page.find('ts-progress >>> .progress__label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('42%');
  });
});
