import { newE2EPage } from '@stencil/core/testing';

describe('ts-breadcrumb e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Current</ts-breadcrumb-item>
      </ts-breadcrumb>
    `);

    const element = await page.find('ts-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('renders links for non-current items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item href="/products">Products</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Widget</ts-breadcrumb-item>
      </ts-breadcrumb>
    `);

    const link = await page.find('ts-breadcrumb-item:first-child >>> a');
    expect(link).not.toBeNull();
    expect(await link.getAttribute('href')).toBe('/');
  });

  it('renders current item with aria-current', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-breadcrumb>
        <ts-breadcrumb-item href="/">Home</ts-breadcrumb-item>
        <ts-breadcrumb-item current>Current</ts-breadcrumb-item>
      </ts-breadcrumb>
    `);

    const currentItem = await page.find('ts-breadcrumb-item[current] >>> .breadcrumb-item__text');
    expect(await currentItem.getAttribute('aria-current')).toBe('page');
  });
});
