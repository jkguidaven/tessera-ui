import { Component, Prop, State, h, Host } from '@stencil/core';

/**
 * @slot - Default slot for custom content (e.g., icon).
 *
 * @part base - The avatar container.
 * @part image - The avatar image element.
 * @part initials - The initials text element.
 * @part status - The status indicator dot.
 */
@Component({
  tag: 'ts-avatar',
  styleUrl: 'avatar.css',
  shadow: true,
})
export class TsAvatar {
  /** Image URL for the avatar. */
  @Prop() src?: string;

  /** Alt text for the avatar image. */
  @Prop() alt?: string;

  /** Name used to generate initials fallback. */
  @Prop() name?: string;

  /** The size of the avatar. */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Shape variant of the avatar. */
  @Prop({ reflect: true }) variant: 'circle' | 'square' = 'circle';

  /** Status indicator displayed on the avatar. */
  @Prop({ reflect: true }) status?: 'online' | 'offline' | 'busy' | 'away';

  /** Background color for the initials fallback. */
  @Prop() color?: string;

  /** Whether the image failed to load. */
  @State() hasError = false;

  private handleError = (): void => {
    this.hasError = true;
  };

  private getInitials(): string {
    if (!this.name) return '';
    const words = this.name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const showImage = this.src && !this.hasError;
    const initials = this.getInitials();
    const showInitials = !showImage && initials;

    return (
      <Host
        class={{
          'ts-avatar': true,
          [`ts-avatar--${this.size}`]: true,
          [`ts-avatar--${this.variant}`]: true,
        }}
      >
        <div
          class="avatar__base"
          part="base"
          role="img"
          aria-label={this.alt || this.name || 'Avatar'}
          style={this.color && !showImage ? { backgroundColor: this.color } : undefined}
        >
          {showImage && (
            <img
              class="avatar__image"
              part="image"
              src={this.src}
              alt={this.alt || this.name || ''}
              onError={this.handleError}
            />
          )}
          {showInitials && (
            <span class="avatar__initials" part="initials" aria-hidden="true">
              {initials}
            </span>
          )}
          {!showImage && !showInitials && <slot />}
          {this.status && (
            <span
              class={{
                'avatar__status': true,
                [`avatar__status--${this.status}`]: true,
              }}
              part="status"
              aria-label={this.status}
            />
          )}
        </div>
      </Host>
    );
  }
}
