import { newE2EPage } from '@stencil/core/testing';

describe('ts-empty-state e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-empty-state heading="No data"></ts-empty-state>');

    const element = await page.find('ts-empty-state');
    expect(element).toHaveClass('hydrated');
  });

  it('displays heading and description', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-empty-state heading="Empty" description="Nothing to display"></ts-empty-state>');

    const heading = await page.find('ts-empty-state >>> .empty-state__heading');
    const description = await page.find('ts-empty-state >>> .empty-state__description');
    expect(heading.textContent).toBe('Empty');
    expect(description.textContent).toBe('Nothing to display');
  });

  it('renders action slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-empty-state heading="Empty">
        <button slot="action">Create</button>
      </ts-empty-state>
    `);

    const actionBtn = await page.find('ts-empty-state > [slot="action"]');
    expect(actionBtn).not.toBeNull();
    expect(actionBtn.textContent).toBe('Create');
  });
});
