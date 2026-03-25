import { newE2EPage } from '@stencil/core/testing';

describe('ts-app-layout e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-app-layout>Main content</ts-app-layout>');

    const element = await page.find('ts-app-layout');
    expect(element).toHaveClass('hydrated');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-app-layout>
        <nav slot="sidebar">Sidebar nav</nav>
        <div slot="header">App Header</div>
        <p>Page content</p>
      </ts-app-layout>
    `);

    const element = await page.find('ts-app-layout');
    expect(element).toHaveClass('hydrated');
  });
});
