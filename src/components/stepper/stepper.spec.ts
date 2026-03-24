import { newSpecPage } from '@stencil/core/testing';
import { TsStepper } from './stepper';
import { TsStep } from './step';

describe('ts-stepper', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsStepper],
      html: '<ts-stepper></ts-stepper>',
    });

    const container = page.root?.shadowRoot?.querySelector('.stepper__container');
    expect(container).not.toBeNull();
    expect(container?.getAttribute('role')).toBe('list');
  });

  it('reflects orientation prop', async () => {
    const page = await newSpecPage({
      components: [TsStepper],
      html: '<ts-stepper orientation="vertical"></ts-stepper>',
    });

    expect(page.root?.getAttribute('orientation')).toBe('vertical');
    expect(page.root?.classList.contains('ts-stepper--vertical')).toBe(true);
  });

  it('reflects activeStep prop', async () => {
    const page = await newSpecPage({
      components: [TsStepper],
      html: '<ts-stepper active-step="2"></ts-stepper>',
    });

    expect(page.root?.getAttribute('active-step')).toBe('2');
  });

  it('applies horizontal class by default', async () => {
    const page = await newSpecPage({
      components: [TsStepper],
      html: '<ts-stepper></ts-stepper>',
    });

    expect(page.root?.classList.contains('ts-stepper--horizontal')).toBe(true);
  });

  it('renders slot for steps', async () => {
    const page = await newSpecPage({
      components: [TsStepper],
      html: '<ts-stepper><div>Step content</div></ts-stepper>',
    });

    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).not.toBeNull();
  });
});

describe('ts-step', () => {
  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Step 1"></ts-step>',
    });

    const label = page.root?.shadowRoot?.querySelector('.step__label');
    expect(label?.textContent).toBe('Step 1');
  });

  it('renders description', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Step 1" description="First step"></ts-step>',
    });

    const desc = page.root?.shadowRoot?.querySelector('.step__description');
    expect(desc?.textContent).toBe('First step');
  });

  it('shows checkmark when completed', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Done" completed></ts-step>',
    });

    const indicator = page.root?.shadowRoot?.querySelector('.step__indicator--completed');
    expect(indicator).not.toBeNull();
    const svg = indicator?.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('shows X when error', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Error" error></ts-step>',
    });

    const indicator = page.root?.shadowRoot?.querySelector('.step__indicator--error');
    expect(indicator).not.toBeNull();
  });

  it('sets aria-disabled when disabled', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Disabled" disabled></ts-step>',
    });

    expect(page.root?.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets role="listitem"', async () => {
    const page = await newSpecPage({
      components: [TsStep],
      html: '<ts-step label="Step"></ts-step>',
    });

    expect(page.root?.getAttribute('role')).toBe('listitem');
  });
});
