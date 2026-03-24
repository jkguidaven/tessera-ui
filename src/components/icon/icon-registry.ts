/**
 * Icon Registry
 *
 * A global registry for SVG icon strings. Components look up icons by name
 * from this registry. Works with any icon library — register SVG strings
 * directly or use the Lucide helper (`registerLucideIcons`).
 */

const registry = new Map<string, string>();

/**
 * Register multiple icons at once.
 * @param icons - A map of icon name to SVG string.
 */
export function registerIcons(icons: Record<string, string>): void {
  for (const [name, svg] of Object.entries(icons)) {
    registry.set(name, svg);
  }
}

/**
 * Register a single icon.
 * @param name - The icon name used in `<ts-icon name="...">`.
 * @param svg  - The full SVG markup string.
 */
export function registerIcon(name: string, svg: string): void {
  registry.set(name, svg);
}

/**
 * Retrieve an icon's SVG string by name.
 * @returns The SVG string, or `undefined` if the icon is not registered.
 */
export function getIcon(name: string): string | undefined {
  return registry.get(name);
}

/**
 * List all registered icon names.
 */
export function getRegisteredIconNames(): string[] {
  return Array.from(registry.keys());
}
