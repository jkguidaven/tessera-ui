import { Component, Prop, Event, h, Host, Element, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsCheckboxChangeEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Default slot for the radio label.
 *
 * @part base - The radio container.
 * @part control - The visual radio circle.
 * @part label - The label wrapper.
 */
@Component({
  tag: 'ts-radio',
  styleUrl: 'radio.css',
  shadow: true,
})
export class TsRadio {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-radio');

  /** Whether the radio is checked. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Renders the radio as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** The value associated with this radio. */
  @Prop() value = '';

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Label text. If omitted, use the default slot. */
  @Prop() label?: string;

  /** The radio size. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Emitted when the radio is selected. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsCheckboxChangeEventDetail>;

  /** Programmatically select the radio. */
  @Method()
  async select(): Promise<void> {
    if (!this.disabled && !this.checked) {
      this.checked = true;
      this.tsChange.emit({ checked: this.checked, value: this.value });
    }
  }

  private handleClick = (): void => {
    this.select();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
      this.select();
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-radio': true,
          [`ts-radio--${this.size}`]: true,
          'ts-radio--checked': this.checked,
          'ts-radio--disabled': this.disabled,
        }}
      >
        <div
          class="radio__base"
          part="base"
          role="radio"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : undefined}
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <div class="radio__control" part="control">
            <div class="radio__dot" />
          </div>

          <label class="radio__label" part="label" id={`${this.inputId}-label`}>
            {this.label ? this.label : <slot />}
          </label>
        </div>
      </Host>
    );
  }
}
