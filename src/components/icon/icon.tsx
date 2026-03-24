import { Component, Prop, h, Host, Element, Watch, State } from '@stencil/core';
import type { TsSize } from '../../types';
import { getIcon } from './icon-registry';

type LucideNode = [string, Record<string, string>][];

/** Cached reference to the Lucide icons map — loaded lazily on first use. */
let lucideCache: Record<string, LucideNode> | null = null;

/**
 * Converts a PascalCase or kebab-case icon name to the PascalCase key used by Lucide.
 * e.g. "search" → "Search", "arrow-left" → "ArrowLeft"
 */
function toLucideKey(name: string): string {
  return name
    .split('-')
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Renders a Lucide icon node array to an SVG string.
 */
function renderLucideSvg(nodes: LucideNode): string {
  const children = nodes
    .map(([tag, attrs]: [string, Record<string, string>]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]: [string, string]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`;
}

/**
 * @slot - Default slot for inline SVG content.
 *
 * @part img - The img element (when using src prop).
 * @part svg - The container for resolved SVG content (when using name prop).
 */
@Component({
  tag: 'ts-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class TsIcon {
  @Element() el!: HTMLElement;

  /** Icon name — resolves from custom registry first, then built-in Lucide icons. Accepts kebab-case or PascalCase. */
  @Prop({ reflect: true }) name?: string;

  /** URL to an external SVG icon file. */
  @Prop() src?: string;

  /** The icon's size. */
  @Prop({ reflect: true }) size: TsSize = 'md';

  /** Accessible label. When set, applies role="img" and aria-label. When absent, sets aria-hidden="true". */
  @Prop() label?: string;

  /** CSS color value applied to the icon. */
  @Prop({ reflect: true }) color: string = 'currentColor';

  @State() private svgContent?: string;

  @Watch('name')
  nameChanged(): void {
    this.loadIcon();
  }

  componentWillLoad(): void {
    return this.loadIcon() as unknown as void;
  }

  /**
   * Checks whether built-in Lucide icons are disabled via data-icons="none"
   * on any ancestor element.
   */
  private isBuiltInDisabled(): boolean {
    return this.el.closest('[data-icons="none"]') !== null;
  }

  private async loadIcon(): Promise<void> {
    if (this.name && !this.src) {
      // 1. Check custom registry first (allows overrides)
      const registered = getIcon(this.name);
      if (registered) {
        this.svgContent = registered;
        return;
      }

      // 2. If built-in icons are disabled via data-icons="none", stop here
      if (this.isBuiltInDisabled()) {
        this.svgContent = undefined;
        return;
      }

      // 3. Lazy-load Lucide icons (only fetched on first name lookup)
      if (!lucideCache) {
        try {
          const mod = await import('lucide');
          lucideCache = (mod as { icons: Record<string, LucideNode> }).icons;
        } catch {
          this.svgContent = undefined;
          return;
        }
      }

      const key = toLucideKey(this.name);
      const lucideIcon = lucideCache[key];
      if (lucideIcon) {
        this.svgContent = renderLucideSvg(lucideIcon);
        return;
      }

      this.svgContent = undefined;
    } else {
      this.svgContent = undefined;
    }
  }

  render() {
    const hasLabel = !!this.label;

    return (
      <Host
        class={{
          'ts-icon': true,
          [`ts-icon--${this.size}`]: true,
        }}
        role={hasLabel ? 'img' : undefined}
        aria-label={hasLabel ? this.label : undefined}
        aria-hidden={hasLabel ? undefined : 'true'}
        style={{ '--ts-icon-color': this.color }}
      >
        {this.src ? (
          <img src={this.src} alt="" part="img" />
        ) : this.svgContent ? (
          <span part="svg" innerHTML={this.svgContent}></span>
        ) : (
          <slot />
        )}
      </Host>
    );
  }
}
