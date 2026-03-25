/**
 * Tessera UI — Library Entry Point
 *
 * Re-exports all public components, types, and utilities.
 * Importing this module auto-registers all web components and injects design tokens.
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
  TsCheckboxChangeEventDetail,
  TsSelectChangeEventDetail,
  TsValidationEventDetail,
} from './types';

// Utilities
export { generateId, announce, prefersReducedMotion, trapFocus } from './utils/aria';
export { debounce, clamp, hasSlotContent } from './utils/dom';
export { emitEvent } from './utils/events';

// Icon Registry
export { registerIcons, registerIcon, getIcon, getRegisteredIconNames } from './components/icon/icon-registry';

// Components
export { TsAlert } from './components/alert/alert';
export { TsAvatar } from './components/avatar/avatar';
export { TsBadge } from './components/badge/badge';
export { TsButton } from './components/button/button';
export { TsCard } from './components/card/card';
export { TsCheckbox } from './components/checkbox/checkbox';
export { TsIcon } from './components/icon/icon';
export { TsInput } from './components/input/input';
export { TsModal } from './components/modal/modal';
export { TsRadio } from './components/radio/radio';
export { TsSelect } from './components/select/select';
export { TsSpinner } from './components/spinner/spinner';
export { TsTabs } from './components/tabs/tabs';
export { TsTabPanel } from './components/tabs/tab-panel';
export { TsTextarea } from './components/textarea/textarea';
export { TsToggle } from './components/toggle/toggle';
export { TsTooltip } from './components/tooltip/tooltip';
export { TsAvatarGroup } from './components/avatar-group/avatar-group';
export { TsDialog } from './components/dialog/dialog';
export { TsMenu } from './components/menu/menu';
export type { TsMenuPlacement, TsMenuTrigger } from './components/menu/menu';
export { TsMenuItem } from './components/menu/menu-item';
export { TsMenuDivider } from './components/menu/menu-divider';
export { TsTable } from './components/table/table';
export { TsAccordion } from './components/accordion/accordion';
export { TsAccordionItem } from './components/accordion/accordion-item';
export { TsBreadcrumb } from './components/breadcrumb/breadcrumb';
export { TsBreadcrumbItem } from './components/breadcrumb/breadcrumb-item';
export { TsPagination } from './components/pagination/pagination';
export { TsProgress } from './components/progress/progress';
export { TsSlider } from './components/slider/slider';
export { TsSkeleton } from './components/skeleton/skeleton';
export { TsToast } from './components/toast/toast';
export { TsChip } from './components/chip/chip';
export { TsDivider } from './components/divider/divider';
export { TsPopover } from './components/popover/popover';
export { TsTree } from './components/tree/tree';
export { TsTreeItem } from './components/tree/tree-item';
export { TsSwitchGroup } from './components/switch-group/switch-group';
export { TsSwitchOption } from './components/switch-group/switch-option';
export { TsToolbar } from './components/toolbar/toolbar';
export { TsEmptyState } from './components/empty-state/empty-state';
export { TsBanner } from './components/banner/banner';
export { TsDrawer } from './components/drawer/drawer';
export { TsNav } from './components/nav/nav';
export { TsNavItem } from './components/nav/nav-item';
export { TsNavDivider } from './components/nav/nav-divider';
export { TsDatePicker } from './components/date-picker/date-picker';
export { TsFileUpload } from './components/file-upload/file-upload';
export { TsStepper } from './components/stepper/stepper';
export { TsStep } from './components/stepper/step';
export { TsGrid } from './components/grid/grid';
export { TsContainer } from './components/container/container';
export { TsStack } from './components/stack/stack';
export { TsRow } from './components/row/row';
export { TsSpacer } from './components/spacer/spacer';
export { TsVisuallyHidden } from './components/visually-hidden/visually-hidden';
export { TsRadioGroup } from './components/radio-group/radio-group';
export { TsCheckboxGroup } from './components/checkbox-group/checkbox-group';
export { TsNumberInput } from './components/number-input/number-input';
export { TsTagInput } from './components/tag-input/tag-input';
export { TsScrollArea } from './components/scroll-area/scroll-area';
export { TsPageHeader } from './components/page-header/page-header';
export { TsSidebar } from './components/sidebar/sidebar';
export { TsAppLayout } from './components/app-layout/app-layout';
export { TsTimeline } from './components/timeline/timeline';
export { TsTimelineItem } from './components/timeline/timeline-item';
export { TsCombobox } from './components/combobox/combobox';
export { TsTimePicker } from './components/time-picker/time-picker';
export { TsCommandPalette } from './components/command-palette/command-palette';
export { TsCommandPaletteItem } from './components/command-palette/command-palette-item';
export { TsForm } from './components/form/form';
export type { TsFormSubmitDetail } from './components/form/form';
