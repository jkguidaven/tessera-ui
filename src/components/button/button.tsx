import { Component, Prop, Event, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsVariant, TsAppearance } from '../../types';

/**
 * @slot - Default slot for button label content.
 * @slot prefix - Content before the label (e.g., icon).
 * @slot suffix - Content after the label (e.g., icon).
 *
 * @part base - The native button element.
 * @part label - The label wrapper.
 * @part prefix - The prefix slot wrapper.
 * @part suffix - The suffix slot wrapper.
 * @part spinner - The loading spinner element.
 */
@Component({
  tag: 'ts-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class TsButton {
  @Element() hostEl!: HTMLElement;

  /** The button's visual variant. */
  @Prop({ reflect: true }) variant: TsVariant = 'primary';

  /** The button's visual weight / appearance. */
  @Prop({ reflect: true }) appearance: TsAppearance = 'solid';

  /** The button's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Renders the button in a disabled state. */
  @Prop({ reflect: true }) disabled = false;

  /** Renders a loading spinner and disables the button. */
  @Prop({ reflect: true }) loading = false;

  /** Makes the button take the full width of its container. */
  @Prop({ reflect: true }) block = false;

  /** The type attribute for the native button. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** An optional href — renders an anchor instead of a button. */
  @Prop() href?: string;

  /** Target attribute when href is set. */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top';

  /** Emitted when the button is clicked (not fired when disabled/loading). */
  @Event({ eventName: 'tsClick' }) tsClick!: EventEmitter<void>;

  /** Emitted when the button receives focus. */
  @Event({ eventName: 'tsFocus' }) tsFocus!: EventEmitter<void>;

  /** Emitted when the button loses focus. */
  @Event({ eventName: 'tsBlur' }) tsBlur!: EventEmitter<void>;

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.tsClick.emit();
  };

  private handleFocus = (): void => {
    this.tsFocus.emit();
  };

  private handleBlur = (): void => {
    this.tsBlur.emit();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderSpinner() {
    return (
      <span class="button__spinner" part="spinner" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
        </svg>
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const isLink = !!this.href;
    const Tag = isLink ? 'a' : 'button';

    const attrs = isLink
      ? {
          href: this.disabled ? undefined : this.href,
          target: this.target,
          rel: this.target === '_blank' ? 'noopener noreferrer' : undefined,
          role: 'button',
        }
      : {
          type: this.type,
          disabled: this.disabled || this.loading,
        };

    return (
      <Host
        class={{
          'ts-button': true,
          [`ts-button--${this.variant}`]: true,
          [`ts-button--${this.appearance}`]: true,
          [`ts-button--${this.size}`]: true,
          'ts-button--disabled': this.disabled,
          'ts-button--loading': this.loading,
          'ts-button--block': this.block,
        }}
      >
        <Tag
          {...attrs}
          class="button__native"
          part="base"
          aria-disabled={this.disabled || this.loading ? 'true' : undefined}
          aria-busy={this.loading ? 'true' : undefined}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {this.loading && this.renderSpinner()}

          <span class="button__prefix" part="prefix">
            <slot name="prefix" />
          </span>

          <span class="button__label" part="label">
            <slot />
          </span>

          <span class="button__suffix" part="suffix">
            <slot name="suffix" />
          </span>
        </Tag>
      </Host>
    );
  }
}
