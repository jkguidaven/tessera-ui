import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  h,
  Host,
  Element,
  Method,
} from '@stencil/core';
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
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class TsInput {
  @Element() hostEl!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private inputId = generateId('ts-input');

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

  @Watch('value')
  handleValueChange(newValue: string, oldValue: string): void {
    if (newValue !== oldValue && this.inputEl) {
      this.inputEl.value = newValue;
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
    const previousValue = this.value;
    this.value = target.value;
    this.tsInput.emit({ value: this.value, previousValue });
  };

  private handleChange = (): void => {
    this.tsChange.emit({ value: this.value, previousValue: this.value });

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

  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;

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
      </Host>
    );
  }
}
