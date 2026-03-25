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

  it('sets aria-sort on sortable header click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table sortable>
        <table>
          <thead><tr><th data-column="name">Name</th><th data-column="email">Email</th></tr></thead>
          <tbody><tr><td>Alice</td><td>alice@example.com</td></tr></tbody>
        </table>
      </ts-table>
    `);

    const th = await page.find('th[data-column="name"]');
    await th.click();
    await page.waitForChanges();

    const ariaSort = await th.getAttribute('aria-sort');
    expect(ariaSort).toBe('ascending');
  });

  it('emits tsSort event on header click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table sortable>
        <table>
          <thead><tr><th data-column="name">Name</th></tr></thead>
          <tbody><tr><td>Alice</td></tr></tbody>
        </table>
      </ts-table>
    `);

    const sortEvent = await page.spyOnEvent('tsSort');
    const th = await page.find('th[data-column="name"]');
    await th.click();
    await page.waitForChanges();

    expect(sortEvent).toHaveReceivedEventDetail({ column: 'name', direction: 'asc' });
  });

  it('renders checkboxes when selectable is enabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-table selectable>
        <table>
          <thead><tr><th>Name</th></tr></thead>
          <tbody>
            <tr data-value="alice"><td>Alice</td></tr>
            <tr data-value="bob"><td>Bob</td></tr>
          </tbody>
        </table>
      </ts-table>
    `);

    await page.waitForChanges();

    const headerCheckbox = await page.find('thead th.table__checkbox input[type="checkbox"]');
    expect(headerCheckbox).not.toBeNull();

    const rowCheckboxes = await page.findAll('tbody td.table__checkbox input[type="checkbox"]');
    expect(rowCheckboxes.length).toBe(2);
  });
});
