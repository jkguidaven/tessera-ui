import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @slot - Custom content below the description.
 * @slot action - CTA buttons.
 * @slot icon - Custom icon or illustration.
 *
 * @part base - The empty state container.
 * @part icon - The icon wrapper.
 * @part heading - The heading element.
 * @part description - The description text.
 * @part content - The custom content wrapper.
 * @part action - The action slot wrapper.
 */
@Component({
  tag: 'ts-empty-state',
  styleUrl: 'empty-state.css',
  shadow: true,
})
export class TsEmptyState {
  /** The heading text. */
  @Prop() heading?: string;

  /** The description text. */
  @Prop() description?: string;

  /** Lucide icon name displayed large. */
  @Prop() icon?: string;

  /** The size of the empty state. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-empty-state': true,
          [`ts-empty-state--${this.size}`]: true,
        }}
      >
        <div class="empty-state__base" part="base">
          <div class="empty-state__icon" part="icon">
            <slot name="icon">
              {this.icon && <ts-icon name={this.icon} />}
            </slot>
          </div>

          {this.heading && (
            <h3 class="empty-state__heading" part="heading">
              {this.heading}
            </h3>
          )}

          {this.description && (
            <p class="empty-state__description" part="description">
              {this.description}
            </p>
          )}

          <div class="empty-state__content" part="content">
            <slot />
          </div>

          <div class="empty-state__action" part="action">
            <slot name="action" />
          </div>
        </div>
      </Host>
    );
  }
}
