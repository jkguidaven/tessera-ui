import { newSpecPage } from '@stencil/core/testing';
import { TsForm } from './form';

describe('ts-form', () => {
  it('renders a form element', async () => {
    const page = await newSpecPage({
      components: [TsForm],
      html: '<ts-form></ts-form>',
    });

    const form = page.root?.querySelector('form');
    expect(form).not.toBeNull();
  });

  it('emits tsSubmit on form submit', async () => {
    const page = await newSpecPage({
      components: [TsForm],
      html: `
        <ts-form novalidate>
          <input name="email" value="john@example.com" />
          <button type="submit">Submit</button>
        </ts-form>
      `,
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSubmit', spy);

    const form = page.root?.querySelector('form');
    form?.dispatchEvent(new Event('submit', { cancelable: true }));

    expect(spy).toHaveBeenCalledTimes(1);
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.valid).toBe(true);
    expect(detail.values.email).toBe('john@example.com');
  });

  it('collects values from named elements', async () => {
    const page = await newSpecPage({
      components: [TsForm],
      html: `
        <ts-form novalidate>
          <input name="username" value="tessera" />
          <input name="password" value="secret123" />
        </ts-form>
      `,
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSubmit', spy);

    const form = page.root?.querySelector('form');
    form?.dispatchEvent(new Event('submit', { cancelable: true }));

    const detail = spy.mock.calls[0][0].detail;
    expect(detail.values.username).toBe('tessera');
    expect(detail.values.password).toBe('secret123');
  });
});
