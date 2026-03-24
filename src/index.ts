/**
 * Tessera UI — Library Entry Point
 *
 * Re-exports all public components, types, and utilities.
 */

// Types
export type {
  TsSize,
  TsVariant,
  TsAppearance,
  TsOrientation,
  TsPlacement,
  TsChangeEventDetail,
  TsToggleEventDetail,
  TsValidationEventDetail,
} from './types';

// Utilities
export { generateId, announce, prefersReducedMotion, trapFocus } from './utils/aria';
export { debounce, clamp, hasSlotContent } from './utils/dom';
export { emitEvent } from './utils/events';

// Icon Registry
export { registerIcons, registerIcon, getIcon, getRegisteredIconNames } from './components/icon/icon-registry';

// Components
export { TsIcon } from './components/icon/icon';
