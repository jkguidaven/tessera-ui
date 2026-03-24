import { newE2EPage } from '@stencil/core/testing';

describe('ts-table e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table>
        <table>
          <thead><tr><th>Name</th><th>Email</th></tr></thead>
          <tbody>
            <tr><td>Alice</td><td>alice@example.com</td></tr>
          </tbody>
        </table>
      </ts-table>
    `);

    const element = await page.find('ts-table');
    expect(element).toHaveClass('hydrated');
  });

  it('wrapper is keyboard focusable for scrolling', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table>
        <table>
          <thead><tr><th>Name</th></tr></thead>
          <tbody><tr><td>Alice</td></tr></tbody>
        </table>
      </ts-table>
    `);

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const host = document.querySelector('ts-table');
      const wrapper = host?.shadowRoot?.querySelector('.table__wrapper');
      return host?.shadowRoot?.activeElement === wrapper;
    });

    expect(focused).toBe(true);
  });

  it('applies variant attributes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table striped bordered hoverable compact>
        <table>
          <thead><tr><th>Col</th></tr></thead>
          <tbody><tr><td>Data</td></tr></tbody>
        </table>
      </ts-table>
    `);

    const element = await page.find('ts-table');
    expect(element).toHaveAttribute('striped');
    expect(element).toHaveAttribute('bordered');
    expect(element).toHaveAttribute('hoverable');
    expect(element).toHaveAttribute('compact');
  });
});
