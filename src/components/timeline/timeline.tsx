import { Component, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for `ts-timeline-item` elements.
 */
@Component({
  tag: 'ts-timeline',
  shadow: true,
})
export class TsTimeline {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host role="list">
        <slot />
      </Host>
    );
  }
}
