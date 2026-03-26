<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/logo-light.svg">
  <img alt="Tessera UI" src="assets/logo-light.svg" width="320">
</picture>

[![npm version](https://img.shields.io/npm/v/@tessera-ui/core?label=%40tessera-ui%2Fcore&color=4285f4)](https://www.npmjs.com/package/@tessera-ui/core)
[![npm version](https://img.shields.io/npm/v/@tessera-ui/react?label=%40tessera-ui%2Freact&color=61dafb)](https://www.npmjs.com/package/@tessera-ui/react)
[![npm version](https://img.shields.io/npm/v/@tessera-ui/vue?label=%40tessera-ui%2Fvue&color=42b883)](https://www.npmjs.com/package/@tessera-ui/vue)
[![npm version](https://img.shields.io/npm/v/@tessera-ui/angular?label=%40tessera-ui%2Fangular&color=dd0031)](https://www.npmjs.com/package/@tessera-ui/angular)
[![CI](https://github.com/jkguidaven/tessera-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/jkguidaven/tessera-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A production-ready UI component library with native support for **React**, **Vue**, **Angular**, and **vanilla HTML**. 71 accessible, themeable components — one library for every framework.

**[Documentation](https://jkguidaven.github.io/tessera-ui/)** | **[Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)** | **[npm](https://www.npmjs.com/package/@tessera-ui/core)**

## Features

- **One library, every framework** — Native packages for React, Vue, Angular, and vanilla HTML
- **71 components** — From buttons and inputs to data tables, command palettes, and layout shells
- **Zero-config setup** — One import, components just work. No manual registration or CSS imports
- **Design tokens** — Full theming via CSS custom properties with three-tier token architecture
- **Dark mode + density** — Light, dark, and high-contrast themes. Compact, comfortable, and spacious density
- **Accessible** — WCAG 2.1 AA compliant, keyboard navigable, ARIA patterns, forced-colors support
- **TypeScript** — Fully typed props, events, and public methods across all framework packages

## Quick Start

### Install

```bash
# Pick your framework (each includes @tessera-ui/core as a dependency)
npm install @tessera-ui/react     # React
npm install @tessera-ui/vue       # Vue
npm install @tessera-ui/angular   # Angular

# Or use the core package directly (vanilla / any framework)
npm install @tessera-ui/core
```

### Vanilla HTML (CDN)

No build step needed — just add a script tag:

```html
<script type="module" src="https://unpkg.com/@tessera-ui/core/dist/tessera-ui/tessera-ui.esm.js"></script>

<ts-button variant="primary">Get Started</ts-button>
<ts-input label="Email" type="email" placeholder="you@example.com"></ts-input>
```

### Vanilla (Bundler — Vite, Webpack, etc.)

```js
import '@tessera-ui/core';
```

That's it. All 71 components are registered and design tokens are injected. Use them in your HTML:

```html
<ts-button variant="primary">Get Started</ts-button>
<ts-input label="Email" type="email" placeholder="you@example.com"></ts-input>
```

### React

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

### Vue

```vue
<template>
  <TsButton variant="primary" @tsClick="handleClick">Submit</TsButton>
  <TsInput label="Name" @tsInput="handleInput" />
</template>

<script setup>
import { TsButton, TsInput } from '@tessera-ui/vue';

const handleClick = () => console.log('clicked!');
const handleInput = (e) => console.log(e.detail.value);
</script>
```

> **Note:** Add `isCustomElement` to your Vite config so Vue doesn't warn about `ts-*` tags:
> ```js
> // vite.config.js
> vue({
>   template: {
>     compilerOptions: {
>       isCustomElement: (tag) => tag.startsWith('ts-'),
>     },
>   },
> })
> ```

### Angular

Import `DIRECTIVES` and add `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DIRECTIVES } from '@tessera-ui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DIRECTIVES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ts-button variant="primary" (tsClick)="onClick()">Submit</ts-button>
    <ts-input label="Name" (tsInput)="onInput($event)"></ts-input>
  `,
})
export class AppComponent {
  onClick() { console.log('clicked!'); }
  onInput(e: Event) { console.log((e as CustomEvent).detail.value); }
}
```

## Documentation

- **[Docs site](https://jkguidaven.github.io/tessera-ui/)** — Component API reference, design tokens, getting started guides
- **[Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)** — Interactive component playground with all variants and states
- **[Component list](https://jkguidaven.github.io/tessera-ui/components/)** — Full list of 71 components with API docs

## Development

```bash
pnpm install       # Install dependencies
pnpm start         # Dev server with hot reload + Storybook
pnpm test          # Unit tests
pnpm test.e2e      # E2E tests
pnpm build         # Production build
```

## License

MIT
