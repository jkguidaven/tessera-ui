import { Component, Prop, h, Host } from '@stencil/core';

/**
 * A layout shell that provides a sidebar, header, and main content area using CSS Grid.
 *
 * @slot sidebar - Content for the sidebar panel (e.g., navigation).
 * @slot header - Content for the top header bar.
 * @slot - Default slot for the main content area.
 *
 * @part sidebar - The sidebar container.
 * @part header - The header container.
 * @part content - The main content container.
 */
@Component({
  tag: 'ts-app-layout',
  styleUrl: 'app-layout.css',
  shadow: true,
})
export class TsAppLayout {
  /** Controls which side the sidebar appears on. */
  @Prop({ reflect: true }) sidebarPlacement: 'start' | 'end' = 'start';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host class={{ 'ts-app-layout': true, [`ts-app-layout--sidebar-${this.sidebarPlacement}`]: true }}>
        <aside class="app-layout__sidebar" part="sidebar">
          <slot name="sidebar" />
        </aside>
        <div class="app-layout__main">
          <header class="app-layout__header" part="header">
            <slot name="header" />
          </header>
          <main class="app-layout__content" part="content">
            <slot />
          </main>
        </div>
      </Host>
    );
  }
}
