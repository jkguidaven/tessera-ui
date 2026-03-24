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
});
