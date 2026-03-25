import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * @slot - Avatar elements to display in the group.
 *
 * @part base - The group container.
 * @part overflow - The overflow indicator element.
 */
@Component({
  tag: 'ts-avatar-group',
  styleUrl: 'avatar-group.css',
  shadow: false,
})
export class TsAvatarGroup {
  @Element() hostEl!: HTMLElement;

  /** Maximum number of visible avatars before showing an overflow indicator. */
  @Prop() max?: number;

  /** Size applied to all child avatars. */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  componentDidLoad(): void {
    this.syncChildren();
  }

  componentDidUpdate(): void {
    this.syncChildren();
  }

  private syncChildren(): void {
    const avatars = Array.from(this.hostEl.querySelectorAll('ts-avatar'));

    avatars.forEach((avatar: Element) => {
      const avatarEl = avatar as HTMLElement & { size?: string };
      avatarEl.size = this.size;
      avatarEl.style.display = '';
    });

    if (this.max !== undefined && avatars.length > this.max) {
      avatars.slice(this.max).forEach((avatar) => {
        (avatar as HTMLElement).style.display = 'none';
      });
    }
  }

  private getOverflowCount(): number {
    const avatars = this.hostEl?.querySelectorAll('ts-avatar');
    if (!avatars || this.max === undefined) return 0;
    return Math.max(0, avatars.length - this.max);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const overflowCount = this.getOverflowCount();

    return (
      <Host
        class={{
          'ts-avatar-group': true,
          [`ts-avatar-group--${this.size}`]: true,
        }}
      >
        <div class="avatar-group__inner" part="base" role="group" aria-label="Avatar group">
          <slot />
          {overflowCount > 0 && (
            <div
              class={{
                'avatar-group__overflow': true,
                [`avatar-group__overflow--${this.size}`]: true,
              }}
              part="overflow"
              aria-label={`${overflowCount} more`}
            >
              +{overflowCount}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
