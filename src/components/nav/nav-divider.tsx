import { Component, h, Host } from '@stencil/core';

/**
 * A visual separator for nav items.
 *
 * @part divider - The separator element.
 */
@Component({
  tag: 'ts-nav-divider',
  styleUrl: 'nav-divider.css',
  shadow: true,
})
export class TsNavDivider {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host>
        <li role="separator" class="nav-divider" part="divider" />
      </Host>
    );
  }
}
