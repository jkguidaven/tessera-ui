import { newE2EPage } from '@stencil/core/testing';

describe('ts-row e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-row>Content</ts-row>');

    const element = await page.find('ts-row');
    expect(element).toHaveClass('hydrated');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-row>
        <ts-button>Action 1</ts-button>
        <ts-button>Action 2</ts-button>
        <ts-button>Action 3</ts-button>
      </ts-row>
    `);

    const element = await page.find('ts-row');
    expect(element).not.toBeNull();
    const children = await page.findAll('ts-row > ts-button');
    expect(children.length).toBe(3);
  });

  it('applies gap, align, and justify attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-row gap="4" align="start" justify="between"><div>A</div><div>B</div></ts-row>');

    const element = await page.find('ts-row');
    expect(element.getAttribute('gap')).toBe('4');
    expect(element.getAttribute('align')).toBe('start');
    expect(element.getAttribute('justify')).toBe('between');
  });
});
