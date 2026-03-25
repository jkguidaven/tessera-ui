import { newSpecPage } from '@stencil/core/testing';
import { TsNumberInput } from './number-input';

describe('ts-number-input', () => {
  it('renders with default value', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input></ts-number-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('value')).toBe('0');
  });

  it('increments on button click', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input value="5"></ts-number-input>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsInput', spy);

    const incrementBtn = page.root?.shadowRoot?.querySelectorAll('button')[1];
    incrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(6);
    expect(spy).toHaveBeenCalled();
  });

  it('decrements on button click', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input value="5"></ts-number-input>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsInput', spy);

    const decrementBtn = page.root?.shadowRoot?.querySelectorAll('button')[0];
    decrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(4);
    expect(spy).toHaveBeenCalled();
  });

  it('clamps to min value', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input value="1" min="0"></ts-number-input>',
    });

    const decrementBtn = page.root?.shadowRoot?.querySelectorAll('button')[0];
    decrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(0);

    // Try going below min
    decrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(0);
  });

  it('clamps to max value', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input value="9" max="10"></ts-number-input>',
    });

    const incrementBtn = page.root?.shadowRoot?.querySelectorAll('button')[1];
    incrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(10);

    // Try going above max
    incrementBtn?.click();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(10);
  });

  it('applies precision formatting', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input value="3.5" precision="2"></ts-number-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('value')).toBe('3.50');
  });

  it('renders label', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input label="Quantity"></ts-number-input>',
    });

    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('Quantity');
  });

  it('renders error state', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input error="Value is required"></ts-number-input>',
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.number-input__error');
    expect(errorEl).not.toBeNull();
    expect(errorEl?.textContent).toBe('Value is required');

    const wrapper = page.root?.shadowRoot?.querySelector('.number-input__wrapper');
    expect(wrapper?.classList.contains('number-input__wrapper--error')).toBe(true);
  });

  it('sets disabled state', async () => {
    const page = await newSpecPage({
      components: [TsNumberInput],
      html: '<ts-number-input disabled></ts-number-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);

    const buttons = page.root?.shadowRoot?.querySelectorAll('button');
    buttons?.forEach((btn) => {
      expect(btn.hasAttribute('disabled')).toBe(true);
    });
  });
});
