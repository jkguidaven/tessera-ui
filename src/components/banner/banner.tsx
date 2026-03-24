import { Component, Prop, Event, State, h, Host, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsVariant } from '../../types';

/**
 * @slot - Default slot for message content.
 * @slot action - CTA button.
 *
 * @part base - The banner container.
 * @part icon - The icon wrapper.
 * @part message - The message wrapper.
 * @part action - The action slot wrapper.
 * @part close - The close/dismiss button.
 */
@Component({
  tag: 'ts-banner',
  styleUrl: 'banner.css',
  shadow: true,
})
export class TsBanner {
  /** The banner's semantic variant. */
  @Prop({ reflect: true }) variant: TsVariant = 'info';

  /** Whether the banner can be dismissed. */
  @Prop({ reflect: true }) dismissible = false;

  /** Optional Lucide icon name. */
  @Prop() icon?: string;

  /** Whether the banner sticks to the top of the viewport. */
  @Prop({ reflect: true }) sticky = false;

  /** Whether the banner is currently visible. */
  @State() isVisible = true;

  /** Emitted when the banner is dismissed. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  /** Programmatically close the banner. */
  @Method()
  async close(): Promise<void> {
    this.isVisible = false;
    this.tsClose.emit();
  }

  /** Programmatically show the banner. */
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
      info: '\u2139',
      success: '\u2713',
      warning: '\u26A0',
      danger: '\u2715',
      primary: '\u2139',
      secondary: '\u2139',
      neutral: '\u2139',
    };
    return <span aria-hidden="true">{icons[this.variant] || '\u2139'}</span>;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (!this.isVisible) return null;

    const role = this.variant === 'danger' ? 'alert' : 'banner';
    const ariaLive = this.variant === 'danger' ? 'assertive' : 'polite';

    return (
      <Host
        class={{
          'ts-banner': true,
          [`ts-banner--${this.variant}`]: true,
          'ts-banner--sticky': this.sticky,
        }}
        role={role}
        aria-live={ariaLive}
      >
        <div class="banner__base" part="base">
          <div class="banner__icon" part="icon">
            {this.icon ? <ts-icon name={this.icon} /> : this.renderDefaultIcon()}
          </div>

          <div class="banner__message" part="message">
            <slot />
          </div>

          <div class="banner__action" part="action">
            <slot name="action" />
          </div>

          {this.dismissible && (
            <button
              class="banner__close"
              part="close"
              type="button"
              aria-label="Dismiss banner"
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
