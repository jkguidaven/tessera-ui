import { newSpecPage } from '@stencil/core/testing';
import { TsSlider } from './slider';

describe('ts-slider', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider></ts-slider>',
    });

    expect(page.root).not.toBeNull();
    const thumb = page.root?.shadowRoot?.querySelector('[role="slider"]');
    expect(thumb).not.toBeNull();
  });

  it('sets ARIA attributes correctly', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider value="50" min="0" max="100" label="Volume"></ts-slider>',
    });

    const thumb = page.root?.shadowRoot?.querySelector('[role="slider"]');
    expect(thumb?.getAttribute('aria-valuenow')).toBe('50');
    expect(thumb?.getAttribute('aria-valuemin')).toBe('0');
    expect(thumb?.getAttribute('aria-valuemax')).toBe('100');
    expect(thumb?.getAttribute('aria-label')).toBe('Volume');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider label="Brightness"></ts-slider>',
    });

    const label = page.root?.shadowRoot?.querySelector('.slider__label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Brightness');
  });

  it('shows value when showValue is true', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider value="42" show-value></ts-slider>',
    });

    const value = page.root?.shadowRoot?.querySelector('.slider__value');
    expect(value).not.toBeNull();
    expect(value?.textContent).toBe('42');
  });

  it('does not show value by default', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider value="42"></ts-slider>',
    });

    const value = page.root?.shadowRoot?.querySelector('.slider__value');
    expect(value).toBeNull();
  });

  it('sets disabled state', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider disabled></ts-slider>',
    });

    const thumb = page.root?.shadowRoot?.querySelector('[role="slider"]');
    expect(thumb?.getAttribute('aria-disabled')).toBe('true');
    expect(thumb?.getAttribute('tabindex')).toBe('-1');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider size="lg"></ts-slider>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('calculates fill percentage from value', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider value="75" min="0" max="100"></ts-slider>',
    });

    const fill = page.root?.shadowRoot?.querySelector('.slider__fill') as HTMLElement;
    expect(fill?.style.width).toBe('75%');
  });

  it('positions thumb at correct percentage', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider value="50" min="0" max="100"></ts-slider>',
    });

    const thumb = page.root?.shadowRoot?.querySelector('.slider__thumb') as HTMLElement;
    expect(thumb?.style.insetInlineStart).toBe('50%');
  });

  it('renders two thumbs in range mode', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider range value-low="20" value-high="80" min="0" max="100"></ts-slider>',
    });

    const thumbs = page.root?.shadowRoot?.querySelectorAll('[role="slider"]');
    expect(thumbs?.length).toBe(2);
  });

  it('sets ARIA attributes on range thumbs', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider range value-low="25" value-high="75" min="0" max="100" label="Price"></ts-slider>',
    });

    const thumbLow = page.root?.shadowRoot?.querySelector('.slider__thumb--low');
    expect(thumbLow?.getAttribute('aria-valuenow')).toBe('25');
    expect(thumbLow?.getAttribute('aria-label')).toBe('Price minimum');

    const thumbHigh = page.root?.shadowRoot?.querySelector('.slider__thumb--high');
    expect(thumbHigh?.getAttribute('aria-valuenow')).toBe('75');
    expect(thumbHigh?.getAttribute('aria-label')).toBe('Price maximum');
  });

  it('renders fill between thumbs in range mode', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider range value-low="20" value-high="80" min="0" max="100"></ts-slider>',
    });

    const fill = page.root?.shadowRoot?.querySelector('.slider__fill') as HTMLElement;
    expect(fill?.style.insetInlineStart).toBe('20%');
    expect(fill?.style.width).toBe('60%');
  });

  it('renders marks at correct positions', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: `<ts-slider marks='[{"value":0,"label":"0%"},{"value":50,"label":"50%"},{"value":100,"label":"100%"}]'></ts-slider>`,
    });

    const marks = page.root?.shadowRoot?.querySelectorAll('.slider__mark');
    expect(marks?.length).toBe(3);

    const labels = page.root?.shadowRoot?.querySelectorAll('.slider__mark-label');
    expect(labels?.length).toBe(3);
    expect(labels?.[1]?.textContent).toBe('50%');
  });

  it('applies vertical class', async () => {
    const page = await newSpecPage({
      components: [TsSlider],
      html: '<ts-slider orientation="vertical"></ts-slider>',
    });

    expect(page.root).toHaveClass('ts-slider--vertical');
  });
});
