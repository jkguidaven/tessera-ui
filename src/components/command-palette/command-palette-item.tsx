import { Component, Prop, h, Host } from '@stencil/core';

/**
 * An individual item within the command palette.
 *
 * @part base - The item container.
 * @part icon - The icon wrapper.
 * @part label - The label text.
 * @part shortcut - The keyboard shortcut text.
 */
@Component({
  tag: 'ts-command-palette-item',
  shadow: true,
})
export class TsCommandPaletteItem {
  /** The value emitted when this item is selected. */
  @Prop({ reflect: true }) value!: string;

  /** The display label for the item. */
  @Prop({ reflect: true }) label!: string;

  /** Optional group name for categorization. */
  @Prop({ reflect: true }) group?: string;

  /** Optional icon name (Lucide icon). */
  @Prop({ reflect: true }) icon?: string;

  /** Optional keyboard shortcut text (e.g., "Ctrl+S"). */
  @Prop({ reflect: true }) shortcut?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-command-palette-item': true,
        }}
        role="option"
      >
        <div class="command-palette-item__base" part="base">
          {this.icon && (
            <span class="command-palette-item__icon" part="icon">
              <ts-icon name={this.icon} size="sm"></ts-icon>
            </span>
          )}
          <span class="command-palette-item__label" part="label">
            {this.label}
          </span>
          {this.shortcut && (
            <span class="command-palette-item__shortcut" part="shortcut">
              {this.shortcut}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
