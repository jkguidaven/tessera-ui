import { Component, Prop, Event, h, Host, Element, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsToggleEventDetail } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Default slot for the toggle label.
 *
 * @part base - The toggle container.
 * @part track - The toggle track.
 * @part thumb - The toggle thumb/knob.
 * @part label - The label wrapper.
 */
@Component({
  tag: 'ts-toggle',
  styleUrl: 'toggle.css',
  shadow: true,
})
export class TsToggle {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-toggle');

  /** Whether the toggle is checked. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** The toggle's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Renders the toggle as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Name for form submission. */
  @Prop() name?: string;

  /** Value for form submission. */
  @Prop() value?: string;

  /** Emitted when the toggle state changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<TsToggleEventDetail>;

  /** Programmatically toggle the checked state. */
  @Method()
  async toggle(): Promise<void> {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.tsChange.emit({ checked: this.checked });
    }
  }

  private handleClick = (): void => {
    this.toggle();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };

  render() {
    return (
      <Host
        class={{
          'ts-toggle': true,
          [`ts-toggle--${this.size}`]: true,
          'ts-toggle--checked': this.checked,
          'ts-toggle--disabled': this.disabled,
        }}
      >
        <div
          class="toggle__base"
          part="base"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : undefined}
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <div class="toggle__track" part="track">
            <div class="toggle__thumb" part="thumb" />
          </div>

          <label class="toggle__label" part="label" id={`${this.inputId}-label`}>
            <slot />
          </label>
        </div>
      </Host>
    );
  }
}
