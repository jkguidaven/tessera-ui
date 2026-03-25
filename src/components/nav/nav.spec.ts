import { newSpecPage } from '@stencil/core/testing';
import { TsNav } from './nav';
import { TsNavItem } from './nav-item';

describe('ts-nav', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav></ts-nav>',
    });

    const nav = page.root?.shadowRoot?.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav?.getAttribute('aria-label')).toBe('Navigation');
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav variant="horizontal"></ts-nav>',
    });

    expect(page.root?.getAttribute('variant')).toBe('horizontal');
  });

  it('reflects collapsed prop', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav collapsed></ts-nav>',
    });

    expect(page.root).toHaveAttribute('collapsed');
  });

  it('renders list element', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav></ts-nav>',
    });

    const list = page.root?.shadowRoot?.querySelector('ul');
    expect(list).not.toBeNull();
    expect(list?.getAttribute('role')).toBe('list');
  });

  it('uses custom label prop for aria-label', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav label="Main menu"></ts-nav>',
    });

    const nav = page.root?.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Main menu');
  });

  it('applies sidebar variant class', async () => {
    const page = await newSpecPage({
      components: [TsNav],
      html: '<ts-nav variant="sidebar"></ts-nav>',
    });

    expect(page.root?.classList.contains('ts-nav--sidebar')).toBe(true);
  });
});

describe('ts-nav-item', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item>Home</ts-nav-item>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('renders as anchor when href is provided', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item href="/home">Home</ts-nav-item>',
    });

    const anchor = page.root?.shadowRoot?.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('/home');
  });

  it('sets aria-current when active', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item active>Home</ts-nav-item>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-current')).toBe('page');
  });

  it('sets aria-disabled when disabled', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item disabled>Home</ts-nav-item>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits tsSelect on click', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item>Home</ts-nav-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSelect', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does NOT emit tsSelect when disabled', async () => {
    const page = await newSpecPage({
      components: [TsNavItem],
      html: '<ts-nav-item disabled>Home</ts-nav-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsSelect', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(spy).not.toHaveBeenCalled();
  });
});
