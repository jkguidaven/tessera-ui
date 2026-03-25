import { Component, Prop, Event, State, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize, TsOrientation } from '../../types';

interface SliderMark {
  value: number;
  label?: string;
}

/**
 * @part track - The slider track.
 * @part fill - The filled portion of the track.
 * @part thumb - The draggable thumb (single mode).
 * @part thumb-low - The low thumb (range mode).
 * @part thumb-high - The high thumb (range mode).
 * @part label - The value label.
 * @part marks - The marks container.
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
  @State() activeThumb: 'low' | 'high' | null = null;

  /** Current slider value (single mode). */
  @Prop({ mutable: true, reflect: true }) value = 0;

  /** Low value for range mode. */
  @Prop({ mutable: true, reflect: true }) valueLow?: number;

  /** High value for range mode. */
  @Prop({ mutable: true, reflect: true }) valueHigh?: number;

  /** Whether to use range mode (dual thumbs). */
  @Prop({ reflect: true }) range = false;

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

  /** Orientation of the slider. */
  @Prop({ reflect: true }) orientation: TsOrientation = 'horizontal';

  /** JSON string of marks: [{"value": 0, "label": "0%"}, ...] */
  @Prop() marks?: string;

  /** Emitted continuously during drag. */
  @Event({ eventName: 'tsInput' }) tsInput!: EventEmitter<{ value: number; valueLow?: number; valueHigh?: number }>;

  /** Emitted when drag ends (value committed). */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: number; valueLow?: number; valueHigh?: number }>;

  private get effectiveLow(): number {
    return this.valueLow !== undefined ? this.valueLow : this.min;
  }

  private get effectiveHigh(): number {
    return this.valueHigh !== undefined ? this.valueHigh : this.max;
  }

  private get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  private get parsedMarks(): SliderMark[] {
    if (!this.marks) return [];
    try {
      return JSON.parse(this.marks);
    } catch {
      return [];
    }
  }

  private toPercent(val: number): number {
    const r = this.max - this.min;
    if (r <= 0) return 0;
    return ((val - this.min) / r) * 100;
  }

  private get percentage(): number {
    return this.toPercent(this.value);
  }

  private clampAndStep(val: number): number {
    const stepped = Math.round((val - this.min) / this.step) * this.step + this.min;
    return Math.min(this.max, Math.max(this.min, stepped));
  }

  private getValueFromPosition(clientX: number, clientY: number): number {
    if (!this.trackEl) return this.value;
    const rect = this.trackEl.getBoundingClientRect();
    let ratio: number;
    if (this.isVertical) {
      ratio = 1 - (clientY - rect.top) / rect.height;
    } else {
      ratio = (clientX - rect.left) / rect.width;
    }
    return this.min + ratio * (this.max - this.min);
  }

  private emitValues(): { value: number; valueLow?: number; valueHigh?: number } {
    if (this.range) {
      return { value: this.effectiveLow, valueLow: this.effectiveLow, valueHigh: this.effectiveHigh };
    }
    return { value: this.value };
  }

  private handleMouseDown = (event: MouseEvent): void => {
    if (this.disabled) return;
    event.preventDefault();
    this.dragging = true;

    const rawValue = this.getValueFromPosition(event.clientX, event.clientY);
    const snapped = this.clampAndStep(rawValue);

    if (this.range) {
      const distLow = Math.abs(snapped - this.effectiveLow);
      const distHigh = Math.abs(snapped - this.effectiveHigh);
      this.activeThumb = distLow <= distHigh ? 'low' : 'high';
      this.updateRangeValue(snapped);
    } else {
      this.value = snapped;
    }
    this.tsInput.emit(this.emitValues());

    const handleMouseMove = (e: MouseEvent): void => {
      const raw = this.getValueFromPosition(e.clientX, e.clientY);
      const val = this.clampAndStep(raw);
      if (this.range) {
        this.updateRangeValue(val);
      } else {
        this.value = val;
      }
      this.tsInput.emit(this.emitValues());
    };

    const handleMouseUp = (): void => {
      this.dragging = false;
      this.activeThumb = null;
      this.tsChange.emit(this.emitValues());
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  private updateRangeValue(val: number): void {
    if (this.activeThumb === 'low') {
      this.valueLow = Math.min(val, this.effectiveHigh);
    } else {
      this.valueHigh = Math.max(val, this.effectiveLow);
    }
  }

  private handleKeyDown = (event: KeyboardEvent, thumb?: 'low' | 'high'): void => {
    if (this.disabled) return;

    const current = this.range
      ? (thumb === 'low' ? this.effectiveLow : this.effectiveHigh)
      : this.value;
    let newValue = current;
    const bigStep = this.step * 10;

    const incKey = this.isVertical ? 'ArrowUp' : 'ArrowRight';
    const decKey = this.isVertical ? 'ArrowDown' : 'ArrowLeft';

    switch (event.key) {
      case incKey:
      case (this.isVertical ? 'ArrowRight' : 'ArrowUp'):
        event.preventDefault();
        newValue = this.clampAndStep(current + this.step);
        break;
      case decKey:
      case (this.isVertical ? 'ArrowLeft' : 'ArrowDown'):
        event.preventDefault();
        newValue = this.clampAndStep(current - this.step);
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = this.clampAndStep(current + bigStep);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = this.clampAndStep(current - bigStep);
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

    if (newValue !== current) {
      if (this.range && thumb === 'low') {
        this.valueLow = Math.min(newValue, this.effectiveHigh);
      } else if (this.range && thumb === 'high') {
        this.valueHigh = Math.max(newValue, this.effectiveLow);
      } else {
        this.value = newValue;
      }
      this.tsInput.emit(this.emitValues());
      this.tsChange.emit(this.emitValues());
    }
  };

  private renderMarks(): unknown {
    const marks = this.parsedMarks;
    if (marks.length === 0) return null;

    const positionProp = this.isVertical ? 'bottom' : 'insetInlineStart';

    return (
      <div class="slider__marks" part="marks">
        {marks.map((mark) => {
          const pct = this.toPercent(mark.value);
          return (
            <div class="slider__mark" style={{ [positionProp]: `${pct}%` }}>
              <div class="slider__mark-tick" />
              {mark.label && <div class="slider__mark-label">{mark.label}</div>}
            </div>
          );
        })}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const isRange = this.range;
    const lowPct = isRange ? this.toPercent(this.effectiveLow) : 0;
    const highPct = isRange ? this.toPercent(this.effectiveHigh) : this.percentage;
    const singlePct = this.percentage;

    const fillStyle = this.isVertical
      ? isRange
        ? { bottom: `${lowPct}%`, height: `${highPct - lowPct}%` }
        : { bottom: '0%', height: `${singlePct}%` }
      : isRange
        ? { insetInlineStart: `${lowPct}%`, width: `${highPct - lowPct}%` }
        : { width: `${singlePct}%` };

    const thumbPos = this.isVertical ? 'bottom' : 'insetInlineStart';

    const displayValue = isRange
      ? `${this.effectiveLow} – ${this.effectiveHigh}`
      : `${this.value}`;

    return (
      <Host
        class={{
          'ts-slider': true,
          [`ts-slider--${this.size}`]: true,
          'ts-slider--disabled': this.disabled,
          'ts-slider--vertical': this.isVertical,
          'ts-slider--range': isRange,
        }}
      >
        {this.label && (
          <label class="slider__label" part="label">
            {this.label}
            {this.showValue && <span class="slider__value">{displayValue}</span>}
          </label>
        )}
        {!this.label && this.showValue && (
          <span class="slider__value" part="label" aria-hidden="true">
            {displayValue}
          </span>
        )}
        <div
          class="slider__track"
          part="track"
          ref={(el) => (this.trackEl = el)}
          onMouseDown={this.handleMouseDown}
        >
          <div class="slider__fill" part="fill" style={fillStyle} />

          {isRange ? [
            <div
              class="slider__thumb slider__thumb--low"
              part="thumb-low"
              role="slider"
              tabindex={this.disabled ? -1 : 0}
              aria-valuenow={this.effectiveLow}
              aria-valuemin={this.min}
              aria-valuemax={this.effectiveHigh}
              aria-label={this.label ? `${this.label} minimum` : 'Minimum'}
              aria-disabled={this.disabled ? 'true' : undefined}
              aria-orientation={this.orientation}
              style={{ [thumbPos]: `${lowPct}%` }}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, 'low')}
            />,
            <div
              class="slider__thumb slider__thumb--high"
              part="thumb-high"
              role="slider"
              tabindex={this.disabled ? -1 : 0}
              aria-valuenow={this.effectiveHigh}
              aria-valuemin={this.effectiveLow}
              aria-valuemax={this.max}
              aria-label={this.label ? `${this.label} maximum` : 'Maximum'}
              aria-disabled={this.disabled ? 'true' : undefined}
              aria-orientation={this.orientation}
              style={{ [thumbPos]: `${highPct}%` }}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, 'high')}
            />,
          ] : (
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
              aria-orientation={this.orientation}
              style={{ [thumbPos]: `${singlePct}%` }}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
            />
          )}

          {this.renderMarks()}
        </div>
      </Host>
    );
  }
}
