import { Component, Prop, Event, Listen, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsOrientation } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Checkboxes to group.
 *
 * @part group - The group container.
 * @part label - The group label.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-checkbox-group',
  styleUrl: 'checkbox-group.css',
  shadow: false,
})
export class TsCheckboxGroup {
  @Element() hostEl!: HTMLElement;

  private groupId = generateId('ts-checkbox-group');

  /** The currently checked values. */
  @Prop({ mutable: true }) value: string[] = [];

  /** Accessible label for the group. */
  @Prop() label?: string;

  /** Layout direction of the checkboxes. */
  @Prop({ reflect: true }) orientation: TsOrientation = 'vertical';

  /** Error message displayed below the group. */
  @Prop() error?: string;

  /** Disables all child checkboxes. */
  @Prop({ reflect: true }) disabled = false;

  /** Size for all child checkboxes. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Emitted when the selected values change. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string[] }>;

  @Listen('tsChange')
  handleChildChange(event: CustomEvent<{ checked: boolean; value: string }>): void {
    const target = event.target as HTMLElement;
    if (target === this.hostEl) return;

    event.stopPropagation();

    const { checked, value: childValue } = event.detail;

    if (checked) {
      if (!this.value.includes(childValue)) {
        this.value = [...this.value, childValue];
      }
    } else {
      this.value = this.value.filter((v) => v !== childValue);
    }

    this.tsChange.emit({ value: this.value });
  }

  componentDidLoad(): void {
    this.syncCheckboxes();
  }

  componentDidUpdate(): void {
    this.syncCheckboxes();
  }

  private syncCheckboxes(): void {
    const checkboxes = this.hostEl.querySelectorAll('ts-checkbox');
    checkboxes.forEach((checkbox: Element) => {
      const checkboxEl = checkbox as HTMLElement & { checked?: boolean; disabled?: boolean; size?: string };
      checkboxEl.checked = this.value.includes(checkboxEl.getAttribute('value') || '');
      if (this.disabled) {
        checkboxEl.disabled = true;
      }
      if (this.size) {
        checkboxEl.size = this.size;
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
          'ts-checkbox-group': true,
          [`ts-checkbox-group--${this.orientation}`]: true,
          'ts-checkbox-group--disabled': this.disabled,
          'ts-checkbox-group--error': hasError,
        }}
      >
        {this.label && (
          <div class="checkbox-group__label" part="label" id={`${this.groupId}-label`}>
            {this.label}
          </div>
        )}
        <div
          class="checkbox-group__items"
          part="group"
          role="group"
          aria-label={this.label || undefined}
          aria-describedby={hasError ? errorId : undefined}
        >
          <slot />
        </div>
        {hasError && (
          <div class="checkbox-group__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}
      </Host>
    );
  }
}
