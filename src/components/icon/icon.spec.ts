import { newSpecPage } from '@stencil/core/testing';
import { TsIcon } from './icon';

describe('ts-icon', () => {
  it('renders with default slot (inline SVG)', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20z"/></svg></ts-icon>',
    });

    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('renders with src prop (img element)', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon src="/icons/check.svg"></ts-icon>',
    });

    const img = page.root?.shadowRoot?.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('/icons/check.svg');
  });

  it('sets aria-hidden="true" when no label is provided', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon><svg></svg></ts-icon>',
    });

    expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    expect(page.root?.getAttribute('role')).toBeNull();
  });

  it('sets role="img" and aria-label when label is provided', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon label="Checkmark"><svg></svg></ts-icon>',
    });

    expect(page.root?.getAttribute('role')).toBe('img');
    expect(page.root?.getAttribute('aria-label')).toBe('Checkmark');
    expect(page.root?.getAttribute('aria-hidden')).toBeNull();
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon size="lg"><svg></svg></ts-icon>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('applies size variant classes', async () => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      const page = await newSpecPage({
        components: [TsIcon],
        html: `<ts-icon size="${size}"><svg></svg></ts-icon>`,
      });

      expect(page.root).toHaveClass(`ts-icon--${size}`);
    }
  });

  it('applies custom color via style', async () => {
    const page = await newSpecPage({
      components: [TsIcon],
      html: '<ts-icon color="red"><svg></svg></ts-icon>',
    });

    expect(page.root?.getAttribute('color')).toBe('red');
    expect(page.root?.style.getPropertyValue('--ts-icon-color')).toBe('red');
  });
});
