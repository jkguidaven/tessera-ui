import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @slot - Default slot for inline SVG content.
 *
 * @part img - The img element (when using src prop).
 */
@Component({
  tag: 'ts-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class TsIcon {
  /** Icon name for future icon registry lookup. */
  @Prop({ reflect: true }) name?: string;

  /** URL to an external SVG icon file. */
  @Prop() src?: string;

  /** The icon's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Accessible label. When set, applies role="img" and aria-label. When absent, sets aria-hidden="true". */
  @Prop() label?: string;

  /** CSS color value applied to the icon. */
  @Prop({ reflect: true }) color: string = 'currentColor';

  render() {
    const hasLabel = !!this.label;

    return (
      <Host
        class={{
          'ts-icon': true,
          [`ts-icon--${this.size}`]: true,
        }}
        role={hasLabel ? 'img' : undefined}
        aria-label={hasLabel ? this.label : undefined}
        aria-hidden={hasLabel ? undefined : 'true'}
        style={{ '--ts-icon-color': this.color }}
      >
        {this.src ? (
          <img src={this.src} alt="" part="img" />
        ) : (
          <slot />
        )}
      </Host>
    );
  }
}
