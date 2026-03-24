import { newE2EPage } from '@stencil/core/testing';

describe('ts-pagination e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-pagination total="100"></ts-pagination>');

    const element = await page.find('ts-pagination');
    expect(element).toHaveClass('hydrated');
  });

  it('emits tsChange on page button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-pagination total="50" page-size="10" current-page="1"></ts-pagination>');

    const tsChange = await page.spyOnEvent('tsChange');

    // Click page 2 button (skip prev button, first page button is index 1)
    const buttons = await page.findAll('ts-pagination >>> .pagination__button:not(.pagination__prev):not(.pagination__next)');
    await buttons[1].click();
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEventDetail({ page: 2 });
  });

  it('navigates with prev/next buttons', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-pagination total="50" page-size="10" current-page="3"></ts-pagination>');

    const tsChange = await page.spyOnEvent('tsChange');

    const prevBtn = await page.find('ts-pagination >>> .pagination__prev');
    await prevBtn.click();
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEventDetail({ page: 2 });
  });

  it('does not navigate past first page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-pagination total="50" page-size="10" current-page="1"></ts-pagination>');

    const prevBtn = await page.find('ts-pagination >>> .pagination__prev');
    const isDisabled = await prevBtn.getProperty('disabled');
    expect(isDisabled).toBe(true);
  });
});
