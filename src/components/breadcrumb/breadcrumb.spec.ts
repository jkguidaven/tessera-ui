import { newSpecPage } from '@stencil/core/testing';
import { TsBreadcrumb } from './breadcrumb';
import { TsBreadcrumbItem } from './breadcrumb-item';

describe('ts-breadcrumb', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: '<ts-breadcrumb></ts-breadcrumb>',
    });

    expect(page.root).not.toBeNull();
    const nav = page.root?.shadowRoot?.querySelector('nav');
    expect(nav).not.toBeNull();
  });

  it('has aria-label on nav element', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: '<ts-breadcrumb></ts-breadcrumb>',
    });

    const nav = page.root?.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('renders an ordered list', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: '<ts-breadcrumb></ts-breadcrumb>',
    });

    const ol = page.root?.shadowRoot?.querySelector('ol');
    expect(ol).not.toBeNull();
  });

  it('defaults separator to /', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: '<ts-breadcrumb></ts-breadcrumb>',
    });

    expect(page.rootInstance.separator).toBe('/');
  });

  it('accepts custom separator', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: '<ts-breadcrumb separator=">"></ts-breadcrumb>',
    });

    expect(page.rootInstance.separator).toBe('>');
  });

  it('hides middle items when maxItems is set', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumb],
      html: `
        <ts-breadcrumb max-items="3">
          <ts-breadcrumb-item>A</ts-breadcrumb-item>
          <ts-breadcrumb-item>B</ts-breadcrumb-item>
          <ts-breadcrumb-item>C</ts-breadcrumb-item>
          <ts-breadcrumb-item>D</ts-breadcrumb-item>
          <ts-breadcrumb-item>E</ts-breadcrumb-item>
        </ts-breadcrumb>
      `,
    });

    const items = page.root?.querySelectorAll('ts-breadcrumb-item');
    // First item visible, last 2 visible, middle 2 hidden
    expect(items?.[1]?.style.display).toBe('none');
    expect(items?.[2]?.style.display).toBe('none');
    expect(items?.[0]?.style.display).not.toBe('none');
    expect(items?.[4]?.style.display).not.toBe('none');
  });
});

describe('ts-breadcrumb-item', () => {
  it('renders as text when no href', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item>Home</ts-breadcrumb-item>',
    });

    const span = page.root?.shadowRoot?.querySelector('.breadcrumb-item__text');
    expect(span).not.toBeNull();

    const link = page.root?.shadowRoot?.querySelector('a');
    expect(link).toBeNull();
  });

  it('renders as link when href is set', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item href="/home">Home</ts-breadcrumb-item>',
    });

    const link = page.root?.shadowRoot?.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('/home');
  });

  it('renders as text with aria-current when current', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item current>Current</ts-breadcrumb-item>',
    });

    const span = page.root?.shadowRoot?.querySelector('.breadcrumb-item__text');
    expect(span?.getAttribute('aria-current')).toBe('page');
  });

  it('renders separator when provided', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item separator="/">Home</ts-breadcrumb-item>',
    });

    const sep = page.root?.shadowRoot?.querySelector('.breadcrumb-item__separator');
    expect(sep).not.toBeNull();
    expect(sep?.getAttribute('aria-hidden')).toBe('true');
  });

  it('does not render separator when not provided', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item>Home</ts-breadcrumb-item>',
    });

    const sep = page.root?.shadowRoot?.querySelector('.breadcrumb-item__separator');
    expect(sep).toBeNull();
  });

  it('renders as text (not link) when current even with href', async () => {
    const page = await newSpecPage({
      components: [TsBreadcrumbItem],
      html: '<ts-breadcrumb-item href="/page" current>Current</ts-breadcrumb-item>',
    });

    const link = page.root?.shadowRoot?.querySelector('a');
    expect(link).toBeNull();

    const span = page.root?.shadowRoot?.querySelector('.breadcrumb-item__text');
    expect(span).not.toBeNull();
  });
});
