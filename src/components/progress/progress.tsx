import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize } from '../../types';

type TsProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type TsProgressType = 'linear' | 'circular';

/**
 * @part track - The progress track.
 * @part fill - The progress fill bar.
 * @part label - The value label text.
 * @part buffer - The buffer fill bar.
 * @part svg - The circular SVG element.
 * @part circle-track - The circular track ring.
 * @part circle-fill - The circular fill ring.
 * @part circle-text - The circular percentage text.
 */
@Component({
  tag: 'ts-progress',
  styleUrl: 'progress.css',
  shadow: true,
})
export class TsProgress {
  /** Current progress value (0 to max). */
  @Prop() value = 0;

  /** Maximum value. */
  @Prop() max = 100;

  /** The color variant. */
  @Prop({ reflect: true }) variant: TsProgressVariant = 'primary';

  /** The size of the progress bar. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Whether the progress is indeterminate. */
  @Prop({ reflect: true }) indeterminate = false;

  /** Accessible label for the progress bar. */
  @Prop() label?: string;

  /** Whether to display the percentage value. */
  @Prop({ reflect: true }) showValue = false;

  /** The type of progress indicator. */
  @Prop({ reflect: true }) type: TsProgressType = 'linear';

  /** Whether to show diagonal stripes on the fill (linear only). */
  @Prop({ reflect: true }) striped = false;

  /** Whether to animate the stripes (requires striped to be true). */
  @Prop({ reflect: true }) animated = false;

  /** Buffer value for showing buffered/loaded amount (linear only). */
  @Prop() bufferValue?: number;

  private get percentage(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  private get bufferPercentage(): number {
    if (this.bufferValue === undefined || this.bufferValue === null || this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.bufferValue / this.max) * 100));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderLinear() {
    const percent = this.percentage;
    const hasBuffer = this.bufferValue !== undefined && this.bufferValue !== null;

    return (
      <Host
        class={{
          'ts-progress': true,
          [`ts-progress--${this.variant}`]: true,
          [`ts-progress--${this.size}`]: true,
          'ts-progress--indeterminate': this.indeterminate,
          'ts-progress--striped': this.striped,
          'ts-progress--animated': this.striped && this.animated,
        }}
      >
        <div
          class="progress__track"
          part="track"
          role="progressbar"
          aria-valuenow={this.indeterminate ? undefined : this.value}
          aria-valuemin={0}
          aria-valuemax={this.max}
          aria-label={this.label || undefined}
        >
          {hasBuffer && (
            <div
              class="progress__buffer"
              part="buffer"
              style={{ width: `${this.bufferPercentage}%` }}
            />
          )}
          <div
            class="progress__fill"
            part="fill"
            style={this.indeterminate ? undefined : { width: `${percent}%` }}
          />
        </div>
        {this.showValue && !this.indeterminate && (
          <span class="progress__label" part="label" aria-hidden="true">
            {Math.round(percent)}%
          </span>
        )}
      </Host>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderCircular() {
    const percent = this.percentage;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <Host
        class={{
          'ts-progress': true,
          'ts-progress--circular': true,
          [`ts-progress--${this.variant}`]: true,
          [`ts-progress--${this.size}`]: true,
          'ts-progress--indeterminate': this.indeterminate,
        }}
      >
        <svg
          class="progress__svg"
          part="svg"
          viewBox="0 0 36 36"
          role="progressbar"
          aria-valuenow={this.indeterminate ? undefined : this.value}
          aria-valuemin={0}
          aria-valuemax={this.max}
          aria-label={this.label || undefined}
        >
          <circle
            class="progress__circle-track"
            part="circle-track"
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke-width="3"
          />
          <circle
            class="progress__circle-fill"
            part="circle-fill"
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke-width="3"
            stroke-dasharray={circumference}
            stroke-dashoffset={this.indeterminate ? circumference * 0.75 : offset}
            stroke-linecap="round"
          />
          {this.showValue && !this.indeterminate && (
            <text
              class="progress__circle-text"
              part="circle-text"
              x="18"
              y="18"
              text-anchor="middle"
              dominant-baseline="central"
            >
              {Math.round(percent)}%
            </text>
          )}
        </svg>
      </Host>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    if (this.type === 'circular') {
      return this.renderCircular();
    }
    return this.renderLinear();
  }
}
