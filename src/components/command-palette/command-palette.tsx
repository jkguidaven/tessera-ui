import { Component, Prop, State, Event, h, Host, Element, Watch, Listen } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId } from '../../utils/aria';

/**
 * A command palette overlay for quick search and action execution.
 * Activated via Cmd+K (Mac) / Ctrl+K (Windows/Linux).
 *
 * @slot - Default slot for `<ts-command-palette-item>` children.
 *
 * @part overlay - The backdrop overlay.
 * @part panel - The palette panel container.
 * @part search - The search input element.
 * @part list - The scrollable results list.
 */
@Component({
  tag: 'ts-command-palette',
  styleUrl: 'command-palette.css',
  shadow: true,
})
export class TsCommandPalette {
  @Element() hostEl!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private paletteId = generateId('ts-cmd');

  /** Whether the command palette is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Placeholder text for the search input. */
  @Prop() placeholder = 'Type a command...';

  /** The current search query. */
  @State() searchQuery = '';

  /** The index of the currently focused item. */
  @State() focusedIndex = 0;

  /** Emitted when an item is selected. */
  @Event({ eventName: 'tsSelect' }) tsSelect!: EventEmitter<{ value: string }>;

  /** Emitted when the palette is closed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  @Watch('open')
  handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.searchQuery = '';
      this.focusedIndex = 0;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        this.inputEl?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }
  }

  @Listen('keydown', { target: 'document' })
  handleGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.open = !this.open;
      if (!this.open) {
        this.tsClose.emit();
      }
    }
  }

  disconnectedCallback(): void {
    document.body.style.overflow = '';
  }

  private getVisibleItems(): HTMLTsCommandPaletteItemElement[] {
    const items = Array.from(
      this.hostEl.querySelectorAll('ts-command-palette-item'),
    ) as HTMLTsCommandPaletteItemElement[];

    if (!this.searchQuery) return items;

    const query = this.searchQuery.toLowerCase();
    return items.filter((item) => {
      const label = item.getAttribute('label') || '';
      return label.toLowerCase().includes(query);
    });
  }

  private handleInput = (event: InputEvent): void => {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.focusedIndex = 0;
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    const items = this.getVisibleItems();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = items.length > 0 ? (this.focusedIndex + 1) % items.length : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = items.length > 0 ? (this.focusedIndex - 1 + items.length) % items.length : 0;
        break;
      case 'Enter':
        event.preventDefault();
        if (items.length > 0 && items[this.focusedIndex]) {
          const value = items[this.focusedIndex].getAttribute('value') || '';
          this.tsSelect.emit({ value });
          this.open = false;
          this.tsClose.emit();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.open = false;
        this.tsClose.emit();
        break;
    }
  };

  private handleOverlayClick = (): void => {
    this.open = false;
    this.tsClose.emit();
  };

  private handlePanelClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.open) return null;

    const visibleItems = this.getVisibleItems();

    // Update visibility on slotted items
    const allItems = Array.from(
      this.hostEl.querySelectorAll('ts-command-palette-item'),
    ) as HTMLElement[];

    allItems.forEach((item) => {
      item.style.display = visibleItems.includes(item as HTMLTsCommandPaletteItemElement) ? '' : 'none';
    });

    // Update focused state on items
    visibleItems.forEach((item, index) => {
      item.setAttribute('data-focused', index === this.focusedIndex ? 'true' : 'false');
    });

    const listId = `${this.paletteId}-list`;

    return (
      <Host
        class={{
          'ts-command-palette': true,
          'ts-command-palette--open': this.open,
        }}
      >
        <div
          class="command-palette__overlay"
          part="overlay"
          onClick={this.handleOverlayClick}
        >
          <div
            class="command-palette__panel"
            part="panel"
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-owns={listId}
            onClick={this.handlePanelClick}
            onKeyDown={this.handleKeydown}
          >
            <div class="command-palette__search">
              <svg class="command-palette__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={(el) => (this.inputEl = el)}
                class="command-palette__input"
                part="search"
                type="text"
                placeholder={this.placeholder}
                aria-label={this.placeholder}
                aria-autocomplete="list"
                aria-controls={listId}
                value={this.searchQuery}
                onInput={this.handleInput}
              />
            </div>

            <div class="command-palette__list" part="list" role="listbox" id={listId}>
              <slot />
              {visibleItems.length === 0 && (
                <div class="command-palette__empty">No results found</div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

interface HTMLTsCommandPaletteItemElement extends HTMLElement {
  value?: string;
  label?: string;
}
