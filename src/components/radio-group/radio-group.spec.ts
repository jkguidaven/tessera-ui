import { newSpecPage } from '@stencil/core/testing';
import { TsRadioGroup } from './radio-group';

describe('ts-radio-group', () => {
  it('renders with role="radiogroup"', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    const group = page.root?.querySelector('[role="radiogroup"]');
    expect(group).not.toBeNull();
  });

  it('sets aria-label from label prop', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group label="Pick one"><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    const group = page.root?.querySelector('[role="radiogroup"]');
    expect(group?.getAttribute('aria-label')).toBe('Pick one');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group label="Options"><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    const label = page.root?.querySelector('.radio-group__label');
    expect(label?.textContent).toBe('Options');
  });

  it('renders vertical layout by default', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    expect(page.root).toHaveClass('ts-radio-group--vertical');
  });

  it('renders horizontal layout', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group orientation="horizontal"><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    expect(page.root).toHaveClass('ts-radio-group--horizontal');
  });

  it('displays error message', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group error="Please select an option"><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    const error = page.root?.querySelector('.radio-group__error');
    expect(error?.textContent).toBe('Please select an option');
  });

  it('renders disabled class', async () => {
    const page = await newSpecPage({
      components: [TsRadioGroup],
      html: '<ts-radio-group disabled><ts-radio value="a">A</ts-radio></ts-radio-group>',
    });

    expect(page.root).toHaveClass('ts-radio-group--disabled');
  });
});
