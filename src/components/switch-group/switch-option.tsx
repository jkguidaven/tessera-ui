import { Component, Prop, Event, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for label text.
 *
 * @part base - The option container.
 * @part icon - The icon wrapper.
 */
@Component({
  tag: 'ts-switch-option',
  styleUrl: 'switch-option.css',
  shadow: true,
})
export class TsSwitchOption {
  @Element() hostEl!: HTMLElement;

  /** Unique identifier for this option. */
  @Prop({ reflect: true }) value?: string;

  /** Disables this option. */
  @Prop({ reflect: true }) disabled = false;

  /** Optional icon name. */
  @Prop() icon?: string;

  /** Whether this option is the active selection (set by parent). */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** @internal Emitted when this option is clicked. */
  @Event({ eventName: 'tsOptionSelect', bubbles: true }) tsOptionSelect!: EventEmitter<{ value: string }>;

  private handleClick = (): void => {
    if (this.disabled) return;
    this.tsOptionSelect.emit({ value: this.value || '' });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-switch-option': true,
          'ts-switch-option--active': this.active,
          'ts-switch-option--disabled': this.disabled,
        }}
        role="radio"
        tabindex={this.active ? 0 : -1}
        aria-checked={String(this.active)}
        aria-disabled={this.disabled ? 'true' : undefined}
        onClick={this.handleClick}
      >
        <div class="switch-option__base" part="base">
          {this.icon && (
            <span class="switch-option__icon" part="icon" aria-hidden="true">
              <ts-icon name={this.icon} size="sm" />
            </span>
          )}
          <span class="switch-option__label">
            <slot />
          </span>
        </div>
      </Host>
    );
  }
}
