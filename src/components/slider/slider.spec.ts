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
});
