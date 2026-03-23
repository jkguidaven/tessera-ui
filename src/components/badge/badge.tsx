import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize, TsVariant } from '../../types';

/**
 * @slot - Default slot for badge content.
 *
 * @part base - The badge element.
 */
@Component({
  tag: 'ts-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class TsBadge {
  /** The badge's color variant. */
  @Prop({ reflect: true }) variant: TsVariant = 'primary';

  /** The badge's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Renders the badge with rounded-pill shape. */
  @Prop({ reflect: true }) pill = false;

  /** Renders the badge as a small dot indicator (content is hidden). */
  @Prop({ reflect: true }) dot = false;

  /** Renders an outlined style instead of solid. */
  @Prop({ reflect: true }) outline = false;

  render() {
    return (
      <Host
        class={{
          'ts-badge': true,
          [`ts-badge--${this.variant}`]: true,
          [`ts-badge--${this.size}`]: true,
          'ts-badge--pill': this.pill,
          'ts-badge--dot': this.dot,
          'ts-badge--outline': this.outline,
        }}
      >
        <span class="badge__base" part="base">
          {!this.dot && <slot />}
        </span>
      </Host>
    );
  }
}
