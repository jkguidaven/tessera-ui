import { Component, Prop, h, Host } from '@stencil/core';

/**
 * A utility component that visually hides content while keeping it
 * accessible to screen readers. Useful for providing additional context
 * to assistive technologies without cluttering the visual interface.
 *
 * @slot - Default slot for content to be visually hidden.
 */
@Component({
  tag: 'ts-visually-hidden',
  styleUrl: 'visually-hidden.css',
  shadow: true,
})
export class TsVisuallyHidden {
  /** When true, the content becomes visible when focused (useful for skip links). */
  @Prop({ reflect: true }) focusable = false;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'focusable': this.focusable,
        }}
      >
        <span>
          <slot />
        </span>
      </Host>
    );
  }
}
