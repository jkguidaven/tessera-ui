import { newSpecPage } from '@stencil/core/testing';
import { TsIcon } from './icon';
import { registerIcon, registerIcons } from './icon-registry';

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

  describe('built-in Lucide icons', () => {
    it('renders a Lucide icon by kebab-case name', async () => {
      const page = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="search"></ts-icon>',
      });

      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.innerHTML).toContain('<svg');
      expect(span?.innerHTML).toContain('circle');
    });

    it('renders a Lucide icon by PascalCase name', async () => {
      const page = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="ArrowLeft"></ts-icon>',
      });

      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.innerHTML).toContain('<svg');
    });
  });

  describe('data-icons="none" opt-out', () => {
    it('skips Lucide lookup when ancestor has data-icons="none"', async () => {
      const page = await newSpecPage({
        components: [TsIcon],
        html: '<div data-icons="none"><ts-icon name="search"></ts-icon></div>',
      });

      // Should fall through to slot since Lucide is disabled and "search" is not in registry
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).toBeNull();
    });

    it('still resolves registry icons when data-icons="none"', async () => {
      registerIcon('test-opt-out', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24"/></svg>');

      const page = await newSpecPage({
        components: [TsIcon],
        html: '<div data-icons="none"><ts-icon name="test-opt-out"></ts-icon></div>',
      });

      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.innerHTML).toContain('<svg');
    });
  });

  describe('icon registry', () => {
    const testSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';

    it('renders SVG from registry when name matches a registered icon', async () => {
      registerIcon('test-circle', testSvg);

      const page = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="test-circle"></ts-icon>',
      });

      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.innerHTML).toContain('<svg');
      expect(span?.innerHTML).toContain('circle');
    });

    it('renders slot fallback when name is not in registry or Lucide', async () => {
      const page = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="nonexistent-zzzz"><svg></svg></ts-icon>',
      });

      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
    });

    it('prefers src over name when both are set', async () => {
      registerIcon('test-src-priority', testSvg);

      const page = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="test-src-priority" src="/icons/check.svg"></ts-icon>',
      });

      const img = page.root?.shadowRoot?.querySelector('img');
      expect(img).not.toBeNull();
      expect(img?.getAttribute('src')).toBe('/icons/check.svg');
    });

    it('supports registering multiple icons at once', async () => {
      registerIcons({
        'test-star': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>',
        'test-heart': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21C12 21 3 13 3 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 5-9 13-9 13z"/></svg>',
      });

      const page1 = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="test-star"></ts-icon>',
      });
      const span1 = page1.root?.shadowRoot?.querySelector('span');
      expect(span1).not.toBeNull();
      expect(span1?.innerHTML).toContain('<svg');
      expect(span1?.innerHTML).toContain('M12 2l3 7h7');

      const page2 = await newSpecPage({
        components: [TsIcon],
        html: '<ts-icon name="test-heart"></ts-icon>',
      });
      const span2 = page2.root?.shadowRoot?.querySelector('span');
      expect(span2).not.toBeNull();
      expect(span2?.innerHTML).toContain('<svg');
      expect(span2?.innerHTML).toContain('M12 21C12 21');
    });
  });
});
