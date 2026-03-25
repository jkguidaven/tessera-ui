import { Component, Prop, State, Event, h, Host, Element, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId } from '../../utils/aria';

const DEFAULT_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * @part trigger - The input trigger element.
 * @part calendar - The calendar dropdown container.
 * @part header - The month/year navigation header.
 * @part grid - The day grid.
 * @part day - Individual day cell.
 * @part label - The label element.
 * @part error - The error message.
 */
@Component({
  tag: 'ts-date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class TsDatePicker {
  @Element() hostEl!: HTMLElement;

  private pickerId = generateId('ts-date-picker');
  private triggerEl?: HTMLInputElement;

  /** The selected date value in ISO format (YYYY-MM-DD). */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /** Placeholder text for the input. */
  @Prop() placeholder = 'Select date';

  /** Whether the date picker is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Minimum selectable date in ISO format. */
  @Prop() min?: string;

  /** Maximum selectable date in ISO format. */
  @Prop() max?: string;

  /** Label text for the input. */
  @Prop() label?: string;

  /** Whether the input is in an error state. */
  @Prop({ reflect: true }) error = false;

  /** Error message to display. */
  @Prop() errorMessage?: string;

  /** The input size. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Form field name. */
  @Prop() name?: string;

  /** Locale string for date formatting (BCP 47). */
  @Prop() locale = 'en-US';

  /** First day of the week (0 = Sunday, 1 = Monday, ... 6 = Saturday). */
  @Prop() firstDayOfWeek = 0;

  /** Enable date range selection mode. */
  @Prop({ reflect: true }) range = false;

  /** The end date of the selected range in ISO format (YYYY-MM-DD). Only used when `range` is true. */
  @Prop({ mutable: true, reflect: true }) valueEnd?: string;

  /** Emitted when a date is selected. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string; valueEnd?: string }>;

  /** Whether the calendar dropdown is open. */
  @State() isOpen = false;

  /** The month currently being viewed (0-11). */
  @State() viewMonth = new Date().getMonth();

  /** The year currently being viewed. */
  @State() viewYear = new Date().getFullYear();

  /** Currently focused day in the grid for keyboard navigation. */
  @State() focusedDay: number | null = null;

  @Watch('value')
  handleValueChange(): void {
    if (this.value) {
      const date = new Date(this.value + 'T00:00:00');
      if (!isNaN(date.getTime())) {
        this.viewMonth = date.getMonth();
        this.viewYear = date.getFullYear();
      }
    }
  }

  connectedCallback(): void {
    this.handleValueChange();
  }

  private toggleCalendar = (): void => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.handleValueChange();
    }
  };

  private closeCalendar = (): void => {
    this.isOpen = false;
    this.focusedDay = null;
  };

  private prevYear = (): void => {
    this.viewYear -= 1;
  };

  private nextYear = (): void => {
    this.viewYear += 1;
  };

  private prevMonth = (): void => {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
  };

  private nextMonth = (): void => {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear += 1;
    } else {
      this.viewMonth += 1;
    }
  };

  private formatDateStr(day: number): string {
    const month = String(this.viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${this.viewYear}-${month}-${dayStr}`;
  }

  private selectDay = (day: number): void => {
    const newValue = this.formatDateStr(day);

    if (this.range) {
      if (!this.value || (this.value && this.valueEnd)) {
        // Start new range
        this.value = newValue;
        this.valueEnd = undefined;
      } else {
        // Set end of range
        if (newValue < this.value) {
          // Clicked before start — swap
          this.valueEnd = this.value;
          this.value = newValue;
        } else {
          this.valueEnd = newValue;
        }
        this.tsChange.emit({ value: this.value, valueEnd: this.valueEnd });
        this.closeCalendar();
        this.triggerEl?.focus();
      }
    } else {
      this.value = newValue;
      this.tsChange.emit({ value: newValue });
      this.closeCalendar();
      this.triggerEl?.focus();
    }
  };

  private isDayDisabled(day: number): boolean {
    const dateStr = `${this.viewYear}-${String(this.viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (this.min && dateStr < this.min) return true;
    if (this.max && dateStr > this.max) return true;
    return false;
  }

  private isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.viewMonth === today.getMonth() &&
      this.viewYear === today.getFullYear()
    );
  }

  private isSelected(day: number): boolean {
    if (!this.value) return false;
    const date = new Date(this.value + 'T00:00:00');
    return (
      day === date.getDate() &&
      this.viewMonth === date.getMonth() &&
      this.viewYear === date.getFullYear()
    );
  }

  private getDaysInMonth(): number {
    return new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
  }

  private getFirstDayOffset(): number {
    const dayOfWeek = new Date(this.viewYear, this.viewMonth, 1).getDay();
    return (dayOfWeek - this.firstDayOfWeek + 7) % 7;
  }

  private getWeekdayHeaders(): string[] {
    const shifted: string[] = [];
    for (let i = 0; i < 7; i++) {
      shifted.push(DEFAULT_WEEKDAYS[(this.firstDayOfWeek + i) % 7]);
    }
    return shifted;
  }

  private getMonthName(): string {
    return new Date(this.viewYear, this.viewMonth).toLocaleString(this.locale, { month: 'long' });
  }

  private isInRange(day: number): boolean {
    if (!this.range || !this.value || !this.valueEnd) return false;
    const dateStr = this.formatDateStr(day);
    return dateStr > this.value && dateStr < this.valueEnd;
  }

  private isRangeStart(day: number): boolean {
    if (!this.range || !this.value) return false;
    return this.formatDateStr(day) === this.value;
  }

  private isRangeEnd(day: number): boolean {
    if (!this.range || !this.valueEnd) return false;
    return this.formatDateStr(day) === this.valueEnd;
  }

  private handleTriggerKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleCalendar();
    } else if (event.key === 'Escape' && this.isOpen) {
      this.closeCalendar();
    }
  };

  private handleCalendarKeydown = (event: KeyboardEvent): void => {
    const daysInMonth = this.getDaysInMonth();

    if (event.key === 'Escape') {
      this.closeCalendar();
      this.triggerEl?.focus();
      return;
    }

    if (this.focusedDay === null) {
      this.focusedDay = 1;
      return;
    }

    let newDay = this.focusedDay;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newDay = Math.min(this.focusedDay + 1, daysInMonth);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newDay = Math.max(this.focusedDay - 1, 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        newDay = Math.min(this.focusedDay + 7, daysInMonth);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newDay = Math.max(this.focusedDay - 7, 1);
        break;
      case 'Enter':
        event.preventDefault();
        if (!this.isDayDisabled(this.focusedDay)) {
          this.selectDay(this.focusedDay);
        }
        return;
      default:
        return;
    }

    this.focusedDay = newDay;
  };

  private handleDocumentClick = (event: MouseEvent): void => {
    const path = event.composedPath();
    if (!path.includes(this.hostEl)) {
      this.closeCalendar();
    }
  };

  componentDidLoad(): void {
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private renderCalendar() {
    const daysInMonth = this.getDaysInMonth();
    const firstDayOffset = this.getFirstDayOffset();
    const weekdayHeaders = this.getWeekdayHeaders();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDayOffset; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return (
      <div
        class="date-picker__calendar"
        part="calendar"
        role="dialog"
        aria-label={`${this.getMonthName()} ${this.viewYear}`}
        onKeyDown={this.handleCalendarKeydown}
      >
        <div class="date-picker__header" part="header">
          <div class="date-picker__nav-group">
            <button
              class="date-picker__nav-btn"
              type="button"
              aria-label="Previous year"
              onClick={this.prevYear}
            >
              &#x00AB;
            </button>
            <button
              class="date-picker__nav-btn"
              type="button"
              aria-label="Previous month"
              onClick={this.prevMonth}
            >
              &#x2039;
            </button>
          </div>
          <span class="date-picker__month-year">
            {this.getMonthName()} {this.viewYear}
          </span>
          <div class="date-picker__nav-group">
            <button
              class="date-picker__nav-btn"
              type="button"
              aria-label="Next month"
              onClick={this.nextMonth}
            >
              &#x203A;
            </button>
            <button
              class="date-picker__nav-btn"
              type="button"
              aria-label="Next year"
              onClick={this.nextYear}
            >
              &#x00BB;
            </button>
          </div>
        </div>

        <div class="date-picker__grid" role="grid" aria-label="Calendar">
          <div class="date-picker__weekdays">
            {weekdayHeaders.map((wd) => (
              <span class="date-picker__weekday" role="columnheader" key={wd}>
                {wd}
              </span>
            ))}
          </div>
          <div class="date-picker__days">
            {days.map((day, index) =>
              day === null ? (
                <span class="date-picker__day date-picker__day--empty" key={`empty-${index}`} />
              ) : (
                <button
                  class={{
                    'date-picker__day': true,
                    'date-picker__day--today': this.isToday(day),
                    'date-picker__day--selected': this.isSelected(day),
                    'date-picker__day--disabled': this.isDayDisabled(day),
                    'date-picker__day--focused': this.focusedDay === day,
                    'date-picker__day--in-range': this.isInRange(day),
                    'date-picker__day--range-start': this.isRangeStart(day),
                    'date-picker__day--range-end': this.isRangeEnd(day),
                  }}
                  part="day"
                  type="button"
                  disabled={this.isDayDisabled(day)}
                  tabindex={this.focusedDay === day ? 0 : -1}
                  aria-label={`${day} ${this.getMonthName()} ${this.viewYear}`}
                  aria-selected={this.isSelected(day) ? 'true' : undefined}
                  key={`day-${day}`}
                  onClick={() => this.selectDay(day)}
                >
                  {day}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-date-picker': true,
          'ts-date-picker--open': this.isOpen,
          'ts-date-picker--error': this.error,
          [`ts-date-picker--${this.size}`]: true,
        }}
      >
        {this.label && (
          <label class="date-picker__label" part="label" htmlFor={this.pickerId}>
            {this.label}
          </label>
        )}

        <input
          ref={(el) => (this.triggerEl = el)}
          class="date-picker__trigger"
          part="trigger"
          type="text"
          id={this.pickerId}
          name={this.name}
          value={this.range && this.value && this.valueEnd ? `${this.value} — ${this.valueEnd}` : this.value || ''}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly
          aria-haspopup="dialog"
          aria-expanded={this.isOpen ? 'true' : 'false'}
          aria-invalid={this.error ? 'true' : undefined}
          onClick={this.toggleCalendar}
          onKeyDown={this.handleTriggerKeydown}
        />

        {this.isOpen && this.renderCalendar()}

        {this.error && this.errorMessage && (
          <span class="date-picker__error" part="error" role="alert">
            {this.errorMessage}
          </span>
        )}
      </Host>
    );
  }
}
