import { Component, Prop, h, Host } from '@stencil/core';
import type { TsSize } from '../../types';

/**
 * @slot - Default slot for toolbar items (center).
 * @slot start - Left/start-aligned items.
 * @slot end - Right/end-aligned items.
 *
 * @part base - The toolbar container.
 * @part start - The start slot wrapper.
 * @part center - The center/default slot wrapper.
 * @part end - The end slot wrapper.
 */
@Component({
  tag: 'ts-toolbar',
  styleUrl: 'toolbar.css',
  shadow: true,
})
export class TsToolbar {
  /** The toolbar variant style. */
  @Prop({ reflect: true }) variant: 'default' | 'bordered' | 'elevated' = 'default';

  /** The toolbar size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  render() {
    return (
      <Host
        class={{
          'ts-toolbar': true,
          [`ts-toolbar--${this.variant}`]: true,
          [`ts-toolbar--${this.size}`]: true,
        }}
        role="toolbar"
        aria-orientation="horizontal"
      >
        <div class="toolbar__base" part="base">
          <div class="toolbar__start" part="start">
            <slot name="start" />
          </div>

          <div class="toolbar__center" part="center">
            <slot />
          </div>

          <div class="toolbar__end" part="end">
            <slot name="end" />
          </div>
        </div>
      </Host>
    );
  }
}
