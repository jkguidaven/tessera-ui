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

  it('emits tsInput with correct previousValue', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input value="old"></ts-input>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsInput', spy);

    const input = page.root?.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'new';
      input.dispatchEvent(new Event('input'));
    }

    expect(spy).toHaveBeenCalledTimes(1);
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.value).toBe('new');
    expect(detail.previousValue).toBe('old');
  });

  it('emits tsChange with correct previousValue after input', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input value="initial"></ts-input>',
    });

    const changeSpy = jest.fn();
    page.root?.addEventListener('tsChange', changeSpy);

    const input = page.root?.shadowRoot?.querySelector('input');
    if (input) {
      // Simulate typing (input event updates value)
      input.value = 'updated';
      input.dispatchEvent(new Event('input'));

      // Simulate blur/commit (change event)
      input.dispatchEvent(new Event('change'));
    }

    expect(changeSpy).toHaveBeenCalledTimes(1);
    const detail = changeSpy.mock.calls[0][0].detail;
    expect(detail.value).toBe('updated');
    expect(detail.previousValue).toBe('initial');
  });

  it('reflects the correct input type', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input type="email"></ts-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });

  it('renders clear button when clearable and has value', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input clearable value="hello"></ts-input>',
    });

    const clearBtn = page.root?.shadowRoot?.querySelector('.input__clear-button');
    expect(clearBtn).not.toBeNull();
  });

  it('hides clear button when value is empty', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input clearable value=""></ts-input>',
    });

    const clearBtn = page.root?.shadowRoot?.querySelector('.input__clear-button');
    expect(clearBtn).toBeNull();
  });

  it('hides clear button when disabled', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input clearable value="hello" disabled></ts-input>',
    });

    const clearBtn = page.root?.shadowRoot?.querySelector('.input__clear-button');
    expect(clearBtn).toBeNull();
  });

  it('clears value and emits events on clear button click', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input clearable value="hello"></ts-input>',
    });

    const inputSpy = jest.fn();
    const changeSpy = jest.fn();
    page.root?.addEventListener('tsInput', inputSpy);
    page.root?.addEventListener('tsChange', changeSpy);

    const clearBtn = page.root?.shadowRoot?.querySelector('.input__clear-button') as HTMLButtonElement;
    clearBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe('');
    expect(inputSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(inputSpy.mock.calls[0][0].detail.previousValue).toBe('hello');
  });

  it('renders character counter when showCount and maxlength are set', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input show-count maxlength="100" value="hello"></ts-input>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.input__counter');
    expect(counter).not.toBeNull();
    expect(counter?.textContent).toBe('5/100');
  });

  it('applies warning color near limit', async () => {
    // 19/20 = 0.95, which is > 0.9 and < 1
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input show-count maxlength="20" value="1234567890123456789"></ts-input>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.input__counter');
    expect(counter?.classList.contains('input__counter--warning')).toBe(true);
  });

  it('applies danger color at limit', async () => {
    const page = await newSpecPage({
      components: [TsInput],
      html: '<ts-input show-count maxlength="5" value="12345"></ts-input>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.input__counter');
    expect(counter?.classList.contains('input__counter--danger')).toBe(true);
  });
});
