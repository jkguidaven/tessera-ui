import { Component, Prop, State, h, Host, Element, Method } from '@stencil/core';
import type { TsPlacement } from '../../types';
import { generateId } from '../../utils/aria';

/**
 * @slot - Default slot for the trigger element.
 *
 * @part base - The tooltip popup container.
 * @part arrow - The tooltip arrow element.
 */
@Component({
  tag: 'ts-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class TsTooltip {
  @Element() hostEl!: HTMLElement;

  private tooltipId = generateId('ts-tooltip');

  /** The tooltip text content. */
  @Prop() content = '';

  /** Placement of the tooltip relative to the trigger. */
  @Prop({ reflect: true }) placement: TsPlacement = 'top';

  /** Delay in ms before showing the tooltip. */
  @Prop() showDelay = 200;

  /** Delay in ms before hiding the tooltip. */
  @Prop() hideDelay = 0;

  /** Disables the tooltip. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether the tooltip is currently visible. */
  @State() isVisible = false;

  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  /** Programmatically show the tooltip. */
  @Method()
  async show(): Promise<void> {
    if (this.disabled) return;
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.isVisible = true;
    }, this.showDelay);
  }

  /** Programmatically hide the tooltip. */
  @Method()
  async hide(): Promise<void> {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
    }, this.hideDelay);
  }

  disconnectedCallback(): void {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
  }

  private handleMouseEnter = (): void => {
    this.show();
  };

  private handleMouseLeave = (): void => {
    this.hide();
  };

  private handleFocusIn = (): void => {
    this.show();
  };

  private handleFocusOut = (): void => {
    this.hide();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isVisible) {
      this.hide();
    }
  };

  render() {
    return (
      <Host
        class={{
          'ts-tooltip': true,
          'ts-tooltip--visible': this.isVisible,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocusin={this.handleFocusIn}
        onFocusout={this.handleFocusOut}
        onKeyDown={this.handleKeydown}
      >
        <span class="tooltip__trigger" aria-describedby={this.isVisible ? this.tooltipId : undefined}>
          <slot />
        </span>

        <div
          class={{
            'tooltip__popup': true,
            [`tooltip__popup--${this.placement}`]: true,
            'tooltip__popup--visible': this.isVisible,
          }}
          part="base"
          id={this.tooltipId}
          role="tooltip"
          aria-hidden={!this.isVisible ? 'true' : undefined}
        >
          {this.content}
          <div class="tooltip__arrow" part="arrow" />
        </div>
      </Host>
    );
  }
}
