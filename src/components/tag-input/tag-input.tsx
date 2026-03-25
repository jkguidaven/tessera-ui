import { Component, Prop, State, Event, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @part base - The outer wrapper containing tags and input.
 * @part label - The label element.
 * @part input - The native text input.
 * @part tag - A tag chip element.
 * @part tag-remove - The remove button inside a tag.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-tag-input',
  styleUrl: 'tag-input.css',
  shadow: true,
})
export class TsTagInput {
  @Element() hostEl!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private inputId = generateId('ts-tag-input');

  /** The current list of tags. */
  @Prop({ mutable: true }) value: string[] = [];

  /** Label text displayed above the input. */
  @Prop() label!: string;

  /** Placeholder text for the input. */
  @Prop() placeholder?: string;

  /** Maximum number of tags allowed. */
  @Prop() maxTags?: number;

  /** Renders the input as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** The input's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Error message — renders the input in an error state. */
  @Prop() error?: string;

  /** Help text displayed below the input. */
  @Prop() helpText?: string;

  /** Whether to allow duplicate tags. */
  @Prop() allowDuplicates = false;

  /** The current text in the input field. */
  @State() inputValue = '';

  /** Whether the input is currently focused. */
  @State() hasFocus = false;

  /** Emitted when the tag list changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string[] }>;

  /** Emitted on each keystroke in the input. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<{ inputValue: string }>;

  private addTag(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (!this.allowDuplicates && this.value.includes(trimmed)) return;
    if (this.maxTags !== undefined && this.value.length >= this.maxTags) return;

    this.value = [...this.value, trimmed];
    this.inputValue = '';
    this.tsChange.emit({ value: this.value });
  }

  private removeTag(index: number): void {
    this.value = this.value.filter((_, i) => i !== index);
    this.tsChange.emit({ value: this.value });
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag(this.inputValue);
    } else if (event.key === 'Backspace' && this.inputValue === '' && this.value.length > 0) {
      this.removeTag(this.value.length - 1);
    }
  };

  private handleInput = (event: Event): void => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.tsInput.emit({ inputValue: this.inputValue });
  };

  private handleFocus = (): void => {
    this.hasFocus = true;
  };

  private handleBlur = (): void => {
    this.hasFocus = false;
  };

  private handleRemoveClick = (index: number): void => {
    if (this.disabled) return;
    this.removeTag(index);
    this.inputEl?.focus();
  };

  private handleWrapperClick = (): void => {
    this.inputEl?.focus();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;

    return (
      <Host
        class={{
          'ts-tag-input': true,
          [`ts-tag-input--${this.size}`]: true,
          'ts-tag-input--focused': this.hasFocus,
          'ts-tag-input--disabled': this.disabled,
          'ts-tag-input--error': hasError,
        }}
      >
        {this.label && (
          <label class="tag-input__label" part="label" id={labelId} htmlFor={this.inputId}>
            {this.label}
          </label>
        )}

        <div
          class={{
            'tag-input__wrapper': true,
            'tag-input__wrapper--focused': this.hasFocus,
            'tag-input__wrapper--error': hasError,
            'tag-input__wrapper--disabled': this.disabled,
          }}
          part="base"
          onClick={this.handleWrapperClick}
        >
          {this.value.map((tag, index) => (
            <span class="tag-input__tag" part="tag" key={`tag-${index}`}>
              <span class="tag-input__tag-text">{tag}</span>
              {!this.disabled && (
                <button
                  class="tag-input__tag-remove"
                  part="tag-remove"
                  type="button"
                  tabindex={-1}
                  aria-label={`Remove ${tag}`}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    this.handleRemoveClick(index);
                  }}
                >
                  &times;
                </button>
              )}
            </span>
          ))}

          <input
            ref={(el) => (this.inputEl = el)}
            id={this.inputId}
            class="tag-input__native"
            part="input"
            type="text"
            value={this.inputValue}
            placeholder={this.value.length === 0 ? this.placeholder : undefined}
            disabled={this.disabled}
            aria-labelledby={this.label ? labelId : undefined}
            aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
            aria-invalid={hasError ? 'true' : undefined}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        </div>

        {hasError && (
          <div class="tag-input__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="tag-input__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}
      </Host>
    );
  }
}
