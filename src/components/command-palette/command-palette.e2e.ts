import { newE2EPage } from '@stencil/core/testing';

describe('ts-command-palette e2e', () => {
  it('renders on the page when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-command-palette open>
        <ts-command-palette-item value="save" label="Save File"></ts-command-palette-item>
      </ts-command-palette>
    `);

    const element = await page.find('ts-command-palette');
    expect(element).toHaveClass('hydrated');

    const overlay = await page.find('ts-command-palette >>> .command-palette__overlay');
    expect(overlay).not.toBeNull();
  });

  it('renders item as hydrated', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-command-palette open>
        <ts-command-palette-item value="test" label="Test Item"></ts-command-palette-item>
      </ts-command-palette>
    `);

    const item = await page.find('ts-command-palette-item');
    expect(item).toHaveClass('hydrated');
  });
});
