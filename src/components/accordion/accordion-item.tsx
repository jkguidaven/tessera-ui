import { Component, Prop, Event, h, Host, State, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

let accordionItemId = 0;

/**
 * @slot - Default slot for panel content.
 * @slot header - Custom header content (replaces heading text).
 *
 * @part header - The header button.
 * @part panel - The content panel.
 */
@Component({
  tag: 'ts-accordion-item',
  styleUrl: 'accordion-item.css',
  shadow: true,
})
export class TsAccordionItem {
  private headerId!: string;
  private panelId!: string;

  /** Whether the item is expanded. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Disables toggling. */
  @Prop({ reflect: true }) disabled = false;

  /** Header text for the item. */
  @Prop() heading?: string;

  /** Emitted when the item is toggled. */
  @Event({ eventName: 'tsToggle' }) tsToggle!: EventEmitter<{ open: boolean }>;

  @State() internalOpen = false;

  @Watch('open')
  onOpenChange(newVal: boolean): void {
    this.internalOpen = newVal;
  }

  connectedCallback(): void {
    const id = accordionItemId++;
    this.headerId = `ts-accordion-header-${id}`;
    this.panelId = `ts-accordion-panel-${id}`;
    this.internalOpen = this.open;
  }

  private handleClick = (): void => {
    if (this.disabled) return;
    this.open = !this.open;
    this.internalOpen = this.open;
    this.tsToggle.emit({ open: this.open });
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-accordion-item': true,
          'ts-accordion-item--open': this.internalOpen,
          'ts-accordion-item--disabled': this.disabled,
        }}
      >
        <div
          class="accordion-item__header"
          part="header"
          id={this.headerId}
          role="button"
          tabindex={this.disabled ? -1 : 0}
          aria-expanded={this.internalOpen ? 'true' : 'false'}
          aria-controls={this.panelId}
          aria-disabled={this.disabled ? 'true' : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <slot name="header">
            <span class="accordion-item__heading">{this.heading}</span>
          </slot>
          <span class="accordion-item__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        <div
          class="accordion-item__panel"
          part="panel"
          id={this.panelId}
          role="region"
          aria-labelledby={this.headerId}
          hidden={!this.internalOpen}
        >
          <div class="accordion-item__content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
