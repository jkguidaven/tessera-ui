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
});
