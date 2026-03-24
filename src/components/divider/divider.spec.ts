import { newSpecPage } from '@stencil/core/testing';
import { TsDivider } from './divider';

describe('ts-divider', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider></ts-divider>',
    });

    expect(page.root?.getAttribute('role')).toBe('separator');
    expect(page.root?.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('reflects orientation to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider orientation="vertical"></ts-divider>',
    });

    expect(page.root?.getAttribute('orientation')).toBe('vertical');
    expect(page.root?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('reflects variant to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider variant="dashed"></ts-divider>',
    });

    expect(page.root?.getAttribute('variant')).toBe('dashed');
  });

  it('renders label when set', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider label="OR"></ts-divider>',
    });

    const label = page.root?.shadowRoot?.querySelector('.divider__label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('OR');
  });

  it('renders two line segments when label is set', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider label="Section"></ts-divider>',
    });

    const startLine = page.root?.shadowRoot?.querySelector('.divider__line--start');
    const endLine = page.root?.shadowRoot?.querySelector('.divider__line--end');
    expect(startLine).not.toBeNull();
    expect(endLine).not.toBeNull();
  });

  it('does not render label element when label is not set', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider></ts-divider>',
    });

    const label = page.root?.shadowRoot?.querySelector('.divider__label');
    expect(label).toBeNull();
  });

  it('has role separator', async () => {
    const page = await newSpecPage({
      components: [TsDivider],
      html: '<ts-divider></ts-divider>',
    });

    expect(page.root?.getAttribute('role')).toBe('separator');
  });
});
