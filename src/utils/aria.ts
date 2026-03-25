/**
 * Tessera UI — Accessibility Utilities
 *
 * Helpers for consistent ARIA patterns across components.
 */

/** Generate a unique ID for ARIA relationships */
let idCounter = 0;
export function generateId(prefix = 'q'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/** Reset ID counter (for testing) */
export function resetIdCounter(): void {
  idCounter = 0;
}

/**
 * Announce a message to screen readers via a live region.
 * Creates a temporary `aria-live` element, inserts the message,
 * and removes it after the AT has time to read it.
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const el = document.createElement('div');
  el.setAttribute('aria-live', priority);
  el.setAttribute('role', 'status');
  el.setAttribute('aria-atomic', 'true');
  Object.assign(el.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  });

  document.body.appendChild(el);

  // Delay to ensure the live region is registered before content is added
  requestAnimationFrame(() => {
    el.textContent = message;
    setTimeout(() => el.remove(), 1000);
  });
}

/**
 * Check if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Focusable element selectors used by the focus trap. */
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Recursively query focusable elements, traversing shadow DOM boundaries.
 */
export function queryFocusableElements(root: HTMLElement | ShadowRoot): HTMLElement[] {
  const result: HTMLElement[] = [];

  // Query focusable elements at this level
  const elements = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
  for (const el of Array.from(elements)) {
    result.push(el);
  }

  // Walk all child elements to check for shadow roots
  const allElements = root.querySelectorAll<HTMLElement>('*');
  for (const el of Array.from(allElements)) {
    if (el.shadowRoot) {
      result.push(...queryFocusableElements(el.shadowRoot));
    }
  }

  return result;
}

/**
 * Get the deepest active element, traversing shadow DOM boundaries.
 */
function getDeepActiveElement(): Element | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * Trap focus within a container element.
 * Traverses shadow DOM boundaries to find all focusable elements.
 * Returns a cleanup function to remove the trap.
 */
export function trapFocus(container: HTMLElement): () => void {
  function handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusableElements = queryFocusableElements(container);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const deepActive = getDeepActiveElement();

    if (event.shiftKey) {
      if (deepActive === firstFocusable || document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (deepActive === lastFocusable || document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}
