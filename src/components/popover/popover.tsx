import { Component, Prop, Event, State, h, Host, Element, Watch, Method } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import { generateId } from '../../utils/aria';

type TsPopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * @slot trigger - The element that triggers the popover.
 * @slot - Default slot for popover content.
 *
 * @part base - The popover container.
 * @part arrow - The popover arrow.
 * @part trigger - The trigger wrapper.
 */
@Component({
  tag: 'ts-popover',
  styleUrl: 'popover.css',
  shadow: true,
})
export class TsPopover {
  @Element() hostEl!: HTMLElement;

  private popoverId = generateId('ts-popover');
  private outsideClickHandler?: (event: MouseEvent) => void;
  private escapeHandler?: (event: KeyboardEvent) => void;

  /** Whether the popover is currently visible. */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Placement of the popover relative to the trigger. */
  @Prop({ reflect: true }) placement: TsPopoverPlacement = 'bottom';

  /** How the popover is triggered. */
  @Prop() trigger: 'click' | 'hover' | 'manual' = 'click';

  /** Whether the popover closes on outside click or Escape. */
  @Prop() dismissible = true;

  /** Emitted when the popover opens. */
  @Event({ eventName: 'tsOpen' }) tsOpen!: EventEmitter<void>;

  /** Emitted when the popover closes. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<void>;

  @State() isVisible = false;

  @Watch('open')
  handleOpenChange(newValue: boolean): void {
    this.isVisible = newValue;
    if (newValue) {
      this.tsOpen.emit();
      this.addGlobalListeners();
    } else {
      this.tsClose.emit();
      this.removeGlobalListeners();
    }
  }

  connectedCallback(): void {
    if (this.open) {
      this.isVisible = true;
      this.addGlobalListeners();
    }
  }

  disconnectedCallback(): void {
    this.removeGlobalListeners();
  }

  /** Programmatically show the popover. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically hide the popover. */
  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  private addGlobalListeners(): void {
    if (this.dismissible) {
      this.outsideClickHandler = (event: MouseEvent) => {
        const path = event.composedPath();
        if (!path.includes(this.hostEl)) {
          this.open = false;
        }
      };
      this.escapeHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.open = false;
        }
      };
      // Use setTimeout to avoid capturing the click that opened the popover
      setTimeout(() => {
        document.addEventListener('click', this.outsideClickHandler!);
        document.addEventListener('keydown', this.escapeHandler!);
      }, 0);
    }
  }

  private removeGlobalListeners(): void {
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = undefined;
    }
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = undefined;
    }
  }

  private handleTriggerClick = (): void => {
    if (this.trigger === 'click') {
      this.open = !this.open;
    }
  };

  private handleTriggerKeydown = (event: KeyboardEvent): void => {
    if (this.trigger === 'click' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.open = !this.open;
    }
  };

  private handleMouseEnter = (): void => {
    if (this.trigger === 'hover') {
      this.open = true;
    }
  };

  private handleMouseLeave = (): void => {
    if (this.trigger === 'hover') {
      this.open = false;
    }
  };

  render() {
    return (
      <Host
        class={{
          'ts-popover': true,
          'ts-popover--open': this.isVisible,
          [`ts-popover--${this.placement}`]: true,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span
          class="popover__trigger"
          part="trigger"
          aria-expanded={this.isVisible ? 'true' : 'false'}
          aria-controls={this.popoverId}
          onClick={this.handleTriggerClick}
          onKeyDown={this.handleTriggerKeydown}
        >
          <slot name="trigger" />
        </span>

        <div
          class={{
            'popover__panel': true,
            [`popover__panel--${this.placement}`]: true,
            'popover__panel--visible': this.isVisible,
          }}
          part="base"
          id={this.popoverId}
          role="dialog"
          aria-hidden={!this.isVisible ? 'true' : undefined}
        >
          <div class="popover__arrow" part="arrow" />
          <div class="popover__content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
