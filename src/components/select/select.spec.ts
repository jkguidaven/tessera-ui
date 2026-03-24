import { newSpecPage } from '@stencil/core/testing';
import { TsSelect } from './select';

describe('ts-select', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select label="Choose one">
        <option value="a">A</option>
      </ts-select>`,
    });

    const label = page.root?.shadowRoot?.querySelector('.select__label');
    expect(label?.textContent).toContain('Choose one');
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select label="Required" required>
        <option value="a">A</option>
      </ts-select>`,
    });

    const required = page.root?.shadowRoot?.querySelector('.select__required');
    expect(required).not.toBeNull();
  });

  it('shows placeholder when no value selected', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select placeholder="Pick one">
        <option value="a">A</option>
      </ts-select>`,
    });

    const display = page.root?.shadowRoot?.querySelector('.select__display');
    expect(display?.textContent).toContain('Pick one');
  });

  it('shows combobox role on trigger', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select>
        <option value="a">Option A</option>
      </ts-select>`,
    });

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    expect(trigger?.getAttribute('role')).toBe('combobox');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select size="lg">
        <option value="a">A</option>
      </ts-select>`,
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('renders error message', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select error error-message="Required field">
        <option value="a">A</option>
      </ts-select>`,
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.select__error');
    expect(errorEl?.textContent).toContain('Required field');
  });

  it('renders help text when no error', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select help-text="Select an option">
        <option value="a">A</option>
      </ts-select>`,
    });

    const helpEl = page.root?.shadowRoot?.querySelector('.select__help');
    expect(helpEl?.textContent).toContain('Select an option');
  });

  it('has disabled state with correct attributes', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select disabled>
        <option value="a">A</option>
      </ts-select>`,
    });

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    expect(trigger?.hasAttribute('disabled')).toBe(true);
  });
});
