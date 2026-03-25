import { Component, Prop, State, Event, Watch, h, Host, Element, Listen } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';
import { generateId } from '../../utils/aria';

interface ComboboxOption {
  value: string;
  label: string;
  disabled: boolean;
}

/**
 * @slot - Default slot for `<option>` elements.
 *
 * @part base - The outer wrapper.
 * @part label - The label element.
 * @part input-wrapper - The input wrapper containing the text input and chevron.
 * @part input - The text input element.
 * @part dropdown - The dropdown panel.
 * @part option - An option in the dropdown list.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-combobox',
  styleUrl: 'combobox.css',
  shadow: true,
})
export class TsCombobox {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-combobox');
  private inputEl?: HTMLInputElement;

  /** The current selected value. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** Label text displayed above the combobox. */
  @Prop() label?: string;

  /** Placeholder text for the input. */
  @Prop() placeholder?: string;

  /** Renders the combobox as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** The combobox size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Error message displayed below the combobox. */
  @Prop() error?: string;

  /** Help text displayed below the combobox. */
  @Prop() helpText?: string;

  /** Makes the combobox required. */
  @Prop({ reflect: true }) required = false;

  /** The current text in the input. */
  @State() inputValue = '';

  /** Whether the dropdown is open. */
  @State() isOpen = false;

  /** The index of the currently focused option in the filtered list. */
  @State() focusedIndex = -1;

  /** Parsed options from slotted <option> elements. */
  @State() options: ComboboxOption[] = [];

  /** Emitted when a value is selected. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

  /** Emitted when the input text changes. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<{ inputValue: string }>;

  @Watch('value')
  handleValueChange(): void {
    const match = this.options.find((o) => o.value === this.value);
    if (match) {
      this.inputValue = match.label;
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.hostEl.contains(event.target as Node)) {
      this.close();
    }
  }

  componentWillLoad(): void {
    this.parseOptions();
    if (this.value) {
      const match = this.options.find((o) => o.value === this.value);
      if (match) {
        this.inputValue = match.label;
      }
    }
  }

  componentDidLoad(): void {
    const slot = this.hostEl.shadowRoot?.querySelector('.combobox__hidden-slot slot');
    slot?.addEventListener('slotchange', () => this.parseOptions());
  }

  private parseOptions(): void {
    const slottedOptions = this.hostEl.querySelectorAll('option');
    this.options = Array.from(slottedOptions).map((opt) => ({
      value: opt.value,
      label: opt.textContent?.trim() ?? opt.value,
      disabled: opt.disabled,
    }));
  }

  private getFilteredOptions(): ComboboxOption[] {
    if (!this.inputValue) return this.options;
    const query = this.inputValue.toLowerCase();
    return this.options.filter((o) => o.label.toLowerCase().includes(query));
  }

  private open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    this.focusedIndex = -1;
  }

  private close(): void {
    this.isOpen = false;
    this.focusedIndex = -1;
  }

  private selectOption(option: ComboboxOption): void {
    if (option.disabled) return;
    this.value = option.value;
    this.inputValue = option.label;
    this.tsChange.emit({ value: this.value });
    this.close();
    this.inputEl?.focus();
  }

  private handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.tsInput.emit({ inputValue: this.inputValue });
    if (!this.isOpen) {
      this.open();
    }
    this.focusedIndex = -1;
  };

  private handleInputClick = (): void => {
    if (!this.isOpen) {
      this.open();
    }
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    const filtered = this.getFilteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.moveFocus(1, filtered);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.moveFocus(-1, filtered);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (this.isOpen && this.focusedIndex >= 0 && filtered[this.focusedIndex]) {
          this.selectOption(filtered[this.focusedIndex]);
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          const firstEnabled = filtered.findIndex((o) => !o.disabled);
          this.focusedIndex = firstEnabled >= 0 ? firstEnabled : 0;
        }
        break;
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          let lastEnabled = -1;
          for (let i = filtered.length - 1; i >= 0; i--) {
            if (!filtered[i].disabled) {
              lastEnabled = i;
              break;
            }
          }
          this.focusedIndex = lastEnabled >= 0 ? lastEnabled : filtered.length - 1;
        }
        break;
    }
  };

  private moveFocus(direction: number, filtered: ComboboxOption[]): void {
    let next = this.focusedIndex + direction;
    while (next >= 0 && next < filtered.length && filtered[next].disabled) {
      next += direction;
    }
    if (next >= 0 && next < filtered.length) {
      this.focusedIndex = next;
    }
  }

  private handleChevronClick = (): void => {
    if (this.disabled) return;
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
      this.inputEl?.focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;
    const listboxId = `${this.inputId}-listbox`;
    const filtered = this.getFilteredOptions();
    const activeDescendant =
      this.focusedIndex >= 0 ? `${this.inputId}-option-${this.focusedIndex}` : undefined;

    return (
      <Host
        class={{
          'ts-combobox': true,
          [`ts-combobox--${this.size}`]: true,
          'ts-combobox--open': this.isOpen,
          'ts-combobox--disabled': this.disabled,
          'ts-combobox--error': hasError,
        }}
      >
        {this.label && (
          <label class="combobox__label" part="label" id={labelId}>
            {this.label}
            {this.required && <span class="combobox__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div class="combobox__container">
          <div
            class={{
              'combobox__input-wrapper': true,
              'combobox__input-wrapper--open': this.isOpen,
              'combobox__input-wrapper--error': hasError,
              'combobox__input-wrapper--disabled': this.disabled,
            }}
            part="input-wrapper"
          >
            <input
              ref={(el) => (this.inputEl = el as HTMLInputElement | undefined)}
              class="combobox__input"
              part="input"
              type="text"
              role="combobox"
              value={this.inputValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              aria-expanded={this.isOpen ? 'true' : 'false'}
              aria-haspopup="listbox"
              aria-controls={listboxId}
              aria-activedescendant={activeDescendant}
              aria-labelledby={this.label ? labelId : undefined}
              aria-invalid={hasError ? 'true' : undefined}
              aria-required={this.required ? 'true' : undefined}
              aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
              aria-autocomplete="list"
              autocomplete="off"
              onInput={this.handleInput}
              onClick={this.handleInputClick}
              onKeyDown={this.handleKeydown}
            />
            <button
              class="combobox__chevron-btn"
              type="button"
              tabindex={-1}
              aria-hidden="true"
              disabled={this.disabled}
              onClick={this.handleChevronClick}
            >
              <svg class="combobox__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          {this.isOpen && filtered.length > 0 && (
            <div
              class="combobox__dropdown"
              part="dropdown"
              role="listbox"
              id={listboxId}
              aria-labelledby={this.label ? labelId : undefined}
            >
              {filtered.map((option, index) => {
                const isSelected = option.value === this.value;
                return (
                  <div
                    class={{
                      'combobox__option': true,
                      'combobox__option--selected': isSelected,
                      'combobox__option--focused': index === this.focusedIndex,
                      'combobox__option--disabled': option.disabled,
                    }}
                    part="option"
                    role="option"
                    id={`${this.inputId}-option-${index}`}
                    aria-selected={isSelected ? 'true' : 'false'}
                    aria-disabled={option.disabled ? 'true' : undefined}
                    onClick={() => this.selectOption(option)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hidden slot to capture <option> elements */}
        <div class="combobox__hidden-slot">
          <slot />
        </div>

        {hasError && (
          <div class="combobox__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="combobox__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}
      </Host>
    );
  }
}
