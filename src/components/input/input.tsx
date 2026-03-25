import {
  Component,
  Prop,
  State,
  Event,
  Watch,
  h,
  Host,
  Element,
  Method,
} from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsChangeEventDetail, TsValidationEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot prefix - Content before the input (e.g., icon or currency symbol).
 * @slot suffix - Content after the input (e.g., icon or clear button).
 * @slot help-text - Help text displayed below the input.
 *
 * @part base - The outer wrapper.
 * @part label - The label element.
 * @part input - The native input element.
 * @part prefix - The prefix slot wrapper.
 * @part suffix - The suffix slot wrapper.
 * @part clear-button - The clear button element.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 * @part counter - The character counter element.
 */
@Component({
  tag: 'ts-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class TsInput {
  @Element() hostEl!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private hiddenInput?: HTMLInputElement;
  private inputId = generateId('ts-input');
  private previousValue = '';

  /** The input's value. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** The input type. */
  @Prop({ reflect: true }) type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search' = 'text';

  /** The input's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Label text displayed above the input. */
  @Prop() label?: string;

  /** Placeholder text. */
  @Prop() placeholder?: string;

  /** Help text displayed below the input. */
  @Prop() helpText?: string;

  /** Renders the input in an error state with an error message. */
  @Prop() error?: string;

  /** Makes the input required. */
  @Prop({ reflect: true }) required = false;

  /** Renders the input as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Renders the input as readonly. */
  @Prop({ reflect: true }) readonly = false;

  /** Maximum character length. */
  @Prop() maxlength?: number;

  /** Minimum character length. */
  @Prop() minlength?: number;

  /** Pattern for validation (regex string). */
  @Prop() pattern?: string;

  /** Shows a clear button when the input has a value. */
  @Prop({ reflect: true }) clearable = false;

  /** Shows a character counter when maxlength is set. */
  @Prop({ reflect: true }) showCount = false;

  /** Autocomplete attribute. */
  @Prop() autocomplete?: string;

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Whether the input is currently focused. */
  @State() hasFocus = false;

  /** Emitted when the value changes (on input). */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<TsChangeEventDetail<string>>;

  /** Emitted when the value changes (on blur / commit). */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsChangeEventDetail<string>>;

  /** Emitted when the input gains focus. */
  @Event({ eventName: 'tsFocus' }) tsFocus!: EventEmitter<void>;

  /** Emitted when the input loses focus. */
  @Event({ eventName: 'tsBlur' }) tsBlur!: EventEmitter<void>;

  /** Emitted on validation. */
  @Event({ eventName: 'tsValidate' }) tsValidate!: EventEmitter<TsValidationEventDetail>;

  connectedCallback(): void {
    if (this.name) {
      this.hiddenInput = document.createElement('input');
      this.hiddenInput.type = 'hidden';
      this.hiddenInput.name = this.name;
      this.hiddenInput.value = this.value;
      this.hostEl.appendChild(this.hiddenInput);
    }
  }

  disconnectedCallback(): void {
    this.hiddenInput?.remove();
  }

  @Watch('value')
  handleValueChange(newValue: string, oldValue: string): void {
    if (newValue !== oldValue && this.inputEl) {
      this.inputEl.value = newValue;
    }
    if (this.hiddenInput) {
      this.hiddenInput.value = newValue;
    }
  }

  /** Programmatically focus the input. */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl?.focus();
  }

  /** Programmatically select the input text. */
  @Method()
  async selectText(): Promise<void> {
    this.inputEl?.select();
  }

  private handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.previousValue = this.value;
    this.value = target.value;
    this.tsInput.emit({ value: this.value, previousValue: this.previousValue });
  };

  private handleChange = (): void => {
    this.tsChange.emit({ value: this.value, previousValue: this.previousValue });

    // Run native validation
    if (this.inputEl) {
      const valid = this.inputEl.checkValidity();
      this.tsValidate.emit({
        valid,
        message: this.inputEl.validationMessage,
      });
    }
  };

  private handleFocus = (): void => {
    this.hasFocus = true;
    this.tsFocus.emit();
  };

  private handleBlur = (): void => {
    this.hasFocus = false;
    this.tsBlur.emit();
  };

  private handleClear = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    const previousValue = this.value;
    this.value = '';
    this.tsInput.emit({ value: '', previousValue });
    this.tsChange.emit({ value: '', previousValue });
    this.inputEl?.focus();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;
    const showClear = this.clearable && this.value.length > 0 && !this.disabled && !this.readonly;
    const showCounter = this.showCount && this.maxlength !== undefined && this.maxlength > 0;

    return (
      <Host
        class={{
          'ts-input': true,
          [`ts-input--${this.size}`]: true,
          'ts-input--focused': this.hasFocus,
          'ts-input--disabled': this.disabled,
          'ts-input--error': hasError,
        }}
      >
        {this.label && (
          <label class="input__label" part="label" id={labelId} htmlFor={this.inputId}>
            {this.label}
            {this.required && <span class="input__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div
          class={{
            'input__wrapper': true,
            'input__wrapper--focused': this.hasFocus,
            'input__wrapper--error': hasError,
            'input__wrapper--disabled': this.disabled,
          }}
          part="base"
        >
          <span class="input__prefix" part="prefix">
            <slot name="prefix" />
          </span>

          <input
            ref={(el) => (this.inputEl = el)}
            id={this.inputId}
            class="input__native"
            part="input"
            type={this.type}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            maxlength={this.maxlength}
            minlength={this.minlength}
            pattern={this.pattern}
            autoComplete={this.autocomplete}
            name={this.name}
            aria-labelledby={this.label ? labelId : undefined}
            aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
            aria-invalid={hasError ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {showClear && (
            <button
              class="input__clear-button"
              part="clear-button"
              type="button"
              aria-label="Clear input"
              tabindex={-1}
              onClick={this.handleClear}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          )}

          <span class="input__suffix" part="suffix">
            <slot name="suffix" />
          </span>
        </div>

        {hasError && (
          <div class="input__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="input__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}

        {showCounter && (
          <div
            class={{
              'input__counter': true,
              'input__counter--warning': this.maxlength !== undefined && this.maxlength > 0 && this.value.length / this.maxlength > 0.9 && this.value.length / this.maxlength < 1,
              'input__counter--danger': this.maxlength !== undefined && this.maxlength > 0 && this.value.length / this.maxlength >= 1,
            }}
            part="counter"
            aria-live="polite"
          >
            {this.value.length}/{this.maxlength}
          </div>
        )}
      </Host>
    );
  }
}
