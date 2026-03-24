import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * @slot - Default slot for step content.
 *
 * @part step - The step wrapper.
 * @part indicator - The step number/icon circle.
 * @part label - The step label.
 * @part description - The step description.
 * @part connector - The connector line between steps.
 * @part content - The step content area.
 */
@Component({
  tag: 'ts-step',
  styleUrl: 'step.css',
  shadow: true,
})
export class TsStep {
  @Element() hostEl!: HTMLElement;

  /** The step label text. */
  @Prop() label?: string;

  /** Optional description text below the label. */
  @Prop() description?: string;

  /** Whether this step is completed. */
  @Prop({ reflect: true }) completed = false;

  /** Whether this step has an error. */
  @Prop({ reflect: true }) error = false;

  /** Whether this step is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Optional custom icon name. */
  @Prop() icon?: string;

  private get index(): number {
    return parseInt(this.hostEl.getAttribute('data-index') || '0', 10);
  }

  private get isActive(): boolean {
    return this.hostEl.hasAttribute('data-active');
  }

  private get hasConnector(): boolean {
    return this.hostEl.hasAttribute('data-has-connector');
  }

  private get orientation(): string {
    return this.hostEl.getAttribute('data-orientation') || 'horizontal';
  }

  private renderIndicatorContent() {
    if (this.completed) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="step__icon">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    }
    if (this.error) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="step__icon">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    }
    if (this.icon) {
      return <ts-icon name={this.icon} size="sm" />;
    }
    return <span>{this.index + 1}</span>;
  }

  render() {
    return (
      <Host
        class={{
          'ts-step': true,
          'ts-step--active': this.isActive,
          'ts-step--completed': this.completed,
          'ts-step--error': this.error,
          'ts-step--disabled': this.disabled,
          [`ts-step--${this.orientation}`]: true,
        }}
        role="listitem"
        aria-current={this.isActive ? 'step' : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
      >
        <div class="step__wrapper" part="step">
          <div class="step__header">
            <div
              class={{
                'step__indicator': true,
                'step__indicator--active': this.isActive,
                'step__indicator--completed': this.completed,
                'step__indicator--error': this.error,
              }}
              part="indicator"
            >
              {this.renderIndicatorContent()}
            </div>

            <div class="step__text">
              {this.label && (
                <span class="step__label" part="label">
                  {this.label}
                </span>
              )}
              {this.description && (
                <span class="step__description" part="description">
                  {this.description}
                </span>
              )}
            </div>
          </div>

          {this.hasConnector && (
            <div class="step__connector" part="connector">
              <div
                class={{
                  'step__connector-line': true,
                  'step__connector-line--completed': this.completed,
                }}
              />
            </div>
          )}

          <div class="step__content" part="content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
