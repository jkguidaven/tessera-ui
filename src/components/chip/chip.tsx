import { Component, Prop, Event, h, Host } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsVariant, TsSize } from '../../types';

/**
 * @slot - Default slot for chip label.
 * @slot prefix - Icon or content before the label.
 *
 * @part base - The chip container.
 * @part label - The label wrapper.
 * @part prefix - The prefix slot wrapper.
 * @part remove - The remove button.
 */
@Component({
  tag: 'ts-chip',
  styleUrl: 'chip.css',
  shadow: true,
})
export class TsChip {
  /** The chip's semantic variant. */
  @Prop({ reflect: true }) variant: TsVariant = 'neutral';

  /** The chip's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Whether the chip shows a remove button. */
  @Prop({ reflect: true }) removable = false;

  /** Whether the chip is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether the chip is selected. */
  @Prop({ reflect: true }) selected = false;

  /** Whether to render as outline style. */
  @Prop({ reflect: true }) outline = false;

  /** Emitted when the remove button is clicked. */
  @Event({ eventName: 'tsRemove' }) tsRemove!: EventEmitter<void>;

  /** Emitted when the chip body is clicked. */
  @Event({ eventName: 'tsClick' }) tsClick!: EventEmitter<void>;

  private handleClick = (): void => {
    if (this.disabled) return;
    this.tsClick.emit();
  };

  private handleRemove = (event: MouseEvent): void => {
    event.stopPropagation();
    if (this.disabled) return;
    this.tsRemove.emit();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.tsClick.emit();
    }
  };

  private handleRemoveKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.tsRemove.emit();
    }
  };

  render() {
    const isInteractive = !this.disabled;

    return (
      <Host
        class={{
          'ts-chip': true,
          [`ts-chip--${this.variant}`]: true,
          [`ts-chip--${this.size}`]: true,
          'ts-chip--selected': this.selected,
          'ts-chip--outline': this.outline,
          'ts-chip--disabled': this.disabled,
          'ts-chip--removable': this.removable,
        }}
      >
        <span
          class="chip__base"
          part="base"
          role="button"
          tabindex={isInteractive ? '0' : undefined}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-pressed={this.selected ? 'true' : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <span class="chip__prefix" part="prefix">
            <slot name="prefix" />
          </span>

          <span class="chip__label" part="label">
            <slot />
          </span>

          {this.removable && (
            <button
              class="chip__remove"
              part="remove"
              type="button"
              aria-label="Remove"
              disabled={this.disabled}
              onClick={this.handleRemove}
              onKeyDown={this.handleRemoveKeydown}
            >
              \u2715
            </button>
          )}
        </span>
      </Host>
    );
  }
}
