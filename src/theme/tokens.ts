/**
 * Tessera UI — Design Token Definitions
 *
 * These are the source-of-truth token definitions.
 * They feed into Style Dictionary to generate platform-specific outputs
 * (CSS custom properties, iOS, Android, etc.)
 */

export interface TesseraTokens {
  color: {
    primary: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    danger: Record<string, string>;
    info: Record<string, string>;
  };
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  font: {
    family: Record<string, string>;
    size: Record<string, string>;
    weight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  transition: Record<string, string>;
  zIndex: Record<string, number>;
}

export const tokens: TesseraTokens = {
  color: {
    primary: {
      '50': '#eef2ff',
      '100': '#dbe4ff',
      '200': '#bac8ff',
      '300': '#91a7ff',
      '400': '#748ffc',
      '500': '#5c7cfa',
      '600': '#4c6ef5',
      '700': '#4263eb',
      '800': '#3b5bdb',
      '900': '#364fc7',
    },
    neutral: {
      '0': '#ffffff',
      '50': '#f8f9fa',
      '100': '#f1f3f5',
      '200': '#e9ecef',
      '300': '#dee2e6',
      '400': '#ced4da',
      '500': '#adb5bd',
      '600': '#868e96',
      '700': '#495057',
      '800': '#343a40',
      '900': '#212529',
    },
    success: { '500': '#40c057', '600': '#2f9e44' },
    warning: { '500': '#fab005', '600': '#f08c00' },
    danger: { '500': '#fa5252', '600': '#e03131' },
    info: { '500': '#339af0', '600': '#1c7ed6' },
  },
  spacing: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  font: {
    family: {
      base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    weight: {
      regular: 400,
      medium: 500,
      semi: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75,
    },
  },
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};
