import { Component, Prop, State, Event, h, Host, Element, Watch, Listen } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId } from '../../utils/aria';

export type TsMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export type TsMenuTrigger = 'click' | 'hover';

/**
 * @slot trigger - The element that opens the menu (e.g., a button).
 * @slot - Default slot for ts-menu-item children.
 *
 * @part panel - The dropdown panel container.
 */
@Component({
  tag: 'ts-menu',
  styleUrl: 'menu.css',
  shadow: true,
})
export class TsMenu {
  @Element() hostEl!: HTMLElement;

  private menuId = generateId('ts-menu');
  private triggerEl?: HTMLElement;

  /** Whether the menu dropdown is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** How the menu is triggered. */
  @Prop({ reflect: true }) trigger: TsMenuTrigger = 'click';

  /** Placement of the dropdown relative to the trigger. */
  @Prop({ reflect: true }) placement: TsMenuPlacement = 'bottom-start';

  /** Emitted when the menu opens. */
  @Event({ eventName: 'tsOpen' }) tsOpen!: EventEmitter<void>;

  /** Emitted when the menu closes. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Tracks the currently focused item index for keyboard navigation. */
  @State() focusedIndex = -1;

  @Watch('open')
  handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.tsOpen.emit();
      requestAnimationFrame(() => {
        this.focusFirstItem();
      });
    } else {
      this.focusedIndex = -1;
      this.tsClose.emit();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent): void {
    if (this.open && !this.hostEl.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @Listen('tsSelect')
  handleItemSelect(): void {
    this.open = false;
    this.triggerEl?.focus();
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    if (!this.open) return;

    const items = this.getMenuItems();
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % items.length;
        this.focusItem(items[this.focusedIndex]);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.focusedIndex = this.focusedIndex <= 0 ? items.length - 1 : this.focusedIndex - 1;
        this.focusItem(items[this.focusedIndex]);
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.focusedIndex = 0;
        this.focusItem(items[0]);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.focusedIndex = items.length - 1;
        this.focusItem(items[this.focusedIndex]);
        break;
      }
      case 'Escape': {
        event.preventDefault();
        this.open = false;
        this.triggerEl?.focus();
        break;
      }
      case 'Tab': {
        this.open = false;
        break;
      }
    }
  }

  private getMenuItems(): HTMLElement[] {
    return Array.from(this.hostEl.querySelectorAll<HTMLElement>('ts-menu-item:not([disabled])'));
  }

  private focusItem(el: HTMLElement): void {
    const item = el as HTMLElement & { setFocus?: () => Promise<void> };
    if (typeof item.setFocus === 'function') {
      item.setFocus();
    } else {
      el.focus();
    }
  }

  private focusFirstItem(): void {
    const items = this.getMenuItems();
    if (items.length > 0) {
      this.focusedIndex = 0;
      this.focusItem(items[0]);
    }
  }

  private handleTriggerClick = (): void => {
    if (this.trigger === 'click') {
      this.open = !this.open;
    }
  };

  private handleTriggerKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open = true;
    }
  };

  private handleMouseEnter = (): void => {
    if (this.trigger === 'hover') {
      this.open = true;
    }
  };

  private handleMouseLeave = (): void => {
    if (this.trigger === 'hover') {
      this.open = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-menu': true,
          'ts-menu--open': this.open,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          class="menu__trigger"
          ref={(el) => (this.triggerEl = el)}
          onClick={this.handleTriggerClick}
          onKeyDown={this.handleTriggerKeydown}
          aria-haspopup="true"
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls={this.menuId}
        >
          <slot name="trigger" />
        </div>

        <div
          class={{
            'menu__panel': true,
            'menu__panel--open': this.open,
            [`menu__panel--${this.placement}`]: true,
          }}
          part="panel"
          id={this.menuId}
          role="menu"
          aria-hidden={!this.open ? 'true' : undefined}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
