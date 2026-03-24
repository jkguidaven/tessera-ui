# Tessera UI

A framework-agnostic web component library built with **Stencil.js** and **TypeScript**. Write components once, use them everywhere — React, Vue, Angular, or vanilla HTML.

**[Documentation](https://jkguidaven.github.io/tessera-ui/)** | **[Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)** | **[npm](https://www.npmjs.com/package/@tessera-ui/core)**

## Features

- **Framework agnostic** — Web Components that work in any framework or none
- **Auto-generated bindings** — First-class React, Vue, and Angular wrappers via Stencil output targets
- **Design tokens** — Full theming via CSS custom properties (works through Shadow DOM)
- **Dark mode** — Built-in dark theme support via `data-theme="dark"`
- **Accessible** — WCAG 2.1 AA compliant, keyboard navigable, ARIA patterns
- **TypeScript** — Strict mode, fully typed props, events, and public methods
- **Tree-shakeable** — Import only the components you use

## Quick Start

### Install

```bash
# Core Web Components
npm install @tessera-ui/core

# Framework-specific wrappers (pick one)
npm install @tessera-ui/react
npm install @tessera-ui/vue
npm install @tessera-ui/angular
```

### Usage: Vanilla HTML

```html
<script type="module" src="https://unpkg.com/@tessera-ui/core/dist/tessera-ui/tessera-ui.esm.js"></script>

<ts-button variant="primary" size="lg">Get Started</ts-button>
<ts-input label="Email" type="email" placeholder="you@example.com"></ts-input>
<ts-badge variant="success" pill>Active</ts-badge>
```

### Usage: React

```tsx
import { TsButton, TsInput } from '@tessera-ui/react';

function App() {
  return (
    <div>
      <TsButton variant="primary" onTsClick={() => console.log('clicked!')}>
        Submit
      </TsButton>
      <TsInput label="Name" onTsInput={(e) => console.log(e.detail.value)} />
    </div>
  );
}
```

### Usage: Vue

```vue
<template>
  <ts-button variant="primary" @tsClick="handleClick">Submit</ts-button>
  <ts-input label="Name" @tsInput="handleInput" />
</template>

<script setup>
import { TsButton, TsInput } from '@tessera-ui/vue';

const handleClick = () => console.log('clicked!');
const handleInput = (e) => console.log(e.detail.value);
</script>
```

### Usage: Angular

```typescript
import { TesseraUIModule } from '@tessera-ui/angular';

@NgModule({
  imports: [TesseraUIModule],
})
export class AppModule {}
```

```html
<ts-button variant="primary" (tsClick)="onClick()">Submit</ts-button>
<ts-input label="Name" (tsInput)="onInput($event)"></ts-input>
```

## Components

| Component      | Tag            | Description                              |
| -------------- | -------------- | ---------------------------------------- |
| Button         | `<ts-button>`   | Actions with variants, sizes, states     |
| Input          | `<ts-input>`    | Text input with validation & labels      |
| Card           | `<ts-card>`     | Content container with elevation/slots   |
| Modal          | `<ts-modal>`    | Dialog with focus trapping & a11y        |
| Badge          | `<ts-badge>`    | Status indicators & labels               |
| Toggle         | `<ts-toggle>`   | Switch control for boolean values        |
| Alert          | `<ts-alert>`    | Contextual feedback messages             |
| Tooltip        | `<ts-tooltip>`  | Hover/focus information popups           |

## Theming

Tessera UI uses CSS custom properties for theming. Override tokens on `:root` or any container:

```css
:root {
  --ts-color-primary-500: #e63946;
  --ts-color-primary-600: #d62839;
  --ts-radius-md: 12px;
  --ts-font-family-base: 'Outfit', sans-serif;
}
```

Enable dark mode by adding `data-theme="dark"` to any ancestor element.

## Theming

Tessera UI uses a **three-tier token architecture** for maximum flexibility:

| Tier | Prefix | Purpose |
|---|---|---|
| Reference | `--ts-ref-*` | Raw palette values (never use directly) |
| Semantic | `--ts-*` | Role-based tokens (what components consume) |
| Component | `--ts-{component}-*` | Per-component overrides (customization API) |

Override component tokens to customize individual components without touching the design system:

```css
/* Customize all buttons */
ts-button {
  --ts-button-radius: 9999px;
}

/* Customize all cards */
ts-card {
  --ts-card-bg: #f0f0f0;
  --ts-card-radius: 0;
}
```

Or override semantic tokens to change the entire system:

```css
:root {
  --ts-color-interactive-primary: #e63946;
  --ts-color-interactive-primary-hover: #c1121f;
}
```

## Documentation

- **Docs site** — `https://jkguidaven.github.io/tessera-ui/` — component API reference, design tokens, getting started guides. Deployed on **release**.
- **Storybook** — `https://jkguidaven.github.io/tessera-ui/storybook/` — interactive component playground. Deployed on **release** alongside docs.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server with hot reload (Stencil watch + Storybook)
pnpm start

# Run unit tests
pnpm test

# Run E2E tests
pnpm test.e2e

# Build for production
pnpm build

# Build docs site locally
pnpm build && pnpm -C docs build
```

## Releasing

Create a [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) with a tag (e.g., `v0.2.0`). This triggers the release workflow which:

1. Builds the component library
2. Builds Storybook
3. Generates and builds the documentation site with the release version
4. Deploys docs + Storybook to GitHub Pages

## Architecture

```
Author (Stencil + TypeScript)
     ↓ compile
Web Components (Custom Elements + Shadow DOM)
     ↓ output targets
┌────────────┬────────────┬──────────────┬────────────┐
│ dist (ESM) │ React pkg  │   Vue pkg    │ Angular pkg│
└────────────┴────────────┴──────────────┴────────────┘
```

## License

MIT
