import { Component, Prop, Event, h, Host, Element, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for menu item label content.
 * @slot prefix - Content before the label (e.g., icon).
 * @slot suffix - Content after the label (e.g., shortcut or badge).
 *
 * @part base - The menu item container element.
 * @part prefix - The prefix slot wrapper.
 * @part label - The label wrapper.
 * @part suffix - The suffix slot wrapper.
 */
@Component({
  tag: 'ts-menu-item',
  styleUrl: 'menu-item.css',
  shadow: true,
})
export class TsMenuItem {
  @Element() hostEl!: HTMLElement;

  /** Disables the menu item. */
  @Prop({ reflect: true }) disabled = false;

  /** The value associated with this menu item. */
  @Prop({ reflect: true }) value = '';

  /** If provided, renders the item as a link. */
  @Prop() href?: string;

  /** Emitted when the menu item is selected. */
  @Event({ eventName: 'tsSelect' }) tsSelect!: EventEmitter<{ value: string }>;

  private baseEl?: HTMLElement;

  /** Focus the menu item. */
  @Method()
  async setFocus(): Promise<void> {
    this.baseEl?.focus();
  }

  connectedCallback(): void {
    // Allow the host element to delegate focus to the inner element
    this.hostEl.addEventListener('focus', () => {
      this.baseEl?.focus();
    });
  }

  private handleClick = (): void => {
    if (this.disabled) return;
    this.tsSelect.emit({ value: this.value });
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.tsSelect.emit({ value: this.value });
    }
  };

  render() {
    const isLink = !!this.href;
    const Tag = isLink ? 'a' : 'div';

    const linkAttrs = isLink
      ? {
          href: this.disabled ? undefined : this.href,
        }
      : {};

    return (
      <Host
        class={{
          'ts-menu-item': true,
          'ts-menu-item--disabled': this.disabled,
        }}
      >
        <Tag
          {...linkAttrs}
          ref={(el) => (this.baseEl = el as HTMLElement)}
          class="menu-item__base"
          part="base"
          role="menuitem"
          tabindex={this.disabled ? -1 : 0}
          aria-disabled={this.disabled ? 'true' : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <span class="menu-item__prefix" part="prefix">
            <slot name="prefix" />
          </span>

          <span class="menu-item__label" part="label">
            <slot />
          </span>

          <span class="menu-item__suffix" part="suffix">
            <slot name="suffix" />
          </span>
        </Tag>
      </Host>
    );
  }
}
