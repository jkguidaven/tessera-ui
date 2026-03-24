import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @part base - The divider line element.
 * @part label - The optional label text.
 */
@Component({
  tag: 'ts-divider',
  styleUrl: 'divider.css',
  shadow: true,
})
export class TsDivider {
  /** The divider orientation. */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** The line style variant. */
  @Prop({ reflect: true }) variant: 'solid' | 'dashed' | 'dotted' = 'solid';

  /** Optional label text displayed in the center of the divider. */
  @Prop() label?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const hasLabel = !!this.label;

    return (
      <Host
        class={{
          'ts-divider': true,
          [`ts-divider--${this.orientation}`]: true,
          [`ts-divider--${this.variant}`]: true,
          'ts-divider--has-label': hasLabel,
        }}
        role="separator"
        aria-orientation={this.orientation}
      >
        {hasLabel && this.orientation === 'horizontal' ? (
          <div class="divider__base" part="base">
            <span class="divider__line divider__line--start" />
            <span class="divider__label" part="label">{this.label}</span>
            <span class="divider__line divider__line--end" />
          </div>
        ) : (
          <div class="divider__base" part="base">
            <span class="divider__line" />
          </div>
        )}
      </Host>
    );
  }
}
