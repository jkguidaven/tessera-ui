import { Component, Prop, Event, h, Host } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot breadcrumb - Breadcrumb navigation displayed above the heading.
 * @slot actions - Right-aligned action buttons.
 * @slot tabs - Tab navigation displayed below the description.
 *
 * @part heading - The h1 heading element.
 * @part description - The description paragraph.
 * @part back - The back navigation link.
 */
@Component({
  tag: 'ts-page-header',
  styleUrl: 'page-header.css',
  shadow: true,
})
export class TsPageHeader {
  /** The page heading text. */
  @Prop() heading!: string;

  /** Optional description text displayed below the heading. */
  @Prop() description?: string;

  /** Optional URL for the back navigation link. When set, renders a back arrow link. */
  @Prop() backHref?: string;

  /** Emitted when the back link is clicked. */
  @Event({ eventName: 'tsBack' }) tsBack!: EventEmitter<void>;

  private handleBackClick = (): void => {
    this.tsBack.emit();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Host>
        <slot name="breadcrumb" />
        <div class="page-header__main">
          <div class="page-header__content">
            {this.backHref && (
              <a
                class="page-header__back"
                part="back"
                href={this.backHref}
                onClick={this.handleBackClick}
              >
                <ts-icon name="arrow-left" size="sm"></ts-icon>
              </a>
            )}
            <div>
              <h1 class="page-header__heading" part="heading">
                {this.heading}
              </h1>
              {this.description && (
                <p class="page-header__description" part="description">
                  {this.description}
                </p>
              )}
            </div>
          </div>
          <div class="page-header__actions">
            <slot name="actions" />
          </div>
        </div>
        <slot name="tabs" />
      </Host>
    );
  }
}
