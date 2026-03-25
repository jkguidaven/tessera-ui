# @tessera-ui/react

React wrappers for [Tessera UI](https://github.com/jkguidaven/tessera-ui) web components.

## Installation

```bash
npm install @tessera-ui/react @tessera-ui/core
```

## Usage

```tsx
import { TsButton, TsInput } from '@tessera-ui/react';

function App() {
  return (
    <div>
      <TsInput label="Email" placeholder="you@example.com" />
      <TsButton variant="primary">Submit</TsButton>
    </div>
  );
}
```

Design tokens (CSS custom properties) are auto-imported — no additional CSS import needed.

## Documentation

- [Component docs](https://jkguidaven.github.io/tessera-ui/)
- [Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)
- [GitHub](https://github.com/jkguidaven/tessera-ui)

## License

MIT
