import { newE2EPage } from '@stencil/core/testing';

describe('ts-tabs e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-tabs>
        <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
        <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
      </ts-tabs>
    `);

    const element = await page.find('ts-tabs');
    expect(element).toHaveClass('hydrated');
  });

  it('switches tabs on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-tabs value="one">
        <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
        <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
      </ts-tabs>
    `);

    const tsChange = await page.spyOnEvent('tsChange');

    const secondTab = await page.find('ts-tabs >>> [role="tab"]:nth-child(2)');
    await secondTab.click();
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEvent();
  });

  it('supports keyboard navigation with arrow keys', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-tabs value="one">
        <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
        <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        <ts-tab-panel tab="Tab 3" value="three">Content 3</ts-tab-panel>
      </ts-tabs>
    `);

    const tsChange = await page.spyOnEvent('tsChange');

    // Focus the first tab
    const firstTab = await page.find('ts-tabs >>> [role="tab"]');
    await firstTab.focus();
    await page.waitForChanges();

    // Press ArrowRight to move to next tab
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEvent();
  });
});
