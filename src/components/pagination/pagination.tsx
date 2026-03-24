import { Component, Prop, Event, h, Host } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @part nav - The nav element.
 * @part button - Each page button.
 * @part prev - The previous button.
 * @part next - The next button.
 */
@Component({
  tag: 'ts-pagination',
  styleUrl: 'pagination.css',
  shadow: true,
})
export class TsPagination {
  /** Total number of items. */
  @Prop() total!: number;

  /** Number of items per page. */
  @Prop() pageSize = 10;

  /** The current active page (1-based). */
  @Prop({ mutable: true, reflect: true }) currentPage = 1;

  /** Number of sibling pages shown around the current page. */
  @Prop() siblingCount = 1;

  /** The size of the pagination buttons. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Emitted when the page changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ page: number }>;

  private get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private getPageRange(): (number | 'ellipsis')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const siblings = this.siblingCount;

    const range: (number | 'ellipsis')[] = [];

    const leftSibling = Math.max(current - siblings, 2);
    const rightSibling = Math.min(current + siblings, total - 1);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    // Always show first page
    range.push(1);

    if (showLeftEllipsis) {
      range.push('ellipsis');
    } else {
      for (let i = 2; i < leftSibling; i++) {
        range.push(i);
      }
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      range.push(i);
    }

    if (showRightEllipsis) {
      range.push('ellipsis');
    } else {
      for (let i = rightSibling + 1; i < total; i++) {
        range.push(i);
      }
    }

    // Always show last page (if > 1)
    if (total > 1) {
      range.push(total);
    }

    return range;
  }

  private handlePageClick = (page: number) => {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.tsChange.emit({ page });
  };

  render() {
    const pages = this.getPageRange();
    const isFirstPage = this.currentPage <= 1;
    const isLastPage = this.currentPage >= this.totalPages;

    return (
      <Host
        class={{
          'ts-pagination': true,
          [`ts-pagination--${this.size}`]: true,
        }}
      >
        <nav part="nav" aria-label="Pagination" class="pagination__nav">
          <button
            class="pagination__button pagination__prev"
            part="prev"
            disabled={isFirstPage}
            aria-label="Previous page"
            onClick={() => this.handlePageClick(this.currentPage - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <span class="pagination__ellipsis" key={`ellipsis-${index}`} aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                class={{
                  pagination__button: true,
                  'pagination__button--active': page === this.currentPage,
                }}
                part="button"
                aria-current={page === this.currentPage ? 'page' : undefined}
                aria-label={`Page ${page}`}
                onClick={() => this.handlePageClick(page)}
                key={page}
              >
                {page}
              </button>
            ),
          )}

          <button
            class="pagination__button pagination__next"
            part="next"
            disabled={isLastPage}
            aria-label="Next page"
            onClick={() => this.handlePageClick(this.currentPage + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      </Host>
    );
  }
}
