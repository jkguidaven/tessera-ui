import { newSpecPage } from '@stencil/core/testing';
import { TsTimePicker } from './time-picker';

describe('ts-time-picker', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker></ts-time-picker>',
    });

    const wrapper = page.root?.shadowRoot?.querySelector('.time-picker__wrapper');
    expect(wrapper).not.toBeNull();

    const segments = page.root?.shadowRoot?.querySelectorAll('.time-picker__segment');
    expect(segments?.length).toBe(2); // hours + minutes
  });

  it('parses value prop correctly', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker value="14:30"></ts-time-picker>',
    });

    const segments = page.root?.shadowRoot?.querySelectorAll('.time-picker__segment');
    expect(segments?.[0]?.getAttribute('value')).toBe('14');
    expect(segments?.[1]?.getAttribute('value')).toBe('30');
  });

  it('shows AM/PM toggle in 12-hour format', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker format="12" value="14:00"></ts-time-picker>',
    });

    const periodBtn = page.root?.shadowRoot?.querySelector('.time-picker__period');
    expect(periodBtn).not.toBeNull();
    expect(periodBtn?.textContent).toBe('PM');
  });

  it('does not show AM/PM toggle in 24-hour format', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker format="24"></ts-time-picker>',
    });

    const periodBtn = page.root?.shadowRoot?.querySelector('.time-picker__period');
    expect(periodBtn).toBeNull();
  });

  it('shows seconds segment when showSeconds is true', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker show-seconds value="10:30:45"></ts-time-picker>',
    });

    const segments = page.root?.shadowRoot?.querySelectorAll('.time-picker__segment');
    expect(segments?.length).toBe(3);
    expect(segments?.[2]?.getAttribute('value')).toBe('45');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker disabled></ts-time-picker>',
    });

    const wrapper = page.root?.shadowRoot?.querySelector('.time-picker__wrapper');
    expect(wrapper?.classList.contains('time-picker__wrapper--disabled')).toBe(true);

    const segments = page.root?.shadowRoot?.querySelectorAll('.time-picker__segment');
    segments?.forEach(segment => {
      expect(segment.hasAttribute('disabled')).toBe(true);
    });
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker label="Start Time"></ts-time-picker>',
    });

    const label = page.root?.shadowRoot?.querySelector('.time-picker__label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('Start Time');
  });

  it('renders error message', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker error="Invalid time"></ts-time-picker>',
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.time-picker__error');
    expect(errorEl).not.toBeNull();
    expect(errorEl?.textContent).toBe('Invalid time');
  });

  it('renders help text', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker help-text="Select a meeting time"></ts-time-picker>',
    });

    const helpEl = page.root?.shadowRoot?.querySelector('.time-picker__help');
    expect(helpEl).not.toBeNull();
    expect(helpEl?.textContent).toBe('Select a meeting time');
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [TsTimePicker],
      html: '<ts-time-picker label="Time" required></ts-time-picker>',
    });

    const required = page.root?.shadowRoot?.querySelector('.time-picker__required');
    expect(required).not.toBeNull();
  });
});
