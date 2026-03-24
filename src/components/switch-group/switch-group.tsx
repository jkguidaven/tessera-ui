import { Component, Prop, Event, h, Host, Element, Listen, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @slot - Default slot for ts-switch-option children.
 *
 * @part base - The switch group container.
 */
@Component({
  tag: 'ts-switch-group',
  styleUrl: 'switch-group.css',
  shadow: true,
})
export class TsSwitchGroup {
  @Element() hostEl!: HTMLElement;

  /** The currently active segment value. */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /** The size of the switch group. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Disables the entire group. */
  @Prop({ reflect: true }) disabled = false;

  /** Stretch to fill the container width. */
  @Prop({ reflect: true }) fullWidth = false;

  /** Emitted when the active value changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

  @Watch('value')
  onValueChange() {
    this.syncOptions();
  }

  @Listen('tsOptionSelect')
  handleOptionSelect(event: CustomEvent<{ value: string }>) {
    event.stopPropagation();
    if (this.disabled) return;
    this.selectOption(event.detail.value);
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    const options = this.getOptions();
    const enabledOptions = options.filter(o => !o.disabled);
    if (enabledOptions.length === 0) return;

    const currentIndex = enabledOptions.findIndex(o => o.value === this.value);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        {
          const nextIndex = (currentIndex + 1) % enabledOptions.length;
          this.selectOption(enabledOptions[nextIndex].value);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        {
          const prevIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
          this.selectOption(enabledOptions[prevIndex].value);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.selectOption(enabledOptions[0].value);
        break;
      case 'End':
        event.preventDefault();
        this.selectOption(enabledOptions[enabledOptions.length - 1].value);
        break;
    }
  }

  componentDidLoad() {
    this.syncOptions();
  }

  private getOptions(): HTMLTsSwitchOptionElement[] {
    return Array.from(this.hostEl.querySelectorAll('ts-switch-option')) as HTMLTsSwitchOptionElement[];
  }

  private selectOption(value: string) {
    if (value !== this.value) {
      this.value = value;
      this.tsChange.emit({ value });
    }
    this.syncOptions();
  }

  private syncOptions() {
    const options = this.getOptions();
    options.forEach(option => {
      (option as any).active = option.value === this.value;
    });
  }

  private handleSlotChange = (): void => {
    this.syncOptions();
  };

  render() {
    return (
      <Host
        class={{
          'ts-switch-group': true,
          [`ts-switch-group--${this.size}`]: true,
          'ts-switch-group--disabled': this.disabled,
          'ts-switch-group--full-width': this.fullWidth,
        }}
        role="radiogroup"
      >
        <div class="switch-group__base" part="base">
          <slot onSlotchange={this.handleSlotChange} />
        </div>
      </Host>
    );
  }
}

interface HTMLTsSwitchOptionElement extends HTMLElement {
  value: string;
  disabled: boolean;
  active: boolean;
}
