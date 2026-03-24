import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for grid items.
 *
 * @part base - The grid container.
 */
@Component({
  tag: 'ts-grid',
  styleUrl: 'grid.css',
  shadow: true,
})
export class TsGrid {
  /** Number of columns or 'auto' for responsive auto-fill. */
  @Prop({ reflect: true }) columns: string = 'auto';

  /** Spacing token number for gap between items. */
  @Prop({ reflect: true }) gap: string = '4';

  /** Minimum column width when columns is 'auto'. */
  @Prop({ reflect: true }) minColumnWidth: string = '280px';

  /** Vertical alignment of grid items. */
  @Prop({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  render() {
    const gridTemplateColumns =
      this.columns === 'auto'
        ? `repeat(auto-fill, minmax(${this.minColumnWidth}, 1fr))`
        : `repeat(${this.columns}, 1fr)`;

    const style = {
      gridTemplateColumns,
      gap: `var(--ts-spacing-${this.gap})`,
      alignItems: this.align,
    };

    return (
      <Host style={style}>
        <slot />
      </Host>
    );
  }
}
