import { Component, Prop, Event, State, h, Host, Element, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for nested ts-tree-item children.
 * @slot label - Custom label content.
 *
 * @part base - The tree item container.
 * @part label - The label wrapper.
 * @part chevron - The expand/collapse chevron.
 * @part icon - The icon wrapper.
 */
@Component({
  tag: 'ts-tree-item',
  styleUrl: 'tree-item.css',
  shadow: true,
})
export class TsTreeItem {
  @Element() hostEl!: HTMLElement;

  /** The item label. */
  @Prop() label?: string;

  /** Whether the item is expanded (has children). */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  /** Whether the item is selected. */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** Whether the item is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Optional Lucide icon name. */
  @Prop() icon?: string;

  /** Whether this item has slotted children (expandable). */
  @State() hasChildren = false;

  /** Emitted when expand/collapse is toggled. */
  @Event({ eventName: 'tsToggle' }) tsToggle!: EventEmitter<{ expanded: boolean }>;

  /** Emitted when the item is selected. */
  @Event({ eventName: 'tsSelect' }) tsSelect!: EventEmitter<{ selected: boolean; value: string }>;

  @Watch('expanded')
  onExpandedChange() {
    this.tsToggle.emit({ expanded: this.expanded });
  }

  componentDidLoad() {
    this.checkForChildren();
  }

  private checkForChildren() {
    const slot = this.hostEl.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (slot) {
      const assigned = slot.assignedElements();
      this.hasChildren = assigned.some(el => el.tagName === 'TS-TREE-ITEM');
    }
  }

  private handleToggle = (event: MouseEvent): void => {
    event.stopPropagation();
    if (this.disabled) return;
    this.expanded = !this.expanded;
  };

  private handleSelect = (): void => {
    if (this.disabled) return;
    const tree = this.hostEl.closest('ts-tree');
    if (tree && (tree as any).selectable) {
      this.selected = !this.selected;
      this.tsSelect.emit({ selected: this.selected, value: this.label || '' });
    }
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelect();
    }
  };

  private handleSlotChange = (): void => {
    this.checkForChildren();
  };

  render() {
    return (
      <Host
        class={{
          'ts-tree-item': true,
          'ts-tree-item--expanded': this.expanded,
          'ts-tree-item--selected': this.selected,
          'ts-tree-item--disabled': this.disabled,
          'ts-tree-item--has-children': this.hasChildren,
        }}
        role="treeitem"
        tabindex={this.disabled ? -1 : 0}
        aria-expanded={this.hasChildren ? String(this.expanded) : undefined}
        aria-selected={String(this.selected)}
        aria-disabled={this.disabled ? 'true' : undefined}
        onKeyDown={this.handleKeyDown}
      >
        <div class="tree-item__base" part="base" onClick={this.handleSelect}>
          <span
            class={{
              'tree-item__chevron': true,
              'tree-item__chevron--hidden': !this.hasChildren,
            }}
            part="chevron"
            onClick={this.handleToggle}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>

          {this.icon && (
            <span class="tree-item__icon" part="icon" aria-hidden="true">
              <ts-icon name={this.icon} size="sm" />
            </span>
          )}

          <span class="tree-item__label" part="label">
            <slot name="label">{this.label}</slot>
          </span>
        </div>

        <div
          class={{
            'tree-item__children': true,
            'tree-item__children--collapsed': !this.expanded,
          }}
          role="group"
        >
          <slot onSlotchange={this.handleSlotChange} />
        </div>
      </Host>
    );
  }
}
