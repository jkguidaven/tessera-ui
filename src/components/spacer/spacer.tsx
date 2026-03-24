import { Component, Prop, h, Host } from '@stencil/core';

/**
 * An explicit spacing element for adding vertical or horizontal space.
 */
@Component({
  tag: 'ts-spacer',
  styleUrl: 'spacer.css',
  shadow: true,
})
export class TsSpacer {
  /** Spacing token number controlling the size of the spacer. */
  @Prop({ reflect: true }) size: string = '4';

  /** The axis along which the spacer adds space. */
  @Prop({ reflect: true }) axis: 'vertical' | 'horizontal' = 'vertical';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const style =
      this.axis === 'horizontal'
        ? { width: `var(--ts-spacing-${this.size})`, height: '100%' }
        : { height: `var(--ts-spacing-${this.size})`, width: '100%' };

    return <Host style={style}></Host>;
  }
}
