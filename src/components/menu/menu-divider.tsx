import { Component, h, Host } from '@stencil/core';

/**
 * @part divider - The divider line.
 */
@Component({
  tag: 'ts-menu-divider',
  styleUrl: 'menu-divider.css',
  shadow: true,
})
export class TsMenuDivider {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host class="ts-menu-divider">
        <div class="menu-divider" part="divider" role="separator" />
      </Host>
    );
  }
}
