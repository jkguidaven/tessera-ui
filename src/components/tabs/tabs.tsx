import { Component, Prop, Event, h, Host, Element, Watch } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for `ts-tab-panel` children.
 *
 * @part tablist - The tab button container.
 * @part tab - Each individual tab button.
 * @part tab-active - The currently active tab button.
 * @part panels - The panel container.
 * @part close - The close button inside closable tabs.
 */
@Component({
  tag: 'ts-tabs',
  styleUrl: 'tabs.css',
  shadow: true,
})
export class TsTabs {
  @Element() hostEl!: HTMLElement;

  /** The value of the currently active tab. */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /** Visual variant of the tab bar. */
  @Prop({ reflect: true }) variant: 'line' | 'enclosed' | 'pill' = 'line';

  /** The size of the tab buttons. */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** The orientation of the tab bar. */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Whether tabs display a close button. */
  @Prop({ reflect: true }) closable = false;

  /** Whether the tab list is scrollable on overflow. */
  @Prop({ reflect: true }) scrollable = false;

  /** Emitted when the active tab changes. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ value: string }>;

  /** Emitted when a tab's close button is clicked. */
  @Event({ eventName: 'tsClose' }) tsClose!: EventEmitter<{ value: string }>;

  @Watch('value')
  handleValueChange(): void {
    this.updatePanelVisibility();
  }

  componentDidLoad(): void {
    // Default to first non-disabled tab if no value set
    if (!this.value) {
      const panels = this.getPanels();
      const firstEnabled = panels.find((p) => !p.hasAttribute('disabled'));
      if (firstEnabled) {
        this.value = firstEnabled.getAttribute('value') || '';
      }
    }
    this.updatePanelVisibility();
  }

  private getPanels(): Element[] {
    return Array.from(this.hostEl.querySelectorAll('ts-tab-panel'));
  }

  private getTabData(): Array<{ tab: string; value: string; disabled: boolean; icon?: string }> {
    return this.getPanels().map((panel) => ({
      tab: panel.getAttribute('tab') || '',
      value: panel.getAttribute('value') || '',
      disabled: panel.hasAttribute('disabled'),
      icon: panel.getAttribute('icon') || undefined,
    }));
  }

  private updatePanelVisibility(): void {
    this.getPanels().forEach((panel) => {
      const isActive = panel.getAttribute('value') === this.value;
      (panel as HTMLElement).style.display = isActive ? '' : 'none';
    });
  }

  private handleTabClick(tabValue: string, disabled: boolean): void {
    if (disabled || tabValue === this.value) return;
    this.value = tabValue;
    this.tsChange.emit({ value: tabValue });
    this.updatePanelVisibility();
  }

  private handleCloseClick(event: MouseEvent, tabValue: string): void {
    event.stopPropagation();
    this.tsClose.emit({ value: tabValue });
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    const tabs = this.getTabData();
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIndex = enabledTabs.findIndex((t) => t.value === this.value);

    let newIndex = currentIndex;

    const nextKeys = this.orientation === 'vertical' ? ['ArrowDown'] : ['ArrowRight'];
    const prevKeys = this.orientation === 'vertical' ? ['ArrowUp'] : ['ArrowLeft'];

    switch (event.key) {
      case nextKeys[0]:
        event.preventDefault();
        newIndex = (currentIndex + 1) % enabledTabs.length;
        break;
      case prevKeys[0]:
        event.preventDefault();
        newIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    const newTab = enabledTabs[newIndex];
    if (newTab) {
      this.value = newTab.value;
      this.tsChange.emit({ value: newTab.value });
      this.updatePanelVisibility();

      // Focus the new tab button
      const tabButtons = this.hostEl.shadowRoot?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const allTabIndex = tabs.findIndex((t) => t.value === newTab.value);
      tabButtons?.[allTabIndex]?.focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const tabs = this.getTabData();

    return (
      <Host
        class={{
          'ts-tabs': true,
          [`ts-tabs--${this.variant}`]: true,
          [`ts-tabs--${this.size}`]: true,
          'ts-tabs--vertical': this.orientation === 'vertical',
          'ts-tabs--scrollable': this.scrollable,
        }}
      >
        <div class="tabs__tablist" part="tablist" role="tablist" onKeyDown={this.handleKeydown}>
          {tabs.map((t) => {
            const isActive = t.value === this.value;
            return (
              <button
                class={{
                  'tabs__tab': true,
                  'tabs__tab--active': isActive,
                  'tabs__tab--disabled': t.disabled,
                }}
                part={isActive ? 'tab tab-active' : 'tab'}
                role="tab"
                type="button"
                id={`tab-${t.value}`}
                aria-selected={isActive ? 'true' : 'false'}
                aria-disabled={t.disabled ? 'true' : undefined}
                aria-controls={`panel-${t.value}`}
                tabindex={isActive ? 0 : -1}
                disabled={t.disabled}
                onClick={() => this.handleTabClick(t.value, t.disabled)}
              >
                {t.icon && <ts-icon name={t.icon} class="tabs__tab-icon" />}
                {t.tab}
                {this.closable && !t.disabled && (
                  <button
                    class="tabs__close"
                    part="close"
                    type="button"
                    aria-label={`Close ${t.tab}`}
                    onClick={(e: MouseEvent) => this.handleCloseClick(e, t.value)}
                  >
                    &times;
                  </button>
                )}
              </button>
            );
          })}
        </div>
        <div class="tabs__panels" part="panels">
          <slot />
        </div>
      </Host>
    );
  }
}
