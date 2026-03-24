import { newE2EPage } from '@stencil/core/testing';

describe('ts-grid e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-grid></ts-grid>');

    const element = await page.find('ts-grid');
    expect(element).toHaveClass('hydrated');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-grid>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ts-grid>
    `);

    const items = await page.findAll('ts-grid > div');
    expect(items.length).toBe(3);
  });

  it('displays as grid', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-grid><div>A</div><div>B</div></ts-grid>');

    const display = await page.evaluate(() => {
      const el = document.querySelector('ts-grid');
      return window.getComputedStyle(el!).display;
    });
    expect(display).toBe('grid');
  });

  it('applies fixed columns attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-grid columns="2"><div>A</div><div>B</div></ts-grid>');

    const element = await page.find('ts-grid');
    expect(element.getAttribute('columns')).toBe('2');
  });
});
