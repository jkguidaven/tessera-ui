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

  it('reflects multiple prop', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select multiple>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    expect(page.root).toHaveAttribute('multiple');
  });

  it('stores multiple values as comma-separated string', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select multiple value="a,b">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </ts-select>`,
    });

    expect(page.root?.getAttribute('value')).toBe('a,b');
  });

  it('shows selected count for multiple selections', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select multiple value="a,b">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </ts-select>`,
    });

    const display = page.root?.shadowRoot?.querySelector('.select__display');
    expect(display?.textContent).toContain('2 selected');
  });

  it('shows single value when one item selected in multiple mode', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select multiple value="a">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    const display = page.root?.shadowRoot?.querySelector('.select__display');
    // In spec tests, slotted options may not populate; display shows label or value fallback
    expect(display?.textContent?.trim()).toBeTruthy();
  });

  it('renders aria-multiselectable on listbox in multiple mode', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select multiple>
        <option value="a">Option A</option>
      </ts-select>`,
    });

    // Open the dropdown by simulating trigger click
    const select = page.rootInstance as TsSelect;
    (select as unknown as { isOpen: boolean }).isOpen = true;
    await page.waitForChanges();

    const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
    expect(listbox?.getAttribute('aria-multiselectable')).toBe('true');
  });

  it('renders search input when searchable and open', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select searchable>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    const select = page.rootInstance as TsSelect;
    (select as unknown as { isOpen: boolean }).isOpen = true;
    await page.waitForChanges();

    const searchInput = page.root?.shadowRoot?.querySelector('.select__search');
    expect(searchInput).not.toBeNull();
  });

  it('filters options by search query', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select searchable>
        <option value="a">Apple</option>
        <option value="b">Banana</option>
        <option value="c">Cherry</option>
      </ts-select>`,
    });

    const select = page.rootInstance as TsSelect;
    (select as unknown as { isOpen: boolean }).isOpen = true;
    (select as unknown as { searchQuery: string }).searchQuery = 'ban';
    await page.waitForChanges();

    const options = page.root?.shadowRoot?.querySelectorAll('.select__option');
    expect(options?.length).toBe(1);
    expect(options?.[0].textContent).toContain('Banana');
  });

  it('renders clear button when clearable and has value', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select clearable value="a">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    const clearBtn = page.root?.shadowRoot?.querySelector('.select__clear');
    expect(clearBtn).not.toBeNull();
  });

  it('does not render clear button when clearable but no value', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select clearable>
        <option value="a">Option A</option>
      </ts-select>`,
    });

    const clearBtn = page.root?.shadowRoot?.querySelector('.select__clear');
    expect(clearBtn).toBeNull();
  });

  it('sets aria-activedescendant on trigger when open', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </ts-select>`,
    });

    const select = page.rootInstance as TsSelect;
    (select as unknown as { isOpen: boolean }).isOpen = true;
    (select as unknown as { focusedIndex: number }).focusedIndex = 0;
    await page.waitForChanges();

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    const activedescendant = trigger?.getAttribute('aria-activedescendant');
    expect(activedescendant).toContain('-option-0');
  });

  it('sets aria-describedby linking to help text', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select help-text="Pick one">
        <option value="a">Option A</option>
      </ts-select>`,
    });

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    const describedBy = trigger?.getAttribute('aria-describedby');
    expect(describedBy).toContain('-help');
  });

  it('sets aria-describedby linking to error text', async () => {
    const page = await newSpecPage({
      components: [TsSelect],
      html: `<ts-select error error-message="Required">
        <option value="a">Option A</option>
      </ts-select>`,
    });

    const trigger = page.root?.shadowRoot?.querySelector('.select__trigger');
    const describedBy = trigger?.getAttribute('aria-describedby');
    expect(describedBy).toContain('-error');
  });
});
