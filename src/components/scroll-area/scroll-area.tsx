import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for scrollable content.
 *
 * @part viewport - The scrollable viewport container.
 */
@Component({
  tag: 'ts-scroll-area',
  styleUrl: 'scroll-area.css',
  shadow: true,
})
export class TsScrollArea {
  /** The scroll orientation. */
  @Prop({ reflect: true }) orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';

  /** Optional max height for the scroll area (e.g. '300px'). */
  @Prop() maxHeight?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const viewportStyle: Record<string, string> = {};
    if (this.maxHeight) {
      viewportStyle['max-height'] = this.maxHeight;
    }

    return (
      <Host
        class={{
          'ts-scroll-area': true,
          [`ts-scroll-area--${this.orientation}`]: true,
        }}
      >
        <div
          class={{
            'scroll-area__viewport': true,
            'scroll-area__viewport--vertical': this.orientation === 'vertical' || this.orientation === 'both',
            'scroll-area__viewport--horizontal': this.orientation === 'horizontal' || this.orientation === 'both',
          }}
          part="viewport"
          style={viewportStyle}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
