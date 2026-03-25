import { Component, Prop, h, Host, Element, Listen } from '@stencil/core';

/**
 * @slot - Default slot for ts-tree-item children.
 *
 * @part base - The tree container.
 */
@Component({
  tag: 'ts-tree',
  styleUrl: 'tree.css',
  shadow: true,
})
export class TsTree {
  @Element() hostEl!: HTMLElement;

  /** Enable item selection mode. */
  @Prop({ reflect: true }) selectable = false;

  /** Allow multiple items to be selected simultaneously. */
  @Prop({ reflect: true }) multiSelect = false;

  @Listen('tsSelect')
  handleItemSelect(event: CustomEvent<{ selected: boolean; value: string }>): void {
    if (!this.multiSelect && event.detail.selected) {
      const target = event.target as HTMLElement;
      const allItems = Array.from(this.hostEl.querySelectorAll('ts-tree-item')) as HTMLTsTreeItemElement[];
      allItems.forEach(item => {
        if (item !== target && item.selected) {
          item.selected = false;
        }
      });
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    const items = this.getVisibleItems();
    if (items.length === 0) return;

    const focused = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(focused);
    if (currentIndex === -1) return;

    const currentItem = items[currentIndex] as HTMLTsTreeItemElement;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < items.length - 1) {
          items[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentItem && !currentItem.expanded) {
          currentItem.expanded = true;
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentItem && currentItem.expanded) {
          currentItem.expanded = false;
        }
        break;
      case 'Home':
        event.preventDefault();
        items[0].focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1].focus();
        break;
    }
  }

  private getVisibleItems(): HTMLElement[] {
    const allItems = Array.from(this.hostEl.querySelectorAll('ts-tree-item'));
    return allItems.filter(item => {
      let parent = item.parentElement;
      while (parent && parent !== this.hostEl) {
        if (parent.tagName === 'TS-TREE-ITEM' && !(parent as HTMLTsTreeItemElement).expanded) {
          return false;
        }
        parent = parent.parentElement;
      }
      return true;
    }) as HTMLElement[];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{ 'ts-tree': true }}
        role="tree"
      >
        <div class="tree__base" part="base">
          <slot />
        </div>
      </Host>
    );
  }
}

interface HTMLTsTreeItemElement extends HTMLElement {
  expanded: boolean;
  selected: boolean;
}
