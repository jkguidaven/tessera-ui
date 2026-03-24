import { newE2EPage } from '@stencil/core/testing';

describe('ts-stack e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-stack>Content</ts-stack>');

    const element = await page.find('ts-stack');
    expect(element).toHaveClass('hydrated');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-stack>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ts-stack>
    `);

    const element = await page.find('ts-stack');
    expect(element).not.toBeNull();
    const children = await page.findAll('ts-stack > div');
    expect(children.length).toBe(3);
  });

  it('applies gap and align attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-stack gap="5" align="center"><div>Item</div></ts-stack>');

    const element = await page.find('ts-stack');
    expect(element.getAttribute('gap')).toBe('5');
    expect(element.getAttribute('align')).toBe('center');
  });
});
