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
});
