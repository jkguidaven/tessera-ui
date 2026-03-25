import { newSpecPage } from '@stencil/core/testing';
import { TsTree } from './tree';
import { TsTreeItem } from './tree-item';

describe('ts-tree', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree></ts-tree>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('tree');
  });

  it('reflects selectable prop', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree selectable></ts-tree>',
    });

    expect(page.root).toHaveAttribute('selectable');
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree><div>child</div></ts-tree>',
    });

    const base = page.root?.shadowRoot?.querySelector('.tree__base');
    expect(base).not.toBeNull();
  });

  it('has tree__base container with part attribute', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree></ts-tree>',
    });

    const base = page.root?.shadowRoot?.querySelector('.tree__base');
    expect(base?.getAttribute('part')).toBe('base');
  });

  it('applies ts-tree class to host', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree></ts-tree>',
    });

    expect(page.root?.classList.contains('ts-tree')).toBe(true);
  });

  it('reflects multiSelect prop', async () => {
    const page = await newSpecPage({
      components: [TsTree],
      html: '<ts-tree multi-select></ts-tree>',
    });

    expect(page.root).toHaveAttribute('multi-select');
  });

  it('allows multiple selected items when multiSelect is true', async () => {
    const page = await newSpecPage({
      components: [TsTree, TsTreeItem],
      html: `<ts-tree selectable multi-select>
        <ts-tree-item label="Item A" selected></ts-tree-item>
        <ts-tree-item label="Item B" selected></ts-tree-item>
      </ts-tree>`,
    });
    await page.waitForChanges();

    const items = page.root?.querySelectorAll('ts-tree-item');
    expect(items?.[0]?.getAttribute('aria-selected')).toBe('true');
    expect(items?.[1]?.getAttribute('aria-selected')).toBe('true');
  });
});

describe('ts-tree-item', () => {
  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item 1"></ts-tree-item>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('treeitem');
  });

  it('reflects expanded prop', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item" expanded></ts-tree-item>',
    });

    expect(page.root).toHaveAttribute('expanded');
  });

  it('reflects disabled prop', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item" disabled></ts-tree-item>',
    });

    expect(page.root).toHaveAttribute('disabled');
    expect(page.root?.getAttribute('aria-disabled')).toBe('true');
    expect(page.root?.getAttribute('tabindex')).toBe('-1');
  });

  it('reflects selected prop', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item" selected></ts-tree-item>',
    });

    expect(page.root).toHaveAttribute('selected');
    expect(page.root?.getAttribute('aria-selected')).toBe('true');
  });

  it('renders chevron element', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item"></ts-tree-item>',
    });

    const chevron = page.root?.shadowRoot?.querySelector('.tree-item__chevron');
    expect(chevron).not.toBeNull();
  });

  it('has focusable tabindex when not disabled', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item"></ts-tree-item>',
    });

    expect(page.root?.getAttribute('tabindex')).toBe('0');
  });

  it('sets aria-level to 1 for root items', async () => {
    const page = await newSpecPage({
      components: [TsTree, TsTreeItem],
      html: `<ts-tree>
        <ts-tree-item label="Root"></ts-tree-item>
      </ts-tree>`,
    });
    await page.waitForChanges();

    const item = page.root?.querySelector('ts-tree-item');
    expect(item?.getAttribute('aria-level')).toBe('1');
  });

  it('sets aria-setsize and aria-posinset for siblings', async () => {
    const page = await newSpecPage({
      components: [TsTree, TsTreeItem],
      html: `<ts-tree>
        <ts-tree-item label="First"></ts-tree-item>
        <ts-tree-item label="Second"></ts-tree-item>
        <ts-tree-item label="Third"></ts-tree-item>
      </ts-tree>`,
    });
    await page.waitForChanges();

    const items = page.root?.querySelectorAll('ts-tree-item');
    expect(items?.[0]?.getAttribute('aria-setsize')).toBe('3');
    expect(items?.[0]?.getAttribute('aria-posinset')).toBe('1');
    expect(items?.[1]?.getAttribute('aria-posinset')).toBe('2');
    expect(items?.[2]?.getAttribute('aria-posinset')).toBe('3');
  });

  it('renders checkbox when checkbox prop is true', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item" checkbox></ts-tree-item>',
    });

    const checkbox = page.root?.shadowRoot?.querySelector('.tree-item__checkbox');
    expect(checkbox).not.toBeNull();
    expect(checkbox?.getAttribute('role')).toBe('checkbox');
  });

  it('does not render checkbox when checkbox prop is false', async () => {
    const page = await newSpecPage({
      components: [TsTreeItem],
      html: '<ts-tree-item label="Item"></ts-tree-item>',
    });

    const checkbox = page.root?.shadowRoot?.querySelector('.tree-item__checkbox');
    expect(checkbox).toBeNull();
  });

  it('sets aria-level to 2 for nested items', async () => {
    const page = await newSpecPage({
      components: [TsTree, TsTreeItem],
      html: `<ts-tree>
        <ts-tree-item label="Parent" expanded>
          <ts-tree-item label="Child"></ts-tree-item>
        </ts-tree-item>
      </ts-tree>`,
    });
    await page.waitForChanges();

    const child = page.root?.querySelector('ts-tree-item ts-tree-item');
    expect(child?.getAttribute('aria-level')).toBe('2');
  });
});
