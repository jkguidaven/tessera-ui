import {
  Component,
  Prop,
  State,
  Event,
  Watch,
  Method,
  h,
  Host,
  Element,
} from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @part base - The outer wrapper containing buttons and input.
 * @part label - The label element.
 * @part input - The native input element.
 * @part decrement - The decrement button.
 * @part increment - The increment button.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-number-input',
  styleUrl: 'number-input.css',
  shadow: true,
})
export class TsNumberInput {
  @Element() hostEl!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private inputId = generateId('ts-number-input');

  /** The current numeric value. */
  @Prop({ mutable: true, reflect: true }) value = 0;

  /** Minimum allowed value. */
  @Prop() min?: number;

  /** Maximum allowed value. */
  @Prop() max?: number;

  /** Step increment/decrement amount. */
  @Prop() step = 1;

  /** Number of decimal places to display. */
  @Prop() precision?: number;

  /** The input's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Label text displayed above the input. */
  @Prop() label?: string;

  /** Help text displayed below the input. */
  @Prop() helpText?: string;

  /** Error message — renders the input in an error state. */
  @Prop() error?: string;

  /** Renders the input as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Renders the input as readonly. */
  @Prop({ reflect: true }) readonly = false;

  /** Makes the input required. */
  @Prop({ reflect: true }) required = false;

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Whether the input is currently focused. */
  @State() hasFocus = false;

  /** Emitted on each value change. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<{ value: number }>;

  /** Emitted on blur / commit. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: number }>;

  @Watch('value')
  handleValueChange(newValue: number): void {
    const clamped = this.clamp(newValue);
    if (clamped !== newValue) {
      this.value = clamped;
      return;
    }
    if (this.inputEl) {
      this.inputEl.value = this.formatValue(clamped);
    }
  }

  /** Increase value by step. */
  @Method()
  async increment(): Promise<void> {
    if (this.disabled || this.readonly) return;
    const newVal = this.clamp(this.value + this.step);
    if (newVal !== this.value) {
      this.value = newVal;
      this.tsInput.emit({ value: this.value });
    }
  }

  /** Decrease value by step. */
  @Method()
  async decrement(): Promise<void> {
    if (this.disabled || this.readonly) return;
    const newVal = this.clamp(this.value - this.step);
    if (newVal !== this.value) {
      this.value = newVal;
      this.tsInput.emit({ value: this.value });
    }
  }

  private clamp(val: number): number {
    let result = val;
    if (this.min !== undefined && result < this.min) result = this.min;
    if (this.max !== undefined && result > this.max) result = this.max;
    return result;
  }

  private formatValue(val: number): string {
    if (this.precision !== undefined) {
      return val.toFixed(this.precision);
    }
    return String(val);
  }

  private handleInputChange = (event: Event): void => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const parsed = parseFloat(target.value);
    if (!isNaN(parsed)) {
      const clamped = this.clamp(parsed);
      this.value = clamped;
      this.tsInput.emit({ value: this.value });
    }
  };

  private handleBlur = (): void => {
    this.hasFocus = false;
    // Parse and clamp on blur
    if (this.inputEl) {
      const parsed = parseFloat(this.inputEl.value);
      if (!isNaN(parsed)) {
        this.value = this.clamp(parsed);
      } else {
        this.value = this.clamp(0);
      }
      this.inputEl.value = this.formatValue(this.value);
    }
    this.tsChange.emit({ value: this.value });
  };

  private handleFocus = (): void => {
    this.hasFocus = true;
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    }
  };

  private handleDecrementClick = (event: MouseEvent): void => {
    event.preventDefault();
    this.decrement();
  };

  private handleIncrementClick = (event: MouseEvent): void => {
    event.preventDefault();
    this.increment();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;
    const isDecrementDisabled = this.disabled || this.readonly || (this.min !== undefined && this.value <= this.min);
    const isIncrementDisabled = this.disabled || this.readonly || (this.max !== undefined && this.value >= this.max);

    return (
      <Host
        class={{
          'ts-number-input': true,
          [`ts-number-input--${this.size}`]: true,
          'ts-number-input--focused': this.hasFocus,
          'ts-number-input--disabled': this.disabled,
          'ts-number-input--error': hasError,
          'ts-number-input--readonly': this.readonly,
        }}
      >
        {this.label && (
          <label class="number-input__label" part="label" id={labelId} htmlFor={this.inputId}>
            {this.label}
            {this.required && <span class="number-input__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div
          class={{
            'number-input__wrapper': true,
            'number-input__wrapper--focused': this.hasFocus,
            'number-input__wrapper--error': hasError,
            'number-input__wrapper--disabled': this.disabled,
          }}
          part="base"
        >
          <button
            class="number-input__button number-input__button--decrement"
            part="decrement"
            type="button"
            tabindex={-1}
            disabled={isDecrementDisabled}
            aria-label="Decrease value"
            onClick={this.handleDecrementClick}
          >
            &minus;
          </button>

          <input
            ref={(el) => (this.inputEl = el)}
            id={this.inputId}
            class="number-input__native"
            part="input"
            type="text"
            inputmode="decimal"
            value={this.formatValue(this.value)}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            name={this.name}
            role="spinbutton"
            aria-valuenow={this.value}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
            aria-labelledby={this.label ? labelId : undefined}
            aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
            aria-invalid={hasError ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            onInput={this.handleInputChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />

          <button
            class="number-input__button number-input__button--increment"
            part="increment"
            type="button"
            tabindex={-1}
            disabled={isIncrementDisabled}
            aria-label="Increase value"
            onClick={this.handleIncrementClick}
          >
            +
          </button>
        </div>

        {hasError && (
          <div class="number-input__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="number-input__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}
      </Host>
    );
  }
}
