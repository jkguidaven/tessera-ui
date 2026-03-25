import { newSpecPage } from '@stencil/core/testing';
import { TsTable } from './table';

describe('ts-table', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table>
          <table><tr><td>Cell</td></tr></table>
        </ts-table>
      `,
    });

    expect(page.root).not.toBeNull();
    const wrapper = page.root?.querySelector('.table__wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('role')).toBe('region');
  });

  it('reflects striped prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table striped><table></table></ts-table>',
    });

    expect(page.root).toHaveAttribute('striped');
    expect(page.root?.classList.contains('ts-table--striped')).toBe(true);
  });

  it('reflects bordered prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table bordered><table></table></ts-table>',
    });

    expect(page.root).toHaveAttribute('bordered');
    expect(page.root?.classList.contains('ts-table--bordered')).toBe(true);
  });

  it('reflects hoverable prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table hoverable><table></table></ts-table>',
    });

    expect(page.root).toHaveAttribute('hoverable');
    expect(page.root?.classList.contains('ts-table--hoverable')).toBe(true);
  });

  it('reflects compact prop and updates class', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table compact><table></table></ts-table>',
    });

    expect(page.root).toHaveAttribute('compact');
    expect(page.root?.classList.contains('ts-table--compact')).toBe(true);
  });

  it('reflects stickyHeader prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table sticky-header><table></table></ts-table>',
    });

    expect(page.root).toHaveAttribute('sticky-header');
    expect(page.root?.classList.contains('ts-table--sticky-header')).toBe(true);
  });

  it('renders wrapper with tabindex for keyboard scrolling', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table><table></table></ts-table>',
    });

    const wrapper = page.root?.querySelector('.table__wrapper');
    expect(wrapper?.getAttribute('tabindex')).toBe('0');
  });

  it('applies multiple variant classes simultaneously', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: '<ts-table striped bordered hoverable><table></table></ts-table>',
    });

    expect(page.root?.classList.contains('ts-table--striped')).toBe(true);
    expect(page.root?.classList.contains('ts-table--bordered')).toBe(true);
    expect(page.root?.classList.contains('ts-table--hoverable')).toBe(true);
  });

  it('applies sortable class when sortable prop is set', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table sortable>
          <table>
            <thead><tr><th data-column="name">Name</th></tr></thead>
            <tbody><tr><td>Alice</td></tr></tbody>
          </table>
        </ts-table>
      `,
    });

    expect(page.root?.classList.contains('ts-table--sortable')).toBe(true);
  });

  it('sets aria-sort on header after sort column and direction are set', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table sortable sort-column="name" sort-direction="asc">
          <table>
            <thead><tr><th data-column="name">Name</th><th data-column="email">Email</th></tr></thead>
            <tbody><tr><td>Alice</td><td>alice@example.com</td></tr></tbody>
          </table>
        </ts-table>
      `,
    });

    await page.waitForChanges();

    const th = page.root?.querySelector('th[data-column="name"]');
    expect(th?.getAttribute('aria-sort')).toBe('ascending');
  });

  it('emits tsSort event on header click', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table sortable>
          <table>
            <thead><tr><th data-column="name">Name</th></tr></thead>
            <tbody><tr><td>Alice</td></tr></tbody>
          </table>
        </ts-table>
      `,
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSort', spy);

    const th = page.root?.querySelector('th[data-column="name"]') as HTMLElement;
    th?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ column: 'name', direction: 'asc' });
  });

  it('applies selectable class when selectable prop is set', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table selectable>
          <table>
            <thead><tr><th>Name</th></tr></thead>
            <tbody>
              <tr data-value="alice"><td>Alice</td></tr>
            </tbody>
          </table>
        </ts-table>
      `,
    });

    expect(page.root?.classList.contains('ts-table--selectable')).toBe(true);
  });

  it('adds checkboxes when selectable is enabled', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table selectable>
          <table>
            <thead><tr><th>Name</th></tr></thead>
            <tbody>
              <tr data-value="alice"><td>Alice</td></tr>
              <tr data-value="bob"><td>Bob</td></tr>
            </tbody>
          </table>
        </ts-table>
      `,
    });

    await page.waitForChanges();

    const headerCheckbox = page.root?.querySelector('thead th.table__checkbox input[type="checkbox"]');
    expect(headerCheckbox).not.toBeNull();

    const rowCheckboxes = page.root?.querySelectorAll('tbody td.table__checkbox input[type="checkbox"]');
    expect(rowCheckboxes?.length).toBe(2);
  });

  it('emits tsSelectionChange when a row checkbox is clicked', async () => {
    const page = await newSpecPage({
      components: [TsTable],
      html: `
        <ts-table selectable>
          <table>
            <thead><tr><th>Name</th></tr></thead>
            <tbody>
              <tr data-value="alice"><td>Alice</td></tr>
            </tbody>
          </table>
        </ts-table>
      `,
    });

    await page.waitForChanges();

    const spy = jest.fn();
    page.root?.addEventListener('tsSelectionChange', spy);

    const checkbox = page.root?.querySelector('tbody td.table__checkbox input[type="checkbox"]') as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ selectedRows: ['alice'] });
  });
});
