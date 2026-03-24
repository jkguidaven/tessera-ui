import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * A styled wrapper for native HTML tables. Consumers place standard
 * `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements inside.
 *
 * The component provides a scrollable wrapper, sticky header support,
 * and CSS custom properties for consistent table styling.
 *
 * @slot - Default slot for the native `<table>` element.
 *
 * @part wrapper - The scrollable wrapper div.
 */
@Component({
  tag: 'ts-table',
  styleUrl: 'table.css',
  shadow: true,
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
        }}
      >
        <div class="table__wrapper" part="wrapper" role="region" tabindex={0}>
          <slot />
        </div>
      </Host>
    );
  }
}
