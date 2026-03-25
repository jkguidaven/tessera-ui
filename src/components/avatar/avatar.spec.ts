import { newSpecPage } from '@stencil/core/testing';
import { TsAvatar } from './avatar';

describe('ts-avatar', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar></ts-avatar>',
    });

    const base = page.root?.shadowRoot?.querySelector('.avatar__base');
    expect(base).not.toBeNull();
    expect(base?.getAttribute('role')).toBe('img');
  });

  it('renders image when src is provided', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar src="https://example.com/photo.jpg" alt="User"></ts-avatar>',
    });

    const img = page.root?.shadowRoot?.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('https://example.com/photo.jpg');
    expect(img?.getAttribute('alt')).toBe('User');
  });

  it('renders initials from single-word name', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar name="Alice"></ts-avatar>',
    });

    const initials = page.root?.shadowRoot?.querySelector('.avatar__initials');
    expect(initials).not.toBeNull();
    expect(initials?.textContent).toBe('A');
  });

  it('renders initials from multi-word name', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar name="Jane Doe"></ts-avatar>',
    });

    const initials = page.root?.shadowRoot?.querySelector('.avatar__initials');
    expect(initials?.textContent).toBe('JD');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar size="lg"></ts-avatar>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar variant="square"></ts-avatar>',
    });

    expect(page.root?.getAttribute('variant')).toBe('square');
  });

  it('renders status dot when status prop is set', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar name="Alice" status="online"></ts-avatar>',
    });

    const status = page.root?.shadowRoot?.querySelector('.avatar__status');
    expect(status).not.toBeNull();
  });

  it('applies correct class for each status value', async () => {
    for (const statusValue of ['online', 'offline', 'busy', 'away']) {
      const page = await newSpecPage({
        components: [TsAvatar],
        html: `<ts-avatar name="Alice" status="${statusValue}"></ts-avatar>`,
      });

      const status = page.root?.shadowRoot?.querySelector('.avatar__status');
      expect(status).not.toBeNull();
      expect(status?.classList.contains(`avatar__status--${statusValue}`)).toBe(true);
    }
  });

  it('does not render status dot when status is not set', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar name="Alice"></ts-avatar>',
    });

    const status = page.root?.shadowRoot?.querySelector('.avatar__status');
    expect(status).toBeNull();
  });

  it('applies custom color as background', async () => {
    const page = await newSpecPage({
      components: [TsAvatar],
      html: '<ts-avatar name="Bob" color="#ff0000"></ts-avatar>',
    });

    const base = page.root?.shadowRoot?.querySelector('.avatar__base');
    expect(base?.getAttribute('style')).toContain('#ff0000');
  });
});
