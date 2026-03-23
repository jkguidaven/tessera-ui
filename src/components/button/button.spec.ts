import { newSpecPage } from '@stencil/core/testing';
import { TsButton } from './button';

describe('ts-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button>Click me</ts-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.hasAttribute('disabled')).toBe(false);
  });

  it('reflects variant prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button variant="danger">Delete</ts-button>',
    });

    expect(page.root).toHaveAttribute('variant');
    expect(page.root?.getAttribute('variant')).toBe('danger');
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button size="lg">Large</ts-button>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('renders as disabled when disabled prop is set', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button disabled>Disabled</ts-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders as an anchor when href is provided', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button href="https://example.com">Link</ts-button>',
    });

    const anchor = page.root?.shadowRoot?.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('https://example.com');
    expect(anchor?.getAttribute('role')).toBe('button');
  });

  it('adds rel="noopener noreferrer" for target="_blank"', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button href="https://example.com" target="_blank">External</ts-button>',
    });

    const anchor = page.root?.shadowRoot?.querySelector('a');
    expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('shows spinner and hides label when loading', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button loading>Loading</ts-button>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.button__spinner');
    expect(spinner).not.toBeNull();

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-busy')).toBe('true');
  });

  it('emits tsClick event on click', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button>Click</ts-button>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClick', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does NOT emit tsClick when disabled', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button disabled>Click</ts-button>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClick', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('does NOT emit tsClick when loading', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button loading>Click</ts-button>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClick', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('applies block class when block prop is set', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: '<ts-button block>Full Width</ts-button>',
    });

    expect(page.root).toHaveAttribute('block');
  });

  it('renders prefix and suffix slots', async () => {
    const page = await newSpecPage({
      components: [TsButton],
      html: `
        <ts-button>
          <span slot="prefix">→</span>
          Label
          <span slot="suffix">←</span>
        </ts-button>
      `,
    });

    const prefix = page.root?.shadowRoot?.querySelector('.button__prefix');
    const suffix = page.root?.shadowRoot?.querySelector('.button__suffix');
    expect(prefix).not.toBeNull();
    expect(suffix).not.toBeNull();
  });
});
