import { Component, Prop, Event, Watch, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * A styled wrapper for native HTML tables. Consumers place standard
 * `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements inside.
 *
 * Uses light DOM (no Shadow DOM) so nested table elements can be
 * styled directly via the component's CSS.
 *
 * @slot - Default slot for the native `<table>` element.
 */
@Component({
  tag: 'ts-table',
  styleUrl: 'table.css',
  shadow: false,
})
export class TsTable {
  @Element() hostEl!: HTMLElement;

  /** Applies alternating row background colors. */
  @Prop({ reflect: true }) striped = false;

  /** Adds borders to all cells. */
  @Prop({ reflect: true }) bordered = false;

  /** Highlights rows on hover. */
  @Prop({ reflect: true }) hoverable = false;

  /** Reduces cell padding for denser display. */
  @Prop({ reflect: true }) compact = false;

  /** Makes the table header stick to the top on scroll. */
  @Prop({ reflect: true }) stickyHeader = false;

  /** Enables column sorting on header click. */
  @Prop({ reflect: true }) sortable = false;

  /** The column identifier currently sorted by (matches `data-column` on `<th>`). */
  @Prop({ reflect: true, mutable: true }) sortColumn?: string;

  /** The current sort direction. */
  @Prop({ reflect: true, mutable: true }) sortDirection: 'asc' | 'desc' | 'none' = 'none';

  /** Enables row selection with checkboxes. */
  @Prop({ reflect: true }) selectable = false;

  /** Array of selected row values (matches `data-value` on `<tr>`). */
  @Prop({ mutable: true }) selectedRows: string[] = [];

  /** Emitted when a column header is clicked for sorting. */
  @Event({ eventName: 'tsSort' }) tsSort!: EventEmitter<{ column: string; direction: 'asc' | 'desc' }>;

  /** Emitted when row selection changes. */
  @Event({ eventName: 'tsSelectionChange' }) tsSelectionChange!: EventEmitter<{ selectedRows: string[] }>;

  private headerClickHandlers = new Map<HTMLElement, EventListener>();
  private checkboxHandlers = new Map<HTMLElement, EventListener>();

  componentDidLoad(): void {
    this.setupSortable();
    this.setupSelectable();
  }

  componentDidUpdate(): void {
    this.setupSortable();
    this.setupSelectable();
  }

  @Watch('sortColumn')
  @Watch('sortDirection')
  onSortChange(): void {
    this.updateSortIndicators();
  }

  @Watch('selectedRows')
  onSelectedRowsChange(): void {
    this.updateCheckboxStates();
  }

  disconnectedCallback(): void {
    this.cleanupSortHandlers();
    this.cleanupCheckboxHandlers();
  }

  private cleanupSortHandlers(): void {
    this.headerClickHandlers.forEach((handler, el) => {
      el.removeEventListener('click', handler);
    });
    this.headerClickHandlers.clear();
  }

  private cleanupCheckboxHandlers(): void {
    this.checkboxHandlers.forEach((handler, el) => {
      el.removeEventListener('change', handler);
    });
    this.checkboxHandlers.clear();
  }

  private setupSortable(): void {
    if (!this.sortable) return;

    const headers = Array.from(this.hostEl.querySelectorAll('th'));

    // Clean up old handlers first
    this.cleanupSortHandlers();

    headers.forEach((th) => {
      const column = th.getAttribute('data-column') || th.textContent?.trim() || '';
      if (!column) return;

      // Remove any existing sort indicators before re-adding
      const existingIndicator = th.querySelector('.table__sort-indicator');
      if (existingIndicator) existingIndicator.remove();

      const handler = (): void => {
        this.handleSortClick(column);
      };

      th.addEventListener('click', handler);
      this.headerClickHandlers.set(th, handler);
    });

    this.updateSortIndicators();
  }

  private handleSortClick(column: string): void {
    let newDirection: 'asc' | 'desc';

    if (this.sortColumn === column) {
      newDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      newDirection = 'asc';
    }

    this.sortColumn = column;
    this.sortDirection = newDirection;

    this.tsSort.emit({ column, direction: newDirection });
    this.updateSortIndicators();
  }

  private updateSortIndicators(): void {
    if (!this.sortable) return;

    const headers = Array.from(this.hostEl.querySelectorAll('th'));

    headers.forEach((th) => {
      const column = th.getAttribute('data-column') || th.textContent?.trim() || '';

      // Remove existing indicator
      const existing = th.querySelector('.table__sort-indicator');
      if (existing) existing.remove();

      // Set aria-sort
      if (column === this.sortColumn && this.sortDirection !== 'none') {
        th.setAttribute('aria-sort', this.sortDirection === 'asc' ? 'ascending' : 'descending');

        const indicator = document.createElement('span');
        indicator.className = 'table__sort-indicator';
        indicator.textContent = this.sortDirection === 'asc' ? ' \u25B2' : ' \u25BC';
        th.appendChild(indicator);
      } else {
        th.removeAttribute('aria-sort');
      }
    });
  }

  private setupSelectable(): void {
    if (!this.selectable) return;

    // Clean up old handlers
    this.cleanupCheckboxHandlers();

    const thead = this.hostEl.querySelector('thead');
    const tbody = this.hostEl.querySelector('tbody');

    if (!thead || !tbody) return;

    // Add header checkbox if not already present
    const headerRow = thead.querySelector('tr');
    if (headerRow) {
      let headerCheckboxTh = headerRow.querySelector('th.table__checkbox');
      if (!headerCheckboxTh) {
        headerCheckboxTh = document.createElement('th');
        headerCheckboxTh.className = 'table__checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('aria-label', 'Select all rows');
        headerCheckboxTh.appendChild(checkbox);
        headerRow.insertBefore(headerCheckboxTh, headerRow.firstChild);
      }

      const headerCheckbox = headerCheckboxTh.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (headerCheckbox) {
        const handler = (): void => {
          this.handleSelectAll(headerCheckbox.checked);
        };
        headerCheckbox.addEventListener('change', handler);
        this.checkboxHandlers.set(headerCheckbox, handler);
      }
    }

    // Add row checkboxes
    const rows = Array.from(tbody.querySelectorAll('tr[data-value]'));
    rows.forEach((tr) => {
      const value = tr.getAttribute('data-value') || '';
      let checkboxTd = tr.querySelector('td.table__checkbox');
      if (!checkboxTd) {
        checkboxTd = document.createElement('td');
        checkboxTd.className = 'table__checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('aria-label', `Select row ${value}`);
        checkboxTd.appendChild(checkbox);
        tr.insertBefore(checkboxTd, tr.firstChild);
      }

      const checkbox = checkboxTd.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) {
        const handler = (): void => {
          this.handleRowSelect(value, checkbox.checked);
        };
        checkbox.addEventListener('change', handler);
        this.checkboxHandlers.set(checkbox, handler);
      }
    });

    this.updateCheckboxStates();
  }

  private handleSelectAll(checked: boolean): void {
    const tbody = this.hostEl.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr[data-value]'));
    if (checked) {
      this.selectedRows = rows.map((tr) => tr.getAttribute('data-value') || '');
    } else {
      this.selectedRows = [];
    }

    this.tsSelectionChange.emit({ selectedRows: [...this.selectedRows] });
    this.updateCheckboxStates();
  }

  private handleRowSelect(value: string, checked: boolean): void {
    if (checked) {
      this.selectedRows = [...this.selectedRows, value];
    } else {
      this.selectedRows = this.selectedRows.filter((v) => v !== value);
    }

    this.tsSelectionChange.emit({ selectedRows: [...this.selectedRows] });
    this.updateCheckboxStates();
  }

  private updateCheckboxStates(): void {
    if (!this.selectable) return;

    const tbody = this.hostEl.querySelector('tbody');
    const thead = this.hostEl.querySelector('thead');
    if (!tbody) return;

    // Update row checkboxes
    const rows = Array.from(tbody.querySelectorAll('tr[data-value]'));
    rows.forEach((tr) => {
      const value = tr.getAttribute('data-value') || '';
      const checkbox = tr.querySelector('td.table__checkbox input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = this.selectedRows.includes(value);
      }
    });

    // Update header checkbox
    if (thead) {
      const headerCheckbox = thead.querySelector('th.table__checkbox input[type="checkbox"]') as HTMLInputElement;
      if (headerCheckbox) {
        const allSelected = rows.length > 0 && rows.every((tr) => this.selectedRows.includes(tr.getAttribute('data-value') || ''));
        const someSelected = rows.some((tr) => this.selectedRows.includes(tr.getAttribute('data-value') || ''));
        headerCheckbox.checked = allSelected;
        headerCheckbox.indeterminate = someSelected && !allSelected;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-table': true,
          'ts-table--striped': this.striped,
          'ts-table--bordered': this.bordered,
          'ts-table--hoverable': this.hoverable,
          'ts-table--compact': this.compact,
          'ts-table--sticky-header': this.stickyHeader,
          'ts-table--sortable': this.sortable,
          'ts-table--selectable': this.selectable,
        }}
      >
        <div class="table__wrapper" role="region" tabindex={0}>
          <slot />
        </div>
      </Host>
    );
  }
}
