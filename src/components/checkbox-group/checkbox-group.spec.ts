import { newSpecPage } from '@stencil/core/testing';
import { TsCheckboxGroup } from './checkbox-group';

describe('ts-checkbox-group', () => {
  it('renders with role="group"', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    const group = page.root?.querySelector('[role="group"]');
    expect(group).not.toBeNull();
  });

  it('sets aria-label from label prop', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group label="Interests"><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    const group = page.root?.querySelector('[role="group"]');
    expect(group?.getAttribute('aria-label')).toBe('Interests');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group label="Options"><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    const label = page.root?.querySelector('.checkbox-group__label');
    expect(label?.textContent).toBe('Options');
  });

  it('renders vertical layout by default', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    expect(page.root).toHaveClass('ts-checkbox-group--vertical');
  });

  it('renders horizontal layout', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group orientation="horizontal"><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    expect(page.root).toHaveClass('ts-checkbox-group--horizontal');
  });

  it('displays error message', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group error="Select at least one"><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    const error = page.root?.querySelector('.checkbox-group__error');
    expect(error?.textContent).toBe('Select at least one');
  });

  it('renders disabled class', async () => {
    const page = await newSpecPage({
      components: [TsCheckboxGroup],
      html: '<ts-checkbox-group disabled><ts-checkbox value="a">A</ts-checkbox></ts-checkbox-group>',
    });

    expect(page.root).toHaveClass('ts-checkbox-group--disabled');
  });
});
