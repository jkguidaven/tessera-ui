import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * @slot - Default slot for ts-breadcrumb-item children.
 *
 * @part nav - The nav element.
 * @part list - The ordered list element.
 */
@Component({
  tag: 'ts-breadcrumb',
  styleUrl: 'breadcrumb.css',
  shadow: true,
})
export class TsBreadcrumb {
  @Element() hostEl!: HTMLElement;

  /** The separator character between breadcrumb items. */
  @Prop() separator = '/';

  /** Maximum number of visible items. Middle items are hidden when exceeded. */
  @Prop() maxItems?: number;

  componentDidRender(): void {
    const items = this.hostEl.querySelectorAll('ts-breadcrumb-item');
    items.forEach((item, index) => {
      if (index < items.length - 1) {
        item.setAttribute('separator', this.separator);
      } else {
        item.removeAttribute('separator');
      }
    });

    // Collapse middle items when maxItems is set
    if (this.maxItems !== undefined && items.length > this.maxItems) {
      const lastVisibleCount = this.maxItems - 1;
      const hideStart = 1;
      const hideEnd = items.length - lastVisibleCount;
      items.forEach((item, index) => {
        if (index >= hideStart && index < hideEnd) {
          (item as HTMLElement).style.display = 'none';
        } else {
          (item as HTMLElement).style.display = '';
        }
      });
    } else {
      items.forEach((item) => {
        (item as HTMLElement).style.display = '';
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host class="ts-breadcrumb">
        <nav part="nav" aria-label="Breadcrumb">
          <ol part="list" class="breadcrumb__list">
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
