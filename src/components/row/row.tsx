import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for row content.
 */
@Component({
  tag: 'ts-row',
  styleUrl: 'row.css',
  shadow: true,
})
export class TsRow {
  /** Spacing token number controlling the gap between items. */
  @Prop({ reflect: true }) gap: string = '2';

  /** Cross-axis alignment of items. */
  @Prop({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'center';

  /** Main-axis alignment of items. */
  @Prop({ reflect: true }) justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';

  /** Whether items should wrap to the next line. */
  @Prop({ reflect: true }) wrap: boolean = true;

  /** Reverse the row direction. */
  @Prop({ reflect: true }) reverse: boolean = false;

  /** Breakpoint at which the row stacks vertically. */
  @Prop({ reflect: true, attribute: 'stack-at' }) stackAt: 'sm' | 'md' | 'lg' | 'never' = 'never';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const alignMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };

    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };

    return (
      <Host
        style={{
          gap: `var(--ts-spacing-${this.gap})`,
          alignItems: alignMap[this.align] || 'center',
          justifyContent: justifyMap[this.justify] || 'flex-start',
          flexWrap: this.wrap ? 'wrap' : 'nowrap',
        }}
      >
        <slot />
      </Host>
    );
  }
}
