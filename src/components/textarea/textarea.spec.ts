import { newSpecPage } from '@stencil/core/testing';
import { TsTextarea } from './textarea';

describe('ts-textarea', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea></ts-textarea>',
    });

    const textarea = page.root?.shadowRoot?.querySelector('textarea');
    expect(textarea).not.toBeNull();
    expect(textarea?.getAttribute('rows')).toBe('3');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea label="Description"></ts-textarea>',
    });

    const label = page.root?.shadowRoot?.querySelector('.textarea__label');
    expect(label?.textContent).toContain('Description');
  });

  it('renders required indicator with label', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea label="Bio" required></ts-textarea>',
    });

    const required = page.root?.shadowRoot?.querySelector('.textarea__required');
    expect(required).not.toBeNull();
  });

  it('renders help text', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea help-text="Enter a description"></ts-textarea>',
    });

    const helpEl = page.root?.shadowRoot?.querySelector('.textarea__help');
    expect(helpEl?.textContent).toContain('Enter a description');
  });

  it('renders error message and hides help text', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea error error-message="Required" help-text="Help"></ts-textarea>',
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.textarea__error');
    expect(errorEl?.textContent).toContain('Required');

    const helpEl = page.root?.shadowRoot?.querySelector('.textarea__help');
    expect(helpEl).toBeNull();
  });

  it('sets aria-invalid when in error state', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea error error-message="Error"></ts-textarea>',
    });

    const textarea = page.root?.shadowRoot?.querySelector('textarea');
    expect(textarea?.getAttribute('aria-invalid')).toBe('true');
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea size="lg"></ts-textarea>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea disabled></ts-textarea>',
    });

    const textarea = page.root?.shadowRoot?.querySelector('textarea');
    expect(textarea?.hasAttribute('disabled')).toBe(true);
  });

  it('renders readonly state', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea readonly></ts-textarea>',
    });

    const textarea = page.root?.shadowRoot?.querySelector('textarea');
    expect(textarea?.hasAttribute('readOnly')).toBe(true);
  });

  it('emits tsInput on input', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea></ts-textarea>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsInput', spy);

    const textarea = page.root?.shadowRoot?.querySelector('textarea');
    textarea!.value = 'hello';
    textarea?.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders character counter when showCount and maxlength are set', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea show-count maxlength="500" value="hello"></ts-textarea>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.textarea__counter');
    expect(counter).not.toBeNull();
    expect(counter?.textContent).toBe('5/500');
  });

  it('hides counter when showCount is false', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea maxlength="500" value="hello"></ts-textarea>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.textarea__counter');
    expect(counter).toBeNull();
  });

  it('applies warning color on counter near limit', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea show-count maxlength="20" value="1234567890123456789"></ts-textarea>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.textarea__counter');
    expect(counter?.classList.contains('textarea__counter--warning')).toBe(true);
  });

  it('applies danger color on counter at limit', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea show-count maxlength="5" value="12345"></ts-textarea>',
    });

    const counter = page.root?.shadowRoot?.querySelector('.textarea__counter');
    expect(counter?.classList.contains('textarea__counter--danger')).toBe(true);
  });

  it('applies auto-grow class when autoGrow is true', async () => {
    const page = await newSpecPage({
      components: [TsTextarea],
      html: '<ts-textarea auto-grow></ts-textarea>',
    });

    expect(page.root).toHaveClass('ts-textarea--auto-grow');
  });
});
