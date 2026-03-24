import { newSpecPage } from '@stencil/core/testing';
import { TsRow } from './row';

describe('ts-row', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row></ts-row>',
    });

    expect(page.root).not.toBeNull();
  });

  it('applies default gap style', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row></ts-row>',
    });

    expect(page.root?.style.gap).toBe('var(--ts-spacing-2)');
  });

  it('applies custom gap style', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row gap="5"></ts-row>',
    });

    expect(page.root?.style.gap).toBe('var(--ts-spacing-5)');
  });

  it('applies default align-items center', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row></ts-row>',
    });

    expect(page.root?.style.alignItems).toBe('center');
  });

  it('applies align baseline', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row align="baseline"></ts-row>',
    });

    expect(page.root?.style.alignItems).toBe('baseline');
  });

  it('applies default justify-content flex-start', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row></ts-row>',
    });

    expect(page.root?.style.justifyContent).toBe('flex-start');
  });

  it('applies justify between as space-between', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row justify="between"></ts-row>',
    });

    expect(page.root?.style.justifyContent).toBe('space-between');
  });

  it('applies wrap by default', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row></ts-row>',
    });

    expect(page.root?.style.flexWrap).toBe('wrap');
  });

  it('applies nowrap when wrap is false', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row wrap="false"></ts-row>',
    });

    expect(page.root?.style.flexWrap).toBe('nowrap');
  });

  it('reflects reverse prop', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row reverse></ts-row>',
    });

    expect(page.root?.getAttribute('reverse')).not.toBeNull();
  });

  it('reflects stack-at prop', async () => {
    const page = await newSpecPage({
      components: [TsRow],
      html: '<ts-row stack-at="md"></ts-row>',
    });

    expect(page.root?.getAttribute('stack-at')).toBe('md');
  });
});
