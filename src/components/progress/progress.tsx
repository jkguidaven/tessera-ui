import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize } from '../../types';

type TsProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * @part track - The progress track.
 * @part fill - The progress fill bar.
 * @part label - The value label text.
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

  private get percentage(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    const percent = this.percentage;

    return (
      <Host
        class={{
          'ts-progress': true,
          [`ts-progress--${this.variant}`]: true,
          [`ts-progress--${this.size}`]: true,
          'ts-progress--indeterminate': this.indeterminate,
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
}
