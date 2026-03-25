import { newSpecPage } from '@stencil/core/testing';
import { TsCombobox } from './combobox';

describe('ts-combobox', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-combobox>`,
    });

    const input = page.root?.shadowRoot?.querySelector('.combobox__input');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('role')).toBe('combobox');
    expect(input?.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox label="Search country">
        <option value="us">United States</option>
      </ts-combobox>`,
    });

    const label = page.root?.shadowRoot?.querySelector('.combobox__label');
    expect(label?.textContent).toContain('Search country');
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox label="Country" required>
        <option value="us">United States</option>
      </ts-combobox>`,
    });

    const required = page.root?.shadowRoot?.querySelector('.combobox__required');
    expect(required).not.toBeNull();
  });

  it('filters options based on input value', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </ts-combobox>`,
    });

    const combobox = page.rootInstance as TsCombobox;
    (combobox as unknown as { inputValue: string }).inputValue = 'United';
    (combobox as unknown as { isOpen: boolean }).isOpen = true;
    await page.waitForChanges();

    const options = page.root?.shadowRoot?.querySelectorAll('.combobox__option');
    expect(options?.length).toBe(2);
  });

  it('selects an option and updates value', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </ts-combobox>`,
    });

    const combobox = page.rootInstance as TsCombobox;
    // Directly invoke selectOption via the internal method
    (combobox as unknown as { selectOption: (o: { value: string; label: string; disabled: boolean }) => void }).selectOption({ value: 'us', label: 'United States', disabled: false });
    await page.waitForChanges();

    expect(page.root?.value).toBe('us');
  });

  it('shows placeholder text', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox placeholder="Type to search">
        <option value="a">A</option>
      </ts-combobox>`,
    });

    const input = page.root?.shadowRoot?.querySelector('.combobox__input');
    expect(input?.getAttribute('placeholder')).toBe('Type to search');
  });

  it('has disabled state with correct attributes', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox disabled>
        <option value="a">A</option>
      </ts-combobox>`,
    });

    const input = page.root?.shadowRoot?.querySelector('.combobox__input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('renders error message', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox error="Please select a country">
        <option value="us">United States</option>
      </ts-combobox>`,
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.combobox__error');
    expect(errorEl?.textContent).toContain('Please select a country');
  });

  it('renders help text when no error', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox help-text="Start typing to search">
        <option value="a">A</option>
      </ts-combobox>`,
    });

    const helpEl = page.root?.shadowRoot?.querySelector('.combobox__help');
    expect(helpEl?.textContent).toContain('Start typing to search');
  });

  it('has correct aria attributes on input', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox label="Country" required>
        <option value="us">United States</option>
      </ts-combobox>`,
    });

    const input = page.root?.shadowRoot?.querySelector('.combobox__input');
    expect(input?.getAttribute('role')).toBe('combobox');
    expect(input?.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input?.getAttribute('aria-autocomplete')).toBe('list');
    expect(input?.getAttribute('aria-required')).toBe('true');
  });

  it('renders listbox when open', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox>
        <option value="a">Option A</option>
      </ts-combobox>`,
    });

    const combobox = page.rootInstance as TsCombobox;
    (combobox as unknown as { isOpen: boolean }).isOpen = true;
    await page.waitForChanges();

    const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
  });

  it('reflects size prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox size="lg">
        <option value="a">A</option>
      </ts-combobox>`,
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('marks focused option with aria-activedescendant', async () => {
    const page = await newSpecPage({
      components: [TsCombobox],
      html: `<ts-combobox>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-combobox>`,
    });

    const combobox = page.rootInstance as TsCombobox;
    (combobox as unknown as { isOpen: boolean }).isOpen = true;
    (combobox as unknown as { focusedIndex: number }).focusedIndex = 1;
    await page.waitForChanges();

    const input = page.root?.shadowRoot?.querySelector('.combobox__input');
    expect(input?.getAttribute('aria-activedescendant')).toBeTruthy();
  });
});
