import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for card body content.
 * @slot header - Card header content.
 * @slot footer - Card footer content.
 * @slot media - Media content (image, video) displayed at the top.
 *
 * @part base - The card container.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 * @part media - The media wrapper.
 */
@Component({
  tag: 'ts-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class TsCard {
  /** Elevation level controlling the shadow depth. */
  @Prop({ reflect: true }) elevation: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  /** Makes the card interactive (hover effect, cursor pointer). */
  @Prop({ reflect: true }) interactive = false;

  /** Border style variant. */
  @Prop({ reflect: true }) bordered = false;

  /** Padding size for the card body. */
  @Prop({ reflect: true }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  render() {
    return (
      <Host
        class={{
          'ts-card': true,
          [`ts-card--elevation-${this.elevation}`]: true,
          [`ts-card--padding-${this.padding}`]: true,
          'ts-card--interactive': this.interactive,
          'ts-card--bordered': this.bordered,
        }}
        role={this.interactive ? 'button' : undefined}
        tabindex={this.interactive ? '0' : undefined}
      >
        <div class="card__base" part="base">
          <div class="card__media" part="media">
            <slot name="media" />
          </div>

          <div class="card__header" part="header">
            <slot name="header" />
          </div>

          <div class="card__body" part="body">
            <slot />
          </div>

          <div class="card__footer" part="footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
