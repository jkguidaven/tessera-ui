import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for stacked content.
 *
 * @part base - The stack container.
 */
@Component({
  tag: 'ts-stack',
  styleUrl: 'stack.css',
  shadow: true,
})
export class TsStack {
  /** Spacing token number controlling the gap between items. */
  @Prop({ reflect: true }) gap: string = '3';

  /** Cross-axis alignment of items. */
  @Prop({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  render() {
    const alignMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    };

    return (
      <Host
        style={{
          gap: `var(--ts-spacing-${this.gap})`,
          alignItems: alignMap[this.align] || 'stretch',
        }}
      >
        <slot />
      </Host>
    );
  }
}
