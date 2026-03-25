import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for timeline item content.
 * @slot dot - Custom dot content to replace the default dot indicator.
 *
 * @part dot - The dot indicator element.
 * @part line - The vertical line connecting items.
 * @part content - The content wrapper.
 */
@Component({
  tag: 'ts-timeline-item',
  styleUrl: 'timeline-item.css',
  shadow: true,
})
export class TsTimelineItem {
  /** The visual variant of the timeline dot. */
  @Prop({ reflect: true }) variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' = 'primary';

  /** Lucide icon name to display inside the dot. */
  @Prop() icon?: string;

  /** Timestamp text to display above the content. */
  @Prop() timestamp?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host role="listitem">
        <div class="timeline-item__marker">
          <div class="timeline-item__dot" part="dot">
            {this.icon ? <ts-icon name={this.icon} size="sm" /> : <slot name="dot" />}
          </div>
          <div class="timeline-item__line" part="line" />
        </div>
        <div class="timeline-item__content" part="content">
          {this.timestamp && <time class="timeline-item__timestamp">{this.timestamp}</time>}
          <div class="timeline-item__body">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
