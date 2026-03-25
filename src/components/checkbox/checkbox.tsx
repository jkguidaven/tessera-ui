import { Component, Prop, Event, Watch, h, Host, Element, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsCheckboxChangeEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Default slot for the checkbox label.
 *
 * @part base - The checkbox container.
 * @part control - The visual checkbox box.
 * @part label - The label wrapper.
 */
@Component({
  tag: 'ts-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true,
})
export class TsCheckbox {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-checkbox');
  private hiddenInput?: HTMLInputElement;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Whether the checkbox is in an indeterminate state. */
  @Prop({ mutable: true, reflect: true }) indeterminate = false;

  /** Renders the checkbox as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** The value associated with this checkbox. */
  @Prop() value = '';

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Label text. If omitted, use the default slot. */
  @Prop() label?: string;

  /** The checkbox size. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Renders the checkbox in an error state. */
  @Prop({ reflect: true }) error = false;

  /** Emitted when the checked state changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsCheckboxChangeEventDetail>;

  connectedCallback(): void {
    if (this.name) {
      this.hiddenInput = document.createElement('input');
      this.hiddenInput.type = 'hidden';
      this.hiddenInput.name = this.name;
      this.hiddenInput.value = this.checked ? (this.value || 'on') : '';
      this.hostEl.appendChild(this.hiddenInput);
    }
  }

  disconnectedCallback(): void {
    this.hiddenInput?.remove();
  }

  @Watch('checked')
  handleCheckedChange(): void {
    if (this.hiddenInput) {
      this.hiddenInput.value = this.checked ? (this.value || 'on') : '';
    }
  }

  /** Programmatically toggle the checkbox. */
  @Method()
  async toggle(): Promise<void> {
    if (!this.disabled) {
      this.indeterminate = false;
      this.checked = !this.checked;
      this.tsChange.emit({ checked: this.checked, value: this.value });
    }
  }

  private handleClick = (): void => {
    this.toggle();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';

    return (
      <Host
        class={{
          'ts-checkbox': true,
          [`ts-checkbox--${this.size}`]: true,
          'ts-checkbox--checked': this.checked,
          'ts-checkbox--indeterminate': this.indeterminate,
          'ts-checkbox--disabled': this.disabled,
          'ts-checkbox--error': this.error,
        }}
      >
        <div
          class="checkbox__base"
          part="base"
          role="checkbox"
          aria-checked={ariaChecked}
          aria-disabled={this.disabled ? 'true' : undefined}
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <div class="checkbox__control" part="control">
            {this.checked && !this.indeterminate && (
              <svg class="checkbox__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3.5 8L6.5 11L12.5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
            {this.indeterminate && (
              <svg class="checkbox__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </div>

          <label class="checkbox__label" part="label" id={`${this.inputId}-label`}>
            {this.label ? this.label : <slot />}
          </label>
        </div>
      </Host>
    );
  }
}
