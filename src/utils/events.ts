/**
 * Tessera UI — Event Utilities
 *
 * Helpers for consistent custom event dispatch across components.
 * All Tessera UI events bubble and are composed (cross shadow boundaries).
 */

export interface TsEventOptions<T> {
  detail: T;
  bubbles?: boolean;
  composed?: boolean;
  cancelable?: boolean;
}

/**
 * Create and dispatch a custom event from an element.
 * Returns true if the event was NOT cancelled.
 */
export function emitEvent<T>(
  el: HTMLElement,
  eventName: string,
  options: TsEventOptions<T>
): boolean {
  const event = new CustomEvent<T>(eventName, {
    detail: options.detail,
    bubbles: options.bubbles ?? true,
    composed: options.composed ?? true,
    cancelable: options.cancelable ?? false,
  });

  return el.dispatchEvent(event);
}
