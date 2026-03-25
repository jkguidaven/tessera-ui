import { Component, Prop, Event, Method, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

export interface TsFormSubmitDetail {
  values: Record<string, string>;
  valid: boolean;
}

/**
 * @slot - Default slot for form fields and controls.
 */
@Component({
  tag: 'ts-form',
  styleUrl: 'form.css',
  shadow: false,
})
export class TsForm {
  @Element() hostEl!: HTMLElement;

  /** When true, disables native browser validation. */
  @Prop() novalidate = false;

  /** Emitted when the form is submitted. */
  @Event({ eventName: 'tsSubmit' }) tsSubmit!: EventEmitter<TsFormSubmitDetail>;

  private formEl?: HTMLFormElement;

  private handleSubmit = (event: Event): void => {
    event.preventDefault();

    const form = this.formEl;
    if (!form) return;

    const valid = this.novalidate ? true : form.checkValidity();
    const values: Record<string, string> = {};

    const elements = form.querySelectorAll('[name]');
    elements.forEach((el) => {
      const name = el.getAttribute('name');
      if (name) {
        values[name] = (el as HTMLInputElement).value ?? '';
      }
    });

    this.tsSubmit.emit({ values, valid });
  };

  /** Resets all form fields to their default values. */
  @Method()
  async reset(): Promise<void> {
    this.formEl?.reset();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host class="ts-form">
        <form
          class="form__native"
          novalidate={this.novalidate}
          onSubmit={this.handleSubmit}
          ref={(el) => (this.formEl = el)}
        >
          <slot />
        </form>
      </Host>
    );
  }
}
