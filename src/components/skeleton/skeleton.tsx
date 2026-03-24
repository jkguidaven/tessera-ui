import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @part base - The skeleton element container.
 * @part line - Individual skeleton line (text variant).
 */
@Component({
  tag: 'ts-skeleton',
  styleUrl: 'skeleton.css',
  shadow: true,
})
export class TsSkeleton {
  /** The skeleton shape variant. */
  @Prop({ reflect: true }) variant: 'text' | 'circular' | 'rectangular' = 'text';

  /** CSS width of the skeleton. */
  @Prop() width = '100%';

  /** CSS height of the skeleton. */
  @Prop() height?: string;

  /** Number of lines to render (text variant only). */
  @Prop() lines = 1;

  /** Animation style. */
  @Prop({ reflect: true }) animation: 'pulse' | 'wave' | 'none' = 'pulse';

  render() {
    const style: Record<string, string> = {};
    if (this.width) style['width'] = this.width;
    if (this.height) style['height'] = this.height;

    if (this.variant === 'text') {
      const lineElements = [];
      for (let i = 0; i < this.lines; i++) {
        const isLast = i === this.lines - 1 && this.lines > 1;
        lineElements.push(
          <div
            class={{
              'skeleton__line': true,
              'skeleton__line--last': isLast,
            }}
            part="line"
          />,
        );
      }

      return (
        <Host
          class={{
            'ts-skeleton': true,
            [`ts-skeleton--${this.variant}`]: true,
            [`ts-skeleton--${this.animation}`]: true,
          }}
          style={style}
          aria-hidden="true"
        >
          <div class="skeleton__base" part="base">
            {lineElements}
          </div>
        </Host>
      );
    }

    return (
      <Host
        class={{
          'ts-skeleton': true,
          [`ts-skeleton--${this.variant}`]: true,
          [`ts-skeleton--${this.animation}`]: true,
        }}
        style={style}
        aria-hidden="true"
      >
        <div class="skeleton__base" part="base" />
      </Host>
    );
  }
}
