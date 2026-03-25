import { Component, Prop, Event, Listen, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsOrientation } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Radio buttons to group.
 *
 * @part group - The group container.
 * @part label - The group label.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-radio-group',
  styleUrl: 'radio-group.css',
  shadow: false,
})
export class TsRadioGroup {
  @Element() hostEl!: HTMLElement;

  private groupId = generateId('ts-radio-group');

  /** The currently selected value. */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /** Shared name for all child radios. */
  @Prop() name?: string;

  /** Accessible label for the group. */
  @Prop() label?: string;

  /** Layout direction of the radios. */
  @Prop({ reflect: true }) orientation: TsOrientation = 'vertical';

  /** Error message displayed below the group. */
  @Prop() error?: string;

  /** Disables all child radios. */
  @Prop({ reflect: true }) disabled = false;

  /** Size for all child radios. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Emitted when the selected value changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

  @Listen('tsChange')
  handleChildChange(event: CustomEvent<{ checked: boolean; value: string }>): void {
    // Only handle events from child ts-radio, not our own
    const target = event.target as HTMLElement;
    if (target === this.hostEl) return;

    event.stopPropagation();

    if (event.detail.checked) {
      this.value = event.detail.value;
      this.syncRadios();
      this.tsChange.emit({ value: this.value });
    }
  }

  componentDidLoad(): void {
    this.syncRadios();
  }

  componentDidUpdate(): void {
    this.syncRadios();
  }

  private syncRadios(): void {
    const radios = this.hostEl.querySelectorAll('ts-radio');
    radios.forEach((radio: Element) => {
      const radioEl = radio as HTMLElement & { name?: string; checked?: boolean; disabled?: boolean; size?: string };
      if (this.name) {
        radioEl.name = this.name;
      }
      radioEl.checked = radioEl.getAttribute('value') === this.value;
      if (this.disabled) {
        radioEl.disabled = true;
      }
      if (this.size) {
        radioEl.size = this.size;
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const errorId = `${this.groupId}-error`;

    return (
      <Host
        class={{
          'ts-radio-group': true,
          [`ts-radio-group--${this.orientation}`]: true,
          'ts-radio-group--disabled': this.disabled,
          'ts-radio-group--error': hasError,
        }}
      >
        {this.label && (
          <div class="radio-group__label" part="label" id={`${this.groupId}-label`}>
            {this.label}
          </div>
        )}
        <div
          class="radio-group__items"
          part="group"
          role="radiogroup"
          aria-label={this.label || undefined}
          aria-describedby={hasError ? errorId : undefined}
        >
          <slot />
        </div>
        {hasError && (
          <div class="radio-group__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}
      </Host>
    );
  }
}
