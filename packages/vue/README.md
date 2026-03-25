# @tessera-ui/vue

Vue 3 component wrappers for [Tessera UI](https://github.com/jkguidaven/tessera-ui) web components.

## Installation

```bash
npm install @tessera-ui/vue @tessera-ui/core
```

## Usage

```vue
<script setup>
import { TsButton, TsInput } from '@tessera-ui/vue';
</script>

<template>
  <TsInput placeholder="Enter your name" />
  <TsButton variant="filled">Submit</TsButton>
</template>
```

Importing from `@tessera-ui/vue` automatically loads the required CSS design tokens — no extra stylesheet imports needed.

## Peer Dependencies

- `vue` >= 3.3.0
- `@tessera-ui/core` ^0.4.1

## Documentation

- [Full Documentation](https://github.com/jkguidaven/tessera-ui)
- [Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)

## License

MIT
