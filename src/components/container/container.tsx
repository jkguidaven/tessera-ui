import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for container content.
 *
 * @part base - The container element.
 */
@Component({
  tag: 'ts-container',
  styleUrl: 'container.css',
  shadow: true,
})
export class TsContainer {
  /** The maximum width of the container. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';

  /** Whether to apply horizontal padding. */
  @Prop({ reflect: true }) padding: boolean = true;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-container': true,
          'ts-container--no-padding': !this.padding,
        }}
      >
        <slot />
      </Host>
    );
  }
}
