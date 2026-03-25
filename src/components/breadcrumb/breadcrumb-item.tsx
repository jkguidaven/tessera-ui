import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for label text.
 * @slot icon - Optional icon slot rendered before the label.
 *
 * @part link - The anchor or span element.
 * @part separator - The separator element.
 */
@Component({
  tag: 'ts-breadcrumb-item',
  styleUrl: 'breadcrumb-item.css',
  shadow: true,
})
export class TsBreadcrumbItem {
  /** If set, renders as a link. */
  @Prop() href?: string;

  /** Marks this item as the current page. */
  @Prop({ reflect: true }) current = false;

  /** Separator character (set by parent ts-breadcrumb). */
  @Prop() separator?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const isLink = !!this.href && !this.current;

    return (
      <Host class={{ 'ts-breadcrumb-item': true, 'ts-breadcrumb-item--current': this.current }}>
        <li class="breadcrumb-item__li">
          {isLink ? (
            <a href={this.href} part="link" class="breadcrumb-item__link">
              <slot name="icon" />
              <slot />
            </a>
          ) : (
            <span
              part="link"
              class="breadcrumb-item__text"
              aria-current={this.current ? 'page' : undefined}
            >
              <slot name="icon" />
              <slot />
            </span>
          )}
          {this.separator && (
            <span class="breadcrumb-item__separator" part="separator" aria-hidden="true">
              {this.separator}
            </span>
          )}
        </li>
      </Host>
    );
  }
}
