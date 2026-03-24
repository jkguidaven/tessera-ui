import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @part svg - The SVG element.
 * @part track - The background track circle.
 * @part indicator - The spinning indicator arc.
 */
@Component({
  tag: 'ts-spinner',
  styleUrl: 'spinner.css',
  shadow: true,
})
export class TsSpinner {
  /** The size of the spinner. */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** The color of the spinning indicator. */
  @Prop() color: string = 'currentColor';

  /** Accessible label for screen readers. */
  @Prop() label: string = 'Loading';

  render() {
    return (
      <Host
        class={{
          'ts-spinner': true,
          [`ts-spinner--${this.size}`]: true,
        }}
        role="status"
        aria-label={this.label}
      >
        <svg class="spinner__svg" part="svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            class="spinner__track"
            part="track"
            cx="16"
            cy="16"
            r="13"
            stroke-width="3"
          />
          <circle
            class="spinner__indicator"
            part="indicator"
            cx="16"
            cy="16"
            r="13"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="20 61.68"
            style={{ stroke: this.color !== 'currentColor' ? this.color : undefined }}
          />
        </svg>
      </Host>
    );
  }
}
