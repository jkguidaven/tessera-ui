import { Component, Prop, State, Event, h, Host, Element, Watch, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId, trapFocus } from '../../utils/aria';

/**
 * @slot - Default slot for dialog body content.
 * @slot footer - Footer content (e.g., action buttons).
 *
 * @part overlay - The backdrop overlay.
 * @part dialog - The dialog container.
 * @part header - The heading wrapper.
 * @part body - The body content wrapper.
 * @part footer - The footer wrapper.
 * @part close - The close button.
 */
@Component({
  tag: 'ts-dialog',
  styleUrl: 'dialog.css',
  shadow: true,
})
export class TsDialog {
  @Element() hostEl!: HTMLElement;

  private dialogEl?: HTMLElement;
  private removeFocusTrap?: () => void;
  private previouslyFocused?: HTMLElement;
  private dialogId = generateId('ts-dialog');

  /** Whether the dialog is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** The dialog heading text. */
  @Prop() heading?: string;

  /** The dialog's width size preset. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'sm';

  /** Whether the dialog can be dismissed via close button, Escape, or overlay click. */
  @Prop() dismissible = true;

  /** Emitted when the dialog is closed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Internal animation state. */
  @State() isAnimating = false;

  @Watch('open')
  handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  /** Programmatically open the dialog. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically close the dialog. */
  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  private openDialog(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.isAnimating = true;

    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (this.dialogEl) {
        this.removeFocusTrap = trapFocus(this.dialogEl);
        this.dialogEl.focus();
      }
    });
  }

  private closeDialog(): void {
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

  private handleDialogClick = (event: MouseEvent): void => {
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

  render() {
    if (!this.open) return null;

    const headingId = `${this.dialogId}-heading`;

    return (
      <Host
        class={{
          'ts-dialog': true,
          'ts-dialog--open': this.open,
        }}
        onKeyDown={this.handleKeydown}
      >
        <div class="dialog__overlay" part="overlay" onClick={this.handleOverlayClick}>
          <div
            ref={(el) => (this.dialogEl = el)}
            class={{
              'dialog__panel': true,
              [`dialog__panel--${this.size}`]: true,
            }}
            part="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={this.heading ? headingId : undefined}
            tabindex={-1}
            onClick={this.handleDialogClick}
          >
            {this.dismissible && (
              <button
                class="dialog__close"
                part="close"
                type="button"
                aria-label="Close dialog"
                onClick={this.handleCloseClick}
              >
                &#x2715;
              </button>
            )}

            {this.heading && (
              <div class="dialog__header" part="header" id={headingId}>
                {this.heading}
              </div>
            )}

            <div class="dialog__body" part="body">
              <slot />
            </div>

            <div class="dialog__footer" part="footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
