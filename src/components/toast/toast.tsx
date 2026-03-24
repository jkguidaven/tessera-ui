import { Component, Prop, Event, State, h, Host, Watch, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

type TsToastVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
type TsToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

/**
 * @slot - Default slot for message content.
 * @slot action - Optional action button.
 *
 * @part base - The toast container.
 * @part icon - The variant icon wrapper.
 * @part message - The message wrapper.
 * @part action - The action slot wrapper.
 * @part close - The close button.
 */
@Component({
  tag: 'ts-toast',
  styleUrl: 'toast.css',
  shadow: true,
})
export class TsToast {
  private autoCloseTimer?: ReturnType<typeof setTimeout>;

  /** The toast's visual variant. */
  @Prop({ reflect: true }) variant: TsToastVariant = 'info';

  /** Auto-dismiss duration in ms. Set 0 to disable. */
  @Prop() duration = 5000;

  /** Whether the toast shows a close button. */
  @Prop() dismissible = true;

  /** Whether the toast is visible. */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Position of the toast on screen. */
  @Prop({ reflect: true }) position: TsToastPosition = 'top-right';

  /** Emitted when the toast is dismissed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  @State() isVisible = false;

  @Watch('open')
  handleOpenChange(newValue: boolean): void {
    if (newValue) {
      this.isVisible = true;
      this.startAutoClose();
    } else {
      this.isVisible = false;
      this.clearAutoClose();
    }
  }

  connectedCallback(): void {
    if (this.open) {
      this.isVisible = true;
      this.startAutoClose();
    }
  }

  disconnectedCallback(): void {
    this.clearAutoClose();
  }

  /** Programmatically close the toast. */
  @Method()
  async close(): Promise<void> {
    this.open = false;
    this.isVisible = false;
    this.clearAutoClose();
    this.tsClose.emit();
  }

  /** Programmatically show the toast. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  private startAutoClose(): void {
    this.clearAutoClose();
    if (this.duration > 0) {
      this.autoCloseTimer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private clearAutoClose(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }

  private handleClose = (): void => {
    this.close();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderIcon() {
    const icons: Record<string, string> = {
      info: '\u2139',
      success: '\u2713',
      warning: '\u26A0',
      danger: '\u2715',
      neutral: '\u2139',
    };
    return <span class="toast__icon-symbol" aria-hidden="true">{icons[this.variant] || '\u2139'}</span>;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.isVisible) return null;

    const ariaLive = this.variant === 'danger' ? 'assertive' : 'polite';

    return (
      <Host
        class={{
          'ts-toast': true,
          [`ts-toast--${this.variant}`]: true,
          [`ts-toast--${this.position}`]: true,
          'ts-toast--open': this.isVisible,
        }}
        role="status"
        aria-live={ariaLive}
      >
        <div class="toast__base" part="base">
          <div class="toast__icon" part="icon">
            {this.renderIcon()}
          </div>

          <div class="toast__message" part="message">
            <slot />
          </div>

          <div class="toast__action" part="action">
            <slot name="action" />
          </div>

          {this.dismissible && (
            <button
              class="toast__close"
              part="close"
              type="button"
              aria-label="Dismiss notification"
              onClick={this.handleClose}
            >
              \u2715
            </button>
          )}
        </div>
      </Host>
    );
  }
}
