import { Component, Prop, State, Event, Watch, h, Host, Element, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsChangeEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @part base - The outer wrapper.
 * @part label - The label element.
 * @part textarea - The native textarea element.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 * @part counter - The character counter element.
 */
@Component({
  tag: 'ts-textarea',
  styleUrl: 'textarea.css',
  shadow: true,
})
export class TsTextarea {
  @Element() hostEl!: HTMLElement;

  private textareaEl?: HTMLTextAreaElement;
  private hiddenInput?: HTMLInputElement;
  private inputId = generateId('ts-textarea');

  /** The textarea's value. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** Placeholder text. */
  @Prop() placeholder?: string;

  /** Renders the textarea as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Renders the textarea as readonly. */
  @Prop({ reflect: true }) readonly = false;

  /** The textarea size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Label text displayed above the textarea. */
  @Prop() label?: string;

  /** Help text displayed below the textarea. */
  @Prop() helpText?: string;

  /** Renders the textarea in an error state. */
  @Prop({ reflect: true }) error = false;

  /** Error message displayed below the textarea. */
  @Prop() errorMessage?: string;

  /** Makes the textarea required. */
  @Prop({ reflect: true }) required = false;

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Number of visible text rows. */
  @Prop() rows = 3;

  /** Resize behavior. */
  @Prop({ reflect: true }) resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  /** Maximum character length. */
  @Prop() maxlength?: number;

  /** Whether to show the character counter. Requires maxlength to be set. */
  @Prop({ reflect: true }) showCount = false;

  /** Whether the textarea auto-grows vertically as content is typed. */
  @Prop({ reflect: true }) autoGrow = false;

  /** Maximum height for auto-grow mode (e.g., "300px"). */
  @Prop() maxHeight?: string;

  /** Whether the textarea is currently focused. */
  @State() hasFocus = false;

  /** Emitted on every keystroke. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<TsChangeEventDetail<string>>;

  /** Emitted when the value changes (on blur / commit). */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsChangeEventDetail<string>>;

  /** Emitted when the textarea gains focus. */
  @Event({ eventName: 'tsFocus' }) tsFocus!: EventEmitter<void>;

  /** Emitted when the textarea loses focus. */
  @Event({ eventName: 'tsBlur' }) tsBlur!: EventEmitter<void>;

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
    if (newValue !== oldValue && this.textareaEl) {
      this.textareaEl.value = newValue;
      if (this.autoGrow) {
        this.adjustHeight();
      }
    }
    if (this.hiddenInput) {
      this.hiddenInput.value = newValue;
    }
  }

  componentDidLoad(): void {
    if (this.autoGrow) {
      this.adjustHeight();
    }
  }

  /** Programmatically focus the textarea. */
  @Method()
  async setFocus(): Promise<void> {
    this.textareaEl?.focus();
  }

  /** Programmatically select the textarea text. */
  @Method()
  async selectText(): Promise<void> {
    this.textareaEl?.select();
  }

  private adjustHeight(): void {
    const el = this.textareaEl;
    if (!el) return;
    el.style.height = 'auto';
    let newHeight = el.scrollHeight;
    if (this.maxHeight) {
      const max = parseInt(this.maxHeight, 10);
      if (!isNaN(max) && newHeight > max) {
        newHeight = max;
        el.style.overflowY = 'auto';
      } else {
        el.style.overflowY = 'hidden';
      }
    }
    el.style.height = `${newHeight}px`;
  }

  private handleInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    const previousValue = this.value;
    this.value = target.value;
    this.tsInput.emit({ value: this.value, previousValue });
    if (this.autoGrow) {
      this.adjustHeight();
    }
  };

  private handleChange = (): void => {
    this.tsChange.emit({ value: this.value, previousValue: this.value });
  };

  private handleFocus = (): void => {
    this.hasFocus = true;
    this.tsFocus.emit();
  };

  private handleBlur = (): void => {
    this.hasFocus = false;
    this.tsBlur.emit();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = this.error && !!this.errorMessage;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;
    const showCounter = this.showCount && this.maxlength !== undefined && this.maxlength > 0;

    return (
      <Host
        class={{
          'ts-textarea': true,
          [`ts-textarea--${this.size}`]: true,
          'ts-textarea--focused': this.hasFocus,
          'ts-textarea--disabled': this.disabled,
          'ts-textarea--error': this.error,
          'ts-textarea--auto-grow': this.autoGrow,
        }}
      >
        {this.label && (
          <label class="textarea__label" part="label" id={labelId} htmlFor={this.inputId}>
            {this.label}
            {this.required && <span class="textarea__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div
          class={{
            'textarea__wrapper': true,
            'textarea__wrapper--focused': this.hasFocus,
            'textarea__wrapper--error': this.error,
            'textarea__wrapper--disabled': this.disabled,
          }}
          part="base"
        >
          <textarea
            ref={(el) => (this.textareaEl = el)}
            id={this.inputId}
            class="textarea__native"
            part="textarea"
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            maxlength={this.maxlength}
            name={this.name}
            rows={this.rows}
            aria-labelledby={this.label ? labelId : undefined}
            aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
            aria-invalid={this.error ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>

        {hasError && (
          <div class="textarea__error" part="error-text" id={errorId} role="alert">
            {this.errorMessage}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="textarea__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}

        {showCounter && (
          <div
            class={{
              'textarea__counter': true,
              'textarea__counter--warning': this.maxlength !== undefined && this.maxlength > 0 && this.value.length / this.maxlength > 0.9 && this.value.length / this.maxlength < 1,
              'textarea__counter--danger': this.maxlength !== undefined && this.maxlength > 0 && this.value.length / this.maxlength >= 1,
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
