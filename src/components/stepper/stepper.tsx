import { Component, Prop, h, Host, Element, Watch } from '@stencil/core';

/**
 * @slot - Default slot for ts-step children.
 *
 * @part container - The stepper container.
 */
@Component({
  tag: 'ts-stepper',
  styleUrl: 'stepper.css',
  shadow: true,
})
export class TsStepper {
  @Element() hostEl!: HTMLElement;

  /** The index of the currently active step (0-based). */
  @Prop({ reflect: true }) activeStep = 0;

  /** The layout orientation. */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** If true, steps must be completed in order. */
  @Prop() linear = false;

  @Watch('activeStep')
  handleActiveStepChange(): void {
    this.updateStepStates();
  }

  componentDidLoad(): void {
    this.updateStepStates();
  }

  private updateStepStates(): void {
    const steps = Array.from(this.hostEl.querySelectorAll('ts-step'));
    steps.forEach((step, index) => {
      step.setAttribute('data-index', String(index));
      step.setAttribute('data-orientation', this.orientation);
      if (index === this.activeStep) {
        step.setAttribute('data-active', '');
      } else {
        step.removeAttribute('data-active');
      }
      if (this.linear && index > this.activeStep) {
        step.setAttribute('disabled', '');
      } else if (this.linear) {
        step.removeAttribute('disabled');
      }
      if (index < steps.length - 1) {
        step.setAttribute('data-has-connector', '');
      } else {
        step.removeAttribute('data-has-connector');
      }
    });
  }

  render() {
    return (
      <Host
        class={{
          'ts-stepper': true,
          [`ts-stepper--${this.orientation}`]: true,
        }}
      >
        <div class="stepper__container" part="container" role="list">
          <slot />
        </div>
      </Host>
    );
  }
}
