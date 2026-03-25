import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * @slot - Default slot for panel content.
 *
 * @part panel - The panel container element.
 */
@Component({
  tag: 'ts-tab-panel',
  styleUrl: 'tab-panel.css',
  shadow: true,
})
export class TsTabPanel {
  @Element() hostEl!: HTMLElement;

  /** The label text displayed in the tab button. */
  @Prop() tab!: string;

  /** Unique identifier for this tab panel. */
  @Prop({ reflect: true }) value!: string;

  /** Whether this tab is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Optional icon name displayed before the tab label. */
  @Prop() icon?: string;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host id={`panel-${this.value}`}>
        <div class="tab-panel" part="panel" role="tabpanel" aria-labelledby={`tab-${this.value}`}>
          <slot />
        </div>
      </Host>
    );
  }
}
