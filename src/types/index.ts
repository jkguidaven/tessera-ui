/**
 * Tessera UI — Shared Types
 */

/** Standard component sizes used across the library */
export type TsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Semantic color variants */
export type TsVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/** Button-style visual weight */
export type TsAppearance = 'solid' | 'outline' | 'ghost' | 'link';

/** Standard orientation */
export type TsOrientation = 'horizontal' | 'vertical';

/** Placement positions (for tooltips, popovers, etc.) */
export type TsPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/** Shared event detail for value-change events */
export interface TsChangeEventDetail<T = unknown> {
  value: T;
  previousValue: T;
}

/** Shared event detail for toggle events */
export interface TsToggleEventDetail {
  checked: boolean;
}

/** Shared event detail for form validation */
export interface TsValidationEventDetail {
  valid: boolean;
  message: string;
}
