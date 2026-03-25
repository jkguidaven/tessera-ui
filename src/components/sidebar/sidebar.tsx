import { Component, Prop, Event, h, Host, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot header - Content displayed at the top of the sidebar (sticky).
 * @slot - Default slot for navigation content (scrollable).
 * @slot footer - Content displayed at the bottom of the sidebar (sticky).
 *
 * @part container - The main sidebar container.
 * @part header - The header slot wrapper.
 * @part content - The scrollable content area.
 * @part footer - The footer slot wrapper.
 * @part toggle - The collapse toggle button.
 */
@Component({
  tag: 'ts-sidebar',
  styleUrl: 'sidebar.css',
  shadow: true,
})
export class TsSidebar {
  /** Whether the sidebar is collapsed. */
  @Prop({ reflect: true, mutable: true }) collapsed = false;

  /** The expanded width of the sidebar. */
  @Prop() width = '260px';

  /** Whether the sidebar can be collapsed via a toggle button. */
  @Prop({ reflect: true }) collapsible = false;

  /** Emitted when the sidebar collapsed state changes. */
  @Event({ eventName: 'tsToggle' }) tsToggle!: EventEmitter<{ collapsed: boolean }>;

  @Watch('collapsed')
  handleCollapsedChange(): void {
    this.tsToggle.emit({ collapsed: this.collapsed });
  }

  private handleToggleClick = (): void => {
    this.collapsed = !this.collapsed;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const sidebarWidth = this.collapsed ? '64px' : this.width;

    return (
      <Host
        style={{ width: sidebarWidth }}
        class={{
          'ts-sidebar': true,
          'ts-sidebar--collapsed': this.collapsed,
        }}
      >
        <div class="sidebar__container" part="container">
          <div class="sidebar__header" part="header">
            <slot name="header" />
          </div>

          <div class="sidebar__content" part="content">
            <slot />
          </div>

          <div class="sidebar__footer" part="footer">
            <slot name="footer" />
            {this.collapsible && (
              <button
                class="sidebar__toggle"
                part="toggle"
                type="button"
                aria-label={this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={this.handleToggleClick}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class={{
                    'sidebar__toggle-icon': true,
                    'sidebar__toggle-icon--collapsed': this.collapsed,
                  }}
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
