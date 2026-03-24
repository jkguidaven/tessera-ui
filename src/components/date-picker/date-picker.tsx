import { Component, Prop, State, Event, h, Host, Element, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId } from '../../utils/aria';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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

  /** Emitted when a date is selected. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

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

  private selectDay = (day: number): void => {
    const month = String(this.viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const newValue = `${this.viewYear}-${month}-${dayStr}`;
    this.value = newValue;
    this.tsChange.emit({ value: newValue });
    this.closeCalendar();
    this.triggerEl?.focus();
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

  private getFirstDayOfWeek(): number {
    return new Date(this.viewYear, this.viewMonth, 1).getDay();
  }

  private getMonthName(): string {
    return new Date(this.viewYear, this.viewMonth).toLocaleString('default', { month: 'long' });
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

  private renderCalendar() {
    const daysInMonth = this.getDaysInMonth();
    const firstDay = this.getFirstDayOfWeek();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
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
          <button
            class="date-picker__nav-btn"
            type="button"
            aria-label="Previous month"
            onClick={this.prevMonth}
          >
            &#x2039;
          </button>
          <span class="date-picker__month-year">
            {this.getMonthName()} {this.viewYear}
          </span>
          <button
            class="date-picker__nav-btn"
            type="button"
            aria-label="Next month"
            onClick={this.nextMonth}
          >
            &#x203A;
          </button>
        </div>

        <div class="date-picker__grid" role="grid" aria-label="Calendar">
          <div class="date-picker__weekdays">
            {WEEKDAYS.map((wd) => (
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
          value={this.value || ''}
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
