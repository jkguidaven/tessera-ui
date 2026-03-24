import { Component, Prop, Event, State, h, Host, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsVariant } from '../../types';

/**
 * @slot - Default slot for alert message content.
 * @slot icon - Custom icon to override the default variant icon.
 * @slot action - Action buttons or links displayed at the end.
 *
 * @part base - The alert container.
 * @part icon - The icon wrapper.
 * @part message - The message wrapper.
 * @part action - The action slot wrapper.
 * @part close - The close button.
 */
@Component({
  tag: 'ts-alert',
  styleUrl: 'alert.css',
  shadow: true,
})
export class TsAlert {
  /** The alert's semantic variant. */
  @Prop({ reflect: true }) variant: TsVariant = 'info';

  /** Whether the alert can be dismissed. */
  @Prop() closable = false;

  /** Whether the alert is currently visible. */
  @State() isVisible = true;

  /** Emitted when the alert is closed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Programmatically close the alert. */
  @Method()
  async close(): Promise<void> {
    this.isVisible = false;
    this.tsClose.emit();
  }

  /** Programmatically show the alert. */
  @Method()
  async show(): Promise<void> {
    this.isVisible = true;
  }

  private handleClose = (): void => {
    this.close();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderDefaultIcon() {
    const icons: Record<string, string> = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      danger: '✕',
      primary: 'ℹ',
      secondary: 'ℹ',
      neutral: 'ℹ',
    };
    return <span aria-hidden="true">{icons[this.variant] || 'ℹ'}</span>;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.isVisible) return null;

    return (
      <Host
        class={{
          'ts-alert': true,
          [`ts-alert--${this.variant}`]: true,
        }}
        role="alert"
      >
        <div class="alert__base" part="base">
          <div class="alert__icon" part="icon">
            <slot name="icon">{this.renderDefaultIcon()}</slot>
          </div>

          <div class="alert__message" part="message">
            <slot />
          </div>

          <div class="alert__action" part="action">
            <slot name="action" />
          </div>

          {this.closable && (
            <button
              class="alert__close"
              part="close"
              type="button"
              aria-label="Close alert"
              onClick={this.handleClose}
            >
              ✕
            </button>
          )}
        </div>
      </Host>
    );
  }
}
