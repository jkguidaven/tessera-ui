import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for ts-nav-item children.
 *
 * @part nav - The native nav element.
 * @part list - The list container.
 */
@Component({
  tag: 'ts-nav',
  styleUrl: 'nav.css',
  shadow: true,
})
export class TsNav {
  /** The navigation layout variant. */
  @Prop({ reflect: true }) variant: 'sidebar' | 'horizontal' = 'sidebar';

  /** Whether the sidebar nav is collapsed (icons only). */
  @Prop({ reflect: true }) collapsed = false;

  /** Accessible label for the nav element. */
  @Prop() label = 'Navigation';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host
        class={{
          'ts-nav': true,
          [`ts-nav--${this.variant}`]: true,
          'ts-nav--collapsed': this.collapsed,
        }}
      >
        <nav class="nav__native" part="nav" aria-label={this.label}>
          <ul class="nav__list" part="list" role="list">
            <slot />
          </ul>
        </nav>
      </Host>
    );
  }
}
