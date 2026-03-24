import { Component, Prop, Event, h, Host } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for label text.
 *
 * @part item - The list item wrapper.
 * @part link - The anchor or button element.
 * @part icon - The icon wrapper.
 * @part label - The label wrapper.
 */
@Component({
  tag: 'ts-nav-item',
  styleUrl: 'nav-item.css',
  shadow: true,
})
export class TsNavItem {
  /** The URL to navigate to. */
  @Prop() href?: string;

  /** Whether this item is currently active. */
  @Prop({ reflect: true }) active = false;

  /** Whether this item is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Lucide icon name to display. */
  @Prop() icon?: string;

  /** Emitted when the nav item is selected. */
  @Event({ eventName: 'tsSelect' }) tsSelect!: EventEmitter<void>;

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.tsSelect.emit();
  };

  render() {
    const Tag = this.href ? 'a' : 'button';
    const attrs = this.href
      ? { href: this.disabled ? undefined : this.href }
      : { type: 'button' as const, disabled: this.disabled };

    return (
      <Host
        class={{
          'ts-nav-item': true,
          'ts-nav-item--active': this.active,
          'ts-nav-item--disabled': this.disabled,
        }}
      >
        <li class="nav-item__wrapper" part="item" role="listitem">
          <Tag
            {...attrs}
            class="nav-item__link"
            part="link"
            aria-current={this.active ? 'page' : undefined}
            aria-disabled={this.disabled ? 'true' : undefined}
            onClick={this.handleClick}
          >
            {this.icon && (
              <span class="nav-item__icon" part="icon" aria-hidden="true">
                <ts-icon name={this.icon} size="sm" />
              </span>
            )}
            <span class="nav-item__label" part="label">
              <slot />
            </span>
          </Tag>
        </li>
      </Host>
    );
  }
}
