import { Component, Prop, Event, h, Host } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for label text.
 * @slot children - Slot for nested nav items when expandable.
 *
 * @part item - The list item wrapper.
 * @part link - The anchor or button element.
 * @part icon - The icon wrapper.
 * @part label - The label wrapper.
 * @part badge - The badge element.
 * @part chevron - The expand/collapse chevron indicator.
 * @part children - The nested children wrapper.
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

  /** Whether this item contains expandable nested items. */
  @Prop({ reflect: true }) expandable = false;

  /** Whether the nested items are currently visible. */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  /** Badge text or count to display after the label. */
  @Prop() badge?: string;

  /** Emitted when the nav item is selected. */
  @Event({ eventName: 'tsSelect' }) tsSelect!: EventEmitter<void>;

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.expandable) {
      event.preventDefault();
      this.expanded = !this.expanded;
      return;
    }
    this.tsSelect.emit();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const Tag = this.href && !this.expandable ? 'a' : 'button';
    const attrs =
      Tag === 'a'
        ? { href: this.disabled ? undefined : this.href }
        : { type: 'button' as const, disabled: this.disabled };

    return (
      <Host
        class={{
          'ts-nav-item': true,
          'ts-nav-item--active': this.active,
          'ts-nav-item--disabled': this.disabled,
          'ts-nav-item--expandable': this.expandable,
          'ts-nav-item--expanded': this.expanded,
        }}
      >
        <li class="nav-item__wrapper" part="item" role="listitem">
          <Tag
            {...attrs}
            class="nav-item__link"
            part="link"
            aria-current={this.active ? 'page' : undefined}
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-expanded={this.expandable ? String(this.expanded) : undefined}
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
            {this.badge !== undefined && !this.expandable && (
              <span class="nav-item__badge" part="badge">
                {this.badge}
              </span>
            )}
            {this.expandable && (
              <span class="nav-item__chevron" part="chevron" aria-hidden="true">
                <ts-icon name="chevron-right" size="sm" />
              </span>
            )}
          </Tag>
          {this.expandable && (
            <div class="nav-item__children" part="children" role="group">
              <slot name="children" />
            </div>
          )}
        </li>
      </Host>
    );
  }
}
