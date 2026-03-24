import { Component, Prop, State, Event, h, Host, Element, Method, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId, trapFocus } from '../../utils/aria';

/**
 * @slot - Default slot for drawer body content.
 * @slot footer - Drawer footer content (e.g., action buttons).
 *
 * @part overlay - The backdrop overlay.
 * @part panel - The slide-in panel container.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 * @part close - The close button.
 */
@Component({
  tag: 'ts-drawer',
  styleUrl: 'drawer.css',
  shadow: true,
})
export class TsDrawer {
  @Element() hostEl!: HTMLElement;

  private panelEl?: HTMLElement;
  private removeFocusTrap?: () => void;
  private previouslyFocused?: HTMLElement;
  private drawerId = generateId('ts-drawer');

  /** Whether the drawer is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Which edge the drawer slides in from. */
  @Prop({ reflect: true }) placement: 'start' | 'end' | 'top' | 'bottom' = 'end';

  /** The drawer's width/height preset. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'full' = 'md';

  /** Whether clicking the overlay or pressing Escape closes the drawer. */
  @Prop() dismissible = true;

  /** Accessible heading for the drawer. */
  @Prop() heading?: string;

  /** Emitted when the drawer closes. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Internal animation state. */
  @State() isAnimating = false;

  @Watch('open')
  handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }

  /** Programmatically open the drawer. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically close the drawer. */
  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  private openDrawer(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.isAnimating = true;

    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (this.panelEl) {
        this.removeFocusTrap = trapFocus(this.panelEl);
        this.panelEl.focus();
      }
    });
  }

  private closeDrawer(): void {
    this.isAnimating = false;
    this.tsClose.emit();

    document.body.style.overflow = '';
    this.removeFocusTrap?.();
    this.previouslyFocused?.focus();
  }

  disconnectedCallback(): void {
    this.removeFocusTrap?.();
    document.body.style.overflow = '';
  }

  private handleOverlayClick = (): void => {
    if (this.dismissible) {
      this.close();
    }
  };

  private handlePanelClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.dismissible) {
      event.stopPropagation();
      this.close();
    }
  };

  private handleCloseClick = (): void => {
    this.close();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.open) return null;

    return (
      <Host
        class={{
          'ts-drawer': true,
          'ts-drawer--open': this.open,
          [`ts-drawer--${this.placement}`]: true,
          [`ts-drawer--${this.size}`]: true,
        }}
        onKeyDown={this.handleKeydown}
      >
        <div class="drawer__overlay" part="overlay" onClick={this.handleOverlayClick}>
          <div
            ref={(el) => (this.panelEl = el)}
            class={{
              'drawer__panel': true,
              [`drawer__panel--${this.placement}`]: true,
              [`drawer__panel--${this.size}`]: true,
            }}
            part="panel"
            role="dialog"
            aria-modal="true"
            aria-label={this.heading}
            aria-labelledby={!this.heading ? `${this.drawerId}-header` : undefined}
            tabindex={-1}
            onClick={this.handlePanelClick}
          >
            <div class="drawer__header" part="header" id={`${this.drawerId}-header`}>
              {this.heading && <span class="drawer__title">{this.heading}</span>}
              {this.dismissible && (
                <button
                  class="drawer__close"
                  part="close"
                  type="button"
                  aria-label="Close drawer"
                  onClick={this.handleCloseClick}
                >
                  &#x2715;
                </button>
              )}
            </div>

            <div class="drawer__body" part="body">
              <slot />
            </div>

            <div class="drawer__footer" part="footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
