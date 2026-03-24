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
});
