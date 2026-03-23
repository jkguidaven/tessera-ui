# GitHub Copilot Instructions — Tessera UI

<!-- GitHub Copilot reads this file for repository-level context. -->
<!-- All project conventions and agent instructions live in `.ai-instructions.md` at the repo root. -->
<!-- Read that file FIRST for full architecture, conventions, and task reference. -->

## Project Summary

**Tessera UI** is a framework-agnostic web component library built with **Stencil.js** and **TypeScript**. Components are authored once as Web Components and automatically compiled to first-class React, Vue, and Angular wrappers.

## Key Conventions for Code Completion

- **Package manager**: `pnpm` only. Never suggest `npm` or `yarn`.
- **Component prefix**: All custom element tags start with `ts-` (e.g., `<ts-button>`, `<ts-modal>`).
- **Component structure**: Every component has five files in `src/components/<name>/`: `.tsx`, `.css`, `.spec.ts`, `.e2e.ts`, `.stories.ts`.
- **CSS tokens only**: Never use raw color/size values. Always use `--ts-*` custom properties from `src/theme/tokens.css`.
- **TypeScript strict**: `"strict": true`. No `any`. Use `import type` for type imports.
- **Stencil decorators**: `@Prop()`, `@Event()`, `@State()`, `@Method()`, `@Element()`. Always add JSDoc.
- **Event naming**: Custom events use `q` prefix: `tsClick`, `tsChange`, `tsInput`, `tsClose`, etc.
- **Event config**: All custom events must use `{ bubbles: true, composed: true }` to cross Shadow DOM.
- **Accessibility**: All interactive elements need keyboard support, ARIA attributes, and focus management.
- **Shadow DOM**: All components use Shadow DOM. Consumer theming is via CSS custom properties only.

## Reference Files

- `src/components/button/button.tsx` — canonical component example
- `src/theme/tokens.css` — all design tokens
- `src/types/index.ts` — shared type definitions
- `src/utils/aria.ts` — accessibility helpers
- `stencil.config.ts` — build configuration with output targets
- `.ai-instructions.md` — full agent instructions (read this for complete context)
