import { newSpecPage } from '@stencil/core/testing';
import { TsDatePicker } from './date-picker';

describe('ts-date-picker', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker></ts-date-picker>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('placeholder')).toBe('Select date');
    expect(input?.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker label="Birth date"></ts-date-picker>',
    });

    const label = page.root?.shadowRoot?.querySelector('.date-picker__label');
    expect(label?.textContent).toBe('Birth date');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker size="lg"></ts-date-picker>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('renders in disabled state', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker disabled></ts-date-picker>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('displays value in the input', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker value="2024-06-15"></ts-date-picker>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('value')).toBe('2024-06-15');
  });

  it('shows error message when error is true', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker error error-message="Required"></ts-date-picker>',
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.date-picker__error');
    expect(errorEl?.textContent).toBe('Required');
  });

  it('sets aria-invalid when error is true', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker error></ts-date-picker>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('calendar is not shown by default', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker></ts-date-picker>',
    });

    const calendar = page.root?.shadowRoot?.querySelector('.date-picker__calendar');
    expect(calendar).toBeNull();
  });

  it('sets name attribute on input', async () => {
    const page = await newSpecPage({
      components: [TsDatePicker],
      html: '<ts-date-picker name="dob"></ts-date-picker>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('name')).toBe('dob');
  });
});
