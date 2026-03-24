import { Component, Prop, Event, State, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @part track - The slider track.
 * @part fill - The filled portion of the track.
 * @part thumb - The draggable thumb.
 * @part label - The value label.
 */
@Component({
  tag: 'ts-slider',
  styleUrl: 'slider.css',
  shadow: true,
})
export class TsSlider {
  @Element() hostEl!: HTMLElement;

  private trackEl?: HTMLElement;

  @State() dragging = false;

  /** Current slider value. */
  @Prop({ mutable: true, reflect: true }) value = 0;

  /** Minimum value. */
  @Prop() min = 0;

  /** Maximum value. */
  @Prop() max = 100;

  /** Step increment. */
  @Prop() step = 1;

  /** Disables the slider. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible label. */
  @Prop() label?: string;

  /** Whether to display the current value. */
  @Prop({ reflect: true }) showValue = false;

  /** The size of the slider. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Emitted continuously during drag. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<{ value: number }>;

  /** Emitted when drag ends (value committed). */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: number }>;

  private get percentage(): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    return ((this.value - this.min) / range) * 100;
  }

  private clampAndStep(val: number): number {
    // Snap to step
    const stepped = Math.round((val - this.min) / this.step) * this.step + this.min;
    // Clamp
    return Math.min(this.max, Math.max(this.min, stepped));
  }

  private updateValueFromPosition(clientX: number) {
    if (!this.trackEl) return;
    const rect = this.trackEl.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const rawValue = this.min + ratio * (this.max - this.min);
    this.value = this.clampAndStep(rawValue);
  }

  private handleMouseDown = (event: MouseEvent) => {
    if (this.disabled) return;
    event.preventDefault();
    this.dragging = true;
    this.updateValueFromPosition(event.clientX);
    this.tsInput.emit({ value: this.value });

    const handleMouseMove = (e: MouseEvent) => {
      this.updateValueFromPosition(e.clientX);
      this.tsInput.emit({ value: this.value });
    };

    const handleMouseUp = () => {
      this.dragging = false;
      this.tsChange.emit({ value: this.value });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    let newValue = this.value;
    const bigStep = this.step * 10;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = this.clampAndStep(this.value + this.step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = this.clampAndStep(this.value - this.step);
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = this.clampAndStep(this.value + bigStep);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = this.clampAndStep(this.value - bigStep);
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      default:
        return;
    }

    if (newValue !== this.value) {
      this.value = newValue;
      this.tsInput.emit({ value: this.value });
      this.tsChange.emit({ value: this.value });
    }
  };

  render() {
    const percent = this.percentage;

    return (
      <Host
        class={{
          'ts-slider': true,
          [`ts-slider--${this.size}`]: true,
          'ts-slider--disabled': this.disabled,
        }}
      >
        {this.label && (
          <label class="slider__label" part="label">
            {this.label}
            {this.showValue && <span class="slider__value">{this.value}</span>}
          </label>
        )}
        {!this.label && this.showValue && (
          <span class="slider__value" part="label" aria-hidden="true">
            {this.value}
          </span>
        )}
        <div
          class="slider__track"
          part="track"
          ref={(el) => (this.trackEl = el)}
          onMouseDown={this.handleMouseDown}
        >
          <div
            class="slider__fill"
            part="fill"
            style={{ width: `${percent}%` }}
          />
          <div
            class="slider__thumb"
            part="thumb"
            role="slider"
            tabindex={this.disabled ? -1 : 0}
            aria-valuenow={this.value}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
            aria-label={this.label || undefined}
            aria-disabled={this.disabled ? 'true' : undefined}
            style={{ insetInlineStart: `${percent}%` }}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </Host>
    );
  }
}
