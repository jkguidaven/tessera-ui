import { newSpecPage } from '@stencil/core/testing';
import { TsProgress } from './progress';

describe('ts-progress', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress></ts-progress>',
    });

    expect(page.root).not.toBeNull();
    const track = page.root?.shadowRoot?.querySelector('[role="progressbar"]');
    expect(track).not.toBeNull();
  });

  it('sets ARIA attributes correctly', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="50" max="100" label="Loading"></ts-progress>',
    });

    const track = page.root?.shadowRoot?.querySelector('[role="progressbar"]');
    expect(track?.getAttribute('aria-valuenow')).toBe('50');
    expect(track?.getAttribute('aria-valuemin')).toBe('0');
    expect(track?.getAttribute('aria-valuemax')).toBe('100');
    expect(track?.getAttribute('aria-label')).toBe('Loading');
  });

  it('calculates fill width from value and max', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="25" max="100"></ts-progress>',
    });

    const fill = page.root?.shadowRoot?.querySelector('.progress__fill') as HTMLElement;
    expect(fill?.style.width).toBe('25%');
  });

  it('clamps value to 0-100% range', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="150" max="100"></ts-progress>',
    });

    const fill = page.root?.shadowRoot?.querySelector('.progress__fill') as HTMLElement;
    expect(fill?.style.width).toBe('100%');
  });

  it('shows value label when showValue is true', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="75" show-value></ts-progress>',
    });

    const label = page.root?.shadowRoot?.querySelector('.progress__label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('75%');
  });

  it('does not show value label by default', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="50"></ts-progress>',
    });

    const label = page.root?.shadowRoot?.querySelector('.progress__label');
    expect(label).toBeNull();
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress variant="success"></ts-progress>',
    });

    expect(page.root?.getAttribute('variant')).toBe('success');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress size="lg"></ts-progress>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('does not set aria-valuenow when indeterminate', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress indeterminate></ts-progress>',
    });

    const track = page.root?.shadowRoot?.querySelector('[role="progressbar"]');
    expect(track?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('renders circular type with SVG', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress type="circular" value="50"></ts-progress>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 36 36');

    const trackCircle = page.root?.shadowRoot?.querySelector('.progress__circle-track');
    expect(trackCircle).not.toBeNull();

    const fillCircle = page.root?.shadowRoot?.querySelector('.progress__circle-fill');
    expect(fillCircle).not.toBeNull();
  });

  it('shows percentage text in circular when showValue is true', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress type="circular" value="75" show-value></ts-progress>',
    });

    const text = page.root?.shadowRoot?.querySelector('.progress__circle-text');
    expect(text).not.toBeNull();
    expect(text?.textContent).toBe('75%');
  });

  it('applies striped class when striped prop is set', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="50" striped></ts-progress>',
    });

    expect(page.root).toHaveClass('ts-progress--striped');
  });

  it('applies animated class when striped and animated', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="50" striped animated></ts-progress>',
    });

    expect(page.root).toHaveClass('ts-progress--striped');
    expect(page.root).toHaveClass('ts-progress--animated');
  });

  it('renders buffer fill when bufferValue is set', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="30" buffer-value="70"></ts-progress>',
    });

    const buffer = page.root?.shadowRoot?.querySelector('.progress__buffer') as HTMLElement;
    expect(buffer).not.toBeNull();
    expect(buffer?.style.width).toBe('70%');
  });

  it('does not render buffer fill when bufferValue is not set', async () => {
    const page = await newSpecPage({
      components: [TsProgress],
      html: '<ts-progress value="30"></ts-progress>',
    });

    const buffer = page.root?.shadowRoot?.querySelector('.progress__buffer');
    expect(buffer).toBeNull();
  });
});
