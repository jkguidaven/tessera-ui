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

  /** The type of menu item. */
  @Prop({ reflect: true }) type: 'default' | 'checkbox' | 'radio' = 'default';

  /** Whether the checkbox/radio item is checked. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Visual variant of the menu item. */
  @Prop({ reflect: true }) variant: 'default' | 'danger' = 'default';

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
    if (this.type === 'checkbox') {
      this.checked = !this.checked;
    }
    this.tsSelect.emit({ value: this.value });
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.type === 'checkbox') {
        this.checked = !this.checked;
      }
      this.tsSelect.emit({ value: this.value });
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const isLink = !!this.href;
    const Tag = isLink ? 'a' : 'div';

    const linkAttrs = isLink
      ? {
          href: this.disabled ? undefined : this.href,
        }
      : {};

    const role = this.type === 'checkbox' ? 'menuitemcheckbox' : this.type === 'radio' ? 'menuitemradio' : 'menuitem';
    const ariaChecked = this.type !== 'default' ? (this.checked ? 'true' : 'false') : undefined;

    return (
      <Host
        class={{
          'ts-menu-item': true,
          'ts-menu-item--disabled': this.disabled,
          'ts-menu-item--danger': this.variant === 'danger',
          'ts-menu-item--checked': this.checked && this.type !== 'default',
        }}
      >
        <Tag
          {...linkAttrs}
          ref={(el) => (this.baseEl = el as HTMLElement)}
          class="menu-item__base"
          part="base"
          role={role}
          tabindex={this.disabled ? -1 : 0}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-checked={ariaChecked}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          {this.type !== 'default' && (
            <span class="menu-item__check" aria-hidden="true">
              {this.checked ? '\u2713' : ''}
            </span>
          )}

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
