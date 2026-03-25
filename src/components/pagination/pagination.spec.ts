import { newSpecPage } from '@stencil/core/testing';
import { TsPagination } from './pagination';

describe('ts-pagination', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="100"></ts-pagination>',
    });

    expect(page.root).not.toBeNull();
    const nav = page.root?.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Pagination');
  });

  it('calculates total pages correctly', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="30" page-size="10"></ts-pagination>',
    });

    // 30 / 10 = 3 pages — small enough that all pages are shown
    const pageButtons = page.root?.shadowRoot?.querySelectorAll('.pagination__button:not(.pagination__prev):not(.pagination__next)');
    expect(pageButtons?.length).toBe(3);
  });

  it('marks current page with aria-current', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" page-size="10" current-page="3"></ts-pagination>',
    });

    const activeButton = page.root?.shadowRoot?.querySelector('[aria-current="page"]');
    expect(activeButton).not.toBeNull();
    expect(activeButton?.textContent).toBe('3');
  });

  it('disables prev button on first page', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" current-page="1"></ts-pagination>',
    });

    const prevBtn = page.root?.shadowRoot?.querySelector('.pagination__prev');
    expect(prevBtn?.hasAttribute('disabled')).toBe(true);
  });

  it('disables next button on last page', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" page-size="10" current-page="5"></ts-pagination>',
    });

    const nextBtn = page.root?.shadowRoot?.querySelector('.pagination__next');
    expect(nextBtn?.hasAttribute('disabled')).toBe(true);
  });

  it('emits tsChange when a page is clicked', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" page-size="10" current-page="1"></ts-pagination>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const buttons = page.root?.shadowRoot?.querySelectorAll('.pagination__button:not(.pagination__prev):not(.pagination__next)');
    // Click page 2
    (buttons?.[1] as HTMLElement)?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ page: 2 });
  });

  it('shows ellipsis for large page counts', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="200" page-size="10" current-page="10"></ts-pagination>',
    });

    const ellipsis = page.root?.shadowRoot?.querySelectorAll('.pagination__ellipsis');
    expect(ellipsis?.length).toBeGreaterThan(0);
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" size="sm"></ts-pagination>',
    });

    expect(page.root?.getAttribute('size')).toBe('sm');
  });

  it('renders first/last buttons when showFirstLast is true', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="100" page-size="10" current-page="5" show-first-last="true"></ts-pagination>',
    });

    const firstBtn = page.root?.shadowRoot?.querySelector('.pagination__first');
    const lastBtn = page.root?.shadowRoot?.querySelector('.pagination__last');
    expect(firstBtn).not.toBeNull();
    expect(lastBtn).not.toBeNull();
  });

  it('disables first button on page 1', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="100" page-size="10" current-page="1" show-first-last="true"></ts-pagination>',
    });

    const firstBtn = page.root?.shadowRoot?.querySelector('.pagination__first');
    expect(firstBtn?.hasAttribute('disabled')).toBe(true);
  });

  it('disables last button on last page', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="50" page-size="10" current-page="5" show-first-last="true"></ts-pagination>',
    });

    const lastBtn = page.root?.shadowRoot?.querySelector('.pagination__last');
    expect(lastBtn?.hasAttribute('disabled')).toBe(true);
  });

  it('renders info text when showInfo is true', async () => {
    const page = await newSpecPage({
      components: [TsPagination],
      html: '<ts-pagination total="100" page-size="10" current-page="3" show-info="true"></ts-pagination>',
    });

    const info = page.root?.shadowRoot?.querySelector('.pagination__info');
    expect(info).not.toBeNull();
    expect(info?.textContent).toBe('Showing 21-30 of 100');
  });
});
