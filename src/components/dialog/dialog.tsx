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
  private overlayEl?: HTMLElement;
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

  /** When true, close actions emit tsRequestClose instead of closing directly. */
  @Prop() preventClose = false;

  /** Emitted when the dialog is closed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Emitted when the dialog is opened. */
  @Event({ eventName: 'tsOpen' }) tsOpen!: EventEmitter<void>;

  /** Emitted when a close is requested while preventClose is true. */
  @Event({ eventName: 'tsRequestClose' }) tsRequestClose!: EventEmitter<{ source: 'overlay' | 'escape' | 'close-button' }>;

  /** Internal animation state. */
  @State() isAnimating = false;

  /** Whether the dialog is playing the closing animation. */
  @State() isClosing = false;

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
    this.isClosing = false;

    document.body.style.overflow = 'hidden';

    this.tsOpen.emit();

    requestAnimationFrame(() => {
      if (this.dialogEl) {
        this.removeFocusTrap = trapFocus(this.dialogEl);
        this.dialogEl.focus();
      }
    });
  }

  private closeDialog(): void {
    this.isClosing = true;

    let finished = false;
    const finish = (): void => {
      if (finished) return;
      finished = true;
      clearTimeout(fallbackTimer);
      this.overlayEl?.removeEventListener('animationend', onAnimationEnd);
      this.finishClose();
    };

    const onAnimationEnd = (): void => {
      finish();
    };

    // Fallback timer in case animationend never fires (e.g., reduced motion, test env)
    const fallbackTimer = setTimeout(finish, 250);

    if (this.overlayEl) {
      this.overlayEl.addEventListener('animationend', onAnimationEnd);
    } else {
      finish();
    }
  }

  private finishClose(): void {
    this.isClosing = false;
    this.isAnimating = false;
    this.tsClose.emit();

    document.body.style.overflow = '';

    this.removeFocusTrap?.();
    this.previouslyFocused?.focus();
  }

  private requestCloseOrClose(source: 'overlay' | 'escape' | 'close-button'): void {
    if (this.preventClose) {
      this.tsRequestClose.emit({ source });
    } else {
      this.close();
    }
  }

  disconnectedCallback(): void {
    this.removeFocusTrap?.();
    document.body.style.overflow = '';
  }

  private handleOverlayClick = (): void => {
    if (this.dismissible) {
      this.requestCloseOrClose('overlay');
    }
  };

  private handleDialogClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.dismissible) {
      event.stopPropagation();
      this.requestCloseOrClose('escape');
    }
  };

  private handleCloseClick = (): void => {
    this.requestCloseOrClose('close-button');
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.open && !this.isClosing) return null;

    const headingId = `${this.dialogId}-heading`;

    return (
      <Host
        class={{
          'ts-dialog': true,
          'ts-dialog--open': this.open,
        }}
        onKeyDown={this.handleKeydown}
      >
        <div
          ref={(el) => (this.overlayEl = el)}
          class={{
            'dialog__overlay': true,
            'dialog--closing': this.isClosing,
          }}
          part="overlay"
          onClick={this.handleOverlayClick}
        >
          <div
            ref={(el) => (this.dialogEl = el)}
            class={{
              'dialog__panel': true,
              [`dialog__panel--${this.size}`]: true,
              'dialog--closing': this.isClosing,
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
