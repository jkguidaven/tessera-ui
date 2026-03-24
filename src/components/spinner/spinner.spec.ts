import { newSpecPage } from '@stencil/core/testing';
import { TsSpinner } from './spinner';

describe('ts-spinner', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner></ts-spinner>',
    });

    const host = page.root;
    expect(host).not.toBeNull();
    expect(host?.getAttribute('role')).toBe('status');
    expect(host?.getAttribute('aria-label')).toBe('Loading');
  });

  it('renders SVG with track and indicator circles', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner></ts-spinner>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();

    const circles = page.root?.shadowRoot?.querySelectorAll('circle');
    expect(circles?.length).toBe(2);
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner size="lg"></ts-spinner>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('uses custom label for aria-label', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner label="Processing"></ts-spinner>',
    });

    expect(page.root?.getAttribute('aria-label')).toBe('Processing');
  });

  it('applies custom color to indicator', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner color="red"></ts-spinner>',
    });

    const indicator = page.root?.shadowRoot?.querySelector('.spinner__indicator');
    expect(indicator).not.toBeNull();
    expect(indicator?.getAttribute('style')).toContain('red');
  });

  it('has correct default size class', async () => {
    const page = await newSpecPage({
      components: [TsSpinner],
      html: '<ts-spinner></ts-spinner>',
    });

    expect(page.root?.getAttribute('size')).toBe('md');
  });
});
