import { Component, Prop, State, Event, Watch, h, Host, Element, Listen } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsSelectChangeEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

/**
 * @slot - Default slot for `<option>` elements.
 *
 * @part base - The outer wrapper.
 * @part label - The label element.
 * @part trigger - The select trigger button.
 * @part dropdown - The dropdown panel.
 * @part option - An option in the dropdown list.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-select',
  styleUrl: 'select.css',
  shadow: true,
})
export class TsSelect {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-select');
  private triggerEl?: HTMLElement;

  /** The current value. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** Placeholder text when no value is selected. */
  @Prop() placeholder?: string;

  /** Renders the select as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** The select size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Label text displayed above the select. */
  @Prop() label?: string;

  /** Help text displayed below the select. */
  @Prop() helpText?: string;

  /** Renders the select in an error state. */
  @Prop({ reflect: true }) error = false;

  /** Error message displayed below the select. */
  @Prop() errorMessage?: string;

  /** Makes the select required. */
  @Prop({ reflect: true }) required = false;

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Allow multiple selections. */
  @Prop({ reflect: true }) multiple = false;

  /** Whether the dropdown is open. */
  @State() isOpen = false;

  /** The index of the currently focused option. */
  @State() focusedIndex = -1;

  /** Parsed options from slotted <option> elements. */
  @State() options: SelectOption[] = [];

  /** Emitted when the value changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsSelectChangeEventDetail>;

  /** Emitted when the select gains focus. */
  @Event({ eventName: 'tsFocus' }) tsFocus!: EventEmitter<void>;

  /** Emitted when the select loses focus. */
  @Event({ eventName: 'tsBlur' }) tsBlur!: EventEmitter<void>;

  @Watch('value')
  handleValueChange(): void {
    // Value was changed externally; ensure UI is in sync
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.hostEl.contains(event.target as Node)) {
      this.close();
    }
  }

  componentWillLoad(): void {
    this.parseOptions();
  }

  componentDidLoad(): void {
    // Observe slot changes to re-parse options
    const slot = this.hostEl.shadowRoot?.querySelector('.select__hidden-slot slot');
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

  private getSelectedValues(): string[] {
    if (!this.value) return [];
    return this.value.split(',').filter(Boolean);
  }

  private isOptionSelected(option: SelectOption): boolean {
    if (this.multiple) {
      return this.getSelectedValues().includes(option.value);
    }
    return option.value === this.value;
  }

  private open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    if (this.multiple) {
      const selectedValues = this.getSelectedValues();
      this.focusedIndex = selectedValues.length > 0
        ? this.options.findIndex((o) => o.value === selectedValues[0])
        : 0;
    } else {
      this.focusedIndex = this.options.findIndex((o) => o.value === this.value);
    }
    if (this.focusedIndex < 0) this.focusedIndex = 0;
  }

  private close(): void {
    this.isOpen = false;
    this.focusedIndex = -1;
    this.triggerEl?.focus();
  }

  private selectOption(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      const selected = this.getSelectedValues();
      const index = selected.indexOf(option.value);
      if (index >= 0) {
        selected.splice(index, 1);
      } else {
        selected.push(option.value);
      }
      this.value = selected.join(',');
      this.tsChange.emit({ value: this.value });
      // Don't close dropdown in multiple mode
    } else {
      this.value = option.value;
      this.tsChange.emit({ value: this.value });
      this.close();
    }
  }

  private handleTriggerClick = (): void => {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  private handleTriggerKeydown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else if (event.key === 'Enter' || event.key === ' ') {
          if (this.focusedIndex >= 0 && this.options[this.focusedIndex]) {
            this.selectOption(this.options[this.focusedIndex]);
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  };

  private handleDropdownKeydown = (event: KeyboardEvent): void => {
    const enabledOptions = this.options.filter((o) => !o.disabled);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.focusedIndex >= 0 && this.options[this.focusedIndex] && !this.options[this.focusedIndex].disabled) {
          this.selectOption(this.options[this.focusedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Home':
        event.preventDefault();
        this.focusedIndex = enabledOptions.length > 0 ? this.options.indexOf(enabledOptions[0]) : 0;
        break;
      case 'End':
        event.preventDefault();
        this.focusedIndex = enabledOptions.length > 0 ? this.options.indexOf(enabledOptions[enabledOptions.length - 1]) : this.options.length - 1;
        break;
    }
  };

  private moveFocus(direction: number): void {
    let next = this.focusedIndex + direction;
    while (next >= 0 && next < this.options.length && this.options[next].disabled) {
      next += direction;
    }
    if (next >= 0 && next < this.options.length) {
      this.focusedIndex = next;
    }
  }

  private handleFocus = (): void => {
    this.tsFocus.emit();
  };

  private handleBlur = (): void => {
    this.tsBlur.emit();
  };

  private getDisplayText(): string {
    if (this.multiple) {
      const selectedValues = this.getSelectedValues();
      if (selectedValues.length === 0) return '';
      if (selectedValues.length === 1) {
        const match = this.options.find((o) => o.value === selectedValues[0]);
        return match?.label ?? selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    }
    const selected = this.options.find((o) => o.value === this.value);
    return selected?.label ?? '';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = this.error && !!this.errorMessage;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;
    const listboxId = `${this.inputId}-listbox`;
    const displayText = this.getDisplayText();

    return (
      <Host
        class={{
          'ts-select': true,
          [`ts-select--${this.size}`]: true,
          'ts-select--open': this.isOpen,
          'ts-select--disabled': this.disabled,
          'ts-select--error': this.error,
        }}
      >
        {this.label && (
          <label class="select__label" part="label" id={labelId}>
            {this.label}
            {this.required && <span class="select__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div class="select__container">
          <button
            ref={(el) => (this.triggerEl = el)}
            class={{
              'select__trigger': true,
              'select__trigger--open': this.isOpen,
              'select__trigger--error': this.error,
              'select__trigger--disabled': this.disabled,
            }}
            part="trigger"
            type="button"
            role="combobox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-labelledby={this.label ? labelId : undefined}
            aria-invalid={this.error ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
            disabled={this.disabled}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeydown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <span class={{ 'select__display': true, 'select__display--placeholder': !displayText }}>
              {displayText || this.placeholder || '\u00A0'}
            </span>
            <svg class="select__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          {this.isOpen && (
            <div
              class="select__dropdown"
              part="dropdown"
              role="listbox"
              id={listboxId}
              aria-labelledby={this.label ? labelId : undefined}
              aria-multiselectable={this.multiple ? 'true' : undefined}
              onKeyDown={this.handleDropdownKeydown}
            >
              {this.options.map((option, index) => {
                const selected = this.isOptionSelected(option);
                return (
                  <div
                    class={{
                      'select__option': true,
                      'select__option--selected': selected,
                      'select__option--focused': index === this.focusedIndex,
                      'select__option--disabled': option.disabled,
                    }}
                    part="option"
                    role="option"
                    aria-selected={selected ? 'true' : 'false'}
                    aria-disabled={option.disabled ? 'true' : undefined}
                    onClick={() => this.selectOption(option)}
                  >
                    {this.multiple && (
                      <span class="select__check" aria-hidden="true">
                        {selected ? (
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                          </svg>
                        ) : null}
                      </span>
                    )}
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hidden slot to capture <option> elements */}
        <div class="select__hidden-slot">
          <slot />
        </div>

        {hasError && (
          <div class="select__error" part="error-text" id={errorId} role="alert">
            {this.errorMessage}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="select__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}
      </Host>
    );
  }
}
