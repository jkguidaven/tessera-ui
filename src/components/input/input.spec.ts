import { newSpecPage } from '@stencil/core/testing';
import { TsInput } from './input';

describe('ts-input', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input></ts-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.type).toBe('text');
    expect(input?.disabled).toBe(false);
  });

  it('renders a label when provided', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input label="Email"></ts-input>',
    });

    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Email');
  });

  it('shows required indicator', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input label="Name" required></ts-input>',
    });

    const required = page.root?.shadowRoot?.querySelector('.input__required');
    expect(required).not.toBeNull();

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-required')).toBe('true');
  });

  it('renders placeholder', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input placeholder="Enter text..."></ts-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.placeholder).toBe('Enter text...');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input disabled></ts-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('renders error state with message', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input error="This field is required"></ts-input>',
    });

    const error = page.root?.shadowRoot?.querySelector('.input__error');
    expect(error).not.toBeNull();
    expect(error?.textContent).toBe('This field is required');

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('renders help text when no error', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input help-text="Enter your full name"></ts-input>',
    });

    const help = page.root?.shadowRoot?.querySelector('.input__help');
    expect(help).not.toBeNull();
    expect(help?.textContent).toBe('Enter your full name');
  });

  it('hides help text when error is shown', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input help-text="Helper" error="Error!"></ts-input>',
    });

    const help = page.root?.shadowRoot?.querySelector('.input__help');
    const error = page.root?.shadowRoot?.querySelector('.input__error');
    expect(help).toBeNull();
    expect(error).not.toBeNull();
  });

  it('emits tsInput on input', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input></ts-input>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsInput', spy);

    const input = page.root?.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));
    }

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('reflects the correct input type', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input type="email"></ts-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });
});
