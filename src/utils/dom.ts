/**
 * Tessera UI — DOM Utilities
 */

/**
 * Get the closest Tessera UI host element from within a shadow tree.
 */
export function getHostElement(el: Element): HTMLElement | null {
  const root = el.getRootNode();
  if (root instanceof ShadowRoot) {
    return root.host as HTMLElement;
  }
  return null;
}

/**
 * Check if a slot has assigned content.
 */
export function hasSlotContent(el: HTMLElement, slotName?: string): boolean {
  const selector = slotName ? `slot[name="${slotName}"]` : 'slot:not([name])';
  const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(selector);
  if (!slot) return false;
  const nodes = slot.assignedNodes({ flatten: true });
  return nodes.some(
    (node) =>
      node.nodeType === Node.ELEMENT_NODE ||
      (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '')
  );
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
