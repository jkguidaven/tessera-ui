import {
  Component,
  Prop,
  State,
  Event,
  h,
  Host,
  Element,
  Method,
  Watch,
} from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';
import { generateId, trapFocus } from '../../utils/aria';

/**
 * @slot - Default slot for modal body content.
 * @slot header - Modal header content.
 * @slot footer - Modal footer content (e.g., action buttons).
 *
 * @part overlay - The backdrop overlay.
 * @part dialog - The dialog container.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 * @part close - The close button.
 */
@Component({
  tag: 'ts-modal',
  styleUrl: 'modal.css',
  shadow: true,
})
export class TsModal {
  @Element() hostEl!: HTMLElement;

  private dialogEl?: HTMLElement;
  private removeFocusTrap?: () => void;
  private previouslyFocused?: HTMLElement;
  private modalId = generateId('ts-modal');

  /** Whether the modal is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** The modal's width size preset. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Label for accessibility (used as aria-label). */
  @Prop() label?: string;

  /** Whether clicking the overlay closes the modal. */
  @Prop() closeOnOverlay = true;

  /** Whether pressing Escape closes the modal. */
  @Prop() closeOnEscape = true;

  /** Whether to show the close button. */
  @Prop() showClose = true;

  /** Emitted when the modal opens. */
  @Event({ eventName: 'tsOpen' }) tsOpen!: EventEmitter<void>;

  /** Emitted when the modal closes. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Internal animation state. */
  @State() isAnimating = false;

  @Watch('open')
  handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  /** Programmatically open the modal. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically close the modal. */
  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  private openModal(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.isAnimating = true;
    this.tsOpen.emit();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (this.dialogEl) {
        this.removeFocusTrap = trapFocus(this.dialogEl);
        // Focus the dialog itself
        this.dialogEl.focus();
      }
    });
  }

  private closeModal(): void {
    this.isAnimating = false;
    this.tsClose.emit();

    // Restore body scroll
    document.body.style.overflow = '';

    // Clean up focus trap
    this.removeFocusTrap?.();

    // Restore focus
    this.previouslyFocused?.focus();
  }

  disconnectedCallback(): void {
    this.removeFocusTrap?.();
    document.body.style.overflow = '';
  }

  private handleOverlayClick = (): void => {
    if (this.closeOnOverlay) {
      this.close();
    }
  };

  private handleDialogClick = (event: MouseEvent): void => {
    // Prevent overlay click from firing when clicking inside the dialog
    event.stopPropagation();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.closeOnEscape) {
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
          'ts-modal': true,
          'ts-modal--open': this.open,
        }}
        onKeyDown={this.handleKeydown}
      >
        <div class="modal__overlay" part="overlay" onClick={this.handleOverlayClick}>
          <div
            ref={(el) => (this.dialogEl = el)}
            class={{
              'modal__dialog': true,
              [`modal__dialog--${this.size}`]: true,
            }}
            part="dialog"
            role="dialog"
            aria-modal="true"
            aria-label={this.label}
            aria-labelledby={!this.label ? `${this.modalId}-header` : undefined}
            tabindex={-1}
            onClick={this.handleDialogClick}
          >
            {this.showClose && (
              <button
                class="modal__close"
                part="close"
                type="button"
                aria-label="Close modal"
                onClick={this.handleCloseClick}
              >
                ✕
              </button>
            )}

            <div class="modal__header" part="header" id={`${this.modalId}-header`}>
              <slot name="header" />
            </div>

            <div class="modal__body" part="body">
              <slot />
            </div>

            <div class="modal__footer" part="footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
