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

  componentDidRender() {
    const items = this.hostEl.querySelectorAll('ts-breadcrumb-item');
    items.forEach((item, index) => {
      if (index < items.length - 1) {
        item.setAttribute('separator', this.separator);
      } else {
        item.removeAttribute('separator');
      }
    });
  }

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
