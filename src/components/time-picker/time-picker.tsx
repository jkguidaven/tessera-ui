import { Component, Prop, State, Event, Watch, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { TsSize } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @part base - The outer wrapper.
 * @part label - The label element.
 * @part segment - A time segment input.
 * @part separator - The colon separator between segments.
 * @part period - The AM/PM toggle button.
 * @part help-text - The help text wrapper.
 * @part error-text - The error message wrapper.
 */
@Component({
  tag: 'ts-time-picker',
  styleUrl: 'time-picker.css',
  shadow: true,
})
export class TsTimePicker {
  @Element() hostEl!: HTMLElement;

  private inputId = generateId('ts-time-picker');

  /** The time value in "HH:mm" or "HH:mm:ss" format. */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /** Time display format: 12-hour or 24-hour clock. */
  @Prop({ reflect: true }) format: '12' | '24' = '24';

  /** Minutes increment step. */
  @Prop() step = 1;

  /** Label text displayed above the input. */
  @Prop() label?: string;

  /** Help text displayed below the input. */
  @Prop() helpText?: string;

  /** Error message — renders the input in an error state. */
  @Prop() error?: string;

  /** Renders the time picker as disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the time picker required. */
  @Prop({ reflect: true }) required = false;

  /** The time picker's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Name attribute for form submission. */
  @Prop() name?: string;

  /** Whether to show the seconds segment. */
  @Prop({ reflect: true }) showSeconds = false;

  /** Current hours value (0-23 internally). */
  @State() hours = 0;

  /** Current minutes value (0-59). */
  @State() minutes = 0;

  /** Current seconds value (0-59). */
  @State() seconds = 0;

  /** AM or PM period for 12-hour format. */
  @State() period: 'AM' | 'PM' = 'AM';

  /** Whether the wrapper currently has focus. */
  @State() hasFocus = false;

  /** Emitted when the time value changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

  /** Emitted when the time picker gains focus. */
  @Event({ eventName: 'tsFocus' }) tsFocus!: EventEmitter<void>;

  /** Emitted when the time picker loses focus. */
  @Event({ eventName: 'tsBlur' }) tsBlur!: EventEmitter<void>;

  @Watch('value')
  handleValueChange(newValue: string | undefined): void {
    if (newValue) {
      this.parseValue(newValue);
    }
  }

  connectedCallback(): void {
    if (this.value) {
      this.parseValue(this.value);
    }
  }

  private parseValue(val: string): void {
    const parts = val.split(':');
    if (parts.length >= 2) {
      let h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const s = parts.length >= 3 ? parseInt(parts[2], 10) : 0;

      if (!isNaN(h) && !isNaN(m)) {
        if (this.format === '12') {
          this.period = h >= 12 ? 'PM' : 'AM';
          h = h % 12 || 12;
        }
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
      }
    }
  }

  private buildValue(): string {
    let h = this.hours;
    if (this.format === '12') {
      if (this.period === 'AM' && h === 12) h = 0;
      else if (this.period === 'PM' && h !== 12) h += 12;
    }
    const hh = String(h).padStart(2, '0');
    const mm = String(this.minutes).padStart(2, '0');
    if (this.showSeconds) {
      const ss = String(this.seconds).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    }
    return `${hh}:${mm}`;
  }

  private emitChange(): void {
    this.value = this.buildValue();
    this.tsChange.emit({ value: this.value });
  }

  private handleSegmentInput = (segment: 'hours' | 'minutes' | 'seconds', event: Event): void => {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    if (isNaN(val)) return;

    if (segment === 'hours') {
      const max = this.format === '12' ? 12 : 23;
      const min = this.format === '12' ? 1 : 0;
      val = Math.max(min, Math.min(max, val));
      this.hours = val;
    } else if (segment === 'minutes') {
      val = Math.max(0, Math.min(59, val));
      this.minutes = val;
    } else {
      val = Math.max(0, Math.min(59, val));
      this.seconds = val;
    }

    this.emitChange();
  };

  private handleSegmentKeyDown = (segment: 'hours' | 'minutes' | 'seconds', event: KeyboardEvent): void => {
    if (this.disabled) return;

    const increment = segment === 'minutes' ? this.step : 1;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.adjustSegment(segment, increment);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.adjustSegment(segment, -increment);
    }
  };

  private adjustSegment(segment: 'hours' | 'minutes' | 'seconds', delta: number): void {
    if (segment === 'hours') {
      const max = this.format === '12' ? 12 : 23;
      const min = this.format === '12' ? 1 : 0;
      let val = this.hours + delta;
      if (val > max) val = min;
      if (val < min) val = max;
      this.hours = val;
    } else if (segment === 'minutes') {
      let val = this.minutes + delta;
      if (val > 59) val = 0;
      if (val < 0) val = 59;
      this.minutes = val;
    } else {
      let val = this.seconds + delta;
      if (val > 59) val = 0;
      if (val < 0) val = 59;
      this.seconds = val;
    }

    this.emitChange();
  }

  private togglePeriod = (): void => {
    if (this.disabled) return;
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.emitChange();
  };

  private handleFocus = (): void => {
    this.hasFocus = true;
    this.tsFocus.emit();
  };

  private handleBlur = (): void => {
    this.hasFocus = false;
    this.tsBlur.emit();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasError = !!this.error;
    const labelId = `${this.inputId}-label`;
    const helpId = `${this.inputId}-help`;
    const errorId = `${this.inputId}-error`;

    const displayHours = this.format === '12'
      ? String(this.hours || 12).padStart(2, '0')
      : String(this.hours).padStart(2, '0');

    return (
      <Host
        class={{
          'ts-time-picker': true,
          [`ts-time-picker--${this.size}`]: true,
          'ts-time-picker--focused': this.hasFocus,
          'ts-time-picker--disabled': this.disabled,
          'ts-time-picker--error': hasError,
        }}
      >
        {this.label && (
          <label class="time-picker__label" part="label" id={labelId}>
            {this.label}
            {this.required && <span class="time-picker__required" aria-hidden="true"> *</span>}
          </label>
        )}

        <div
          class={{
            'time-picker__wrapper': true,
            'time-picker__wrapper--focused': this.hasFocus,
            'time-picker__wrapper--error': hasError,
            'time-picker__wrapper--disabled': this.disabled,
          }}
          part="base"
          role="group"
          aria-label={this.label || 'Time picker'}
          aria-describedby={hasError ? errorId : this.helpText ? helpId : undefined}
        >
          <input
            class="time-picker__segment"
            part="segment"
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={displayHours}
            disabled={this.disabled}
            aria-label="Hours"
            onInput={(e: Event) => this.handleSegmentInput('hours', e)}
            onKeyDown={(e: KeyboardEvent) => this.handleSegmentKeyDown('hours', e)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <span class="time-picker__separator" part="separator" aria-hidden="true">:</span>

          <input
            class="time-picker__segment"
            part="segment"
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={String(this.minutes).padStart(2, '0')}
            disabled={this.disabled}
            aria-label="Minutes"
            onInput={(e: Event) => this.handleSegmentInput('minutes', e)}
            onKeyDown={(e: KeyboardEvent) => this.handleSegmentKeyDown('minutes', e)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {this.showSeconds && [
            <span class="time-picker__separator" part="separator" aria-hidden="true">:</span>,
            <input
              class="time-picker__segment"
              part="segment"
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={String(this.seconds).padStart(2, '0')}
              disabled={this.disabled}
              aria-label="Seconds"
              onInput={(e: Event) => this.handleSegmentInput('seconds', e)}
              onKeyDown={(e: KeyboardEvent) => this.handleSegmentKeyDown('seconds', e)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />,
          ]}

          {this.format === '12' && (
            <button
              class="time-picker__period"
              part="period"
              type="button"
              disabled={this.disabled}
              aria-label={`Toggle AM/PM, currently ${this.period}`}
              onClick={this.togglePeriod}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            >
              {this.period}
            </button>
          )}
        </div>

        {hasError && (
          <div class="time-picker__error" part="error-text" id={errorId} role="alert">
            {this.error}
          </div>
        )}

        {!hasError && this.helpText && (
          <div class="time-picker__help" part="help-text" id={helpId}>
            {this.helpText}
          </div>
        )}

        {this.name && (
          <input type="hidden" name={this.name} value={this.buildValue()} />
        )}
      </Host>
    );
  }
}
