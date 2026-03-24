import { Component, Prop, h, Host, Element, Listen } from '@stencil/core';

/**
 * @slot - Default slot for ts-accordion-item children.
 */
@Component({
  tag: 'ts-accordion',
  styleUrl: 'accordion.css',
  shadow: true,
})
export class TsAccordion {
  @Element() hostEl!: HTMLElement;

  /** Allow multiple items to be open simultaneously. */
  @Prop() multiple = false;

  @Listen('tsToggle')
  handleToggle(event: CustomEvent<{ open: boolean }>): void {
    if (!this.multiple && event.detail.open) {
      const target = event.target as HTMLElement;
      const items = this.hostEl.querySelectorAll('ts-accordion-item');
      items.forEach((item) => {
        if (item !== target) {
          item.setAttribute('open', 'false');
          item.removeAttribute('open');
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host class="ts-accordion">
        <slot />
      </Host>
    );
  }
}
