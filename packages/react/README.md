# @tessera-ui/react

React component wrappers for [Tessera UI](https://github.com/jkguidaven/tessera-ui) web components.

## Installation

```bash
npm install @tessera-ui/react @tessera-ui/core
```

## Usage

```jsx
import { TsButton, TsInput } from '@tessera-ui/react';

function App() {
  return (
    <div>
      <TsInput placeholder="Enter your name" />
      <TsButton variant="filled">Submit</TsButton>
    </div>
  );
}
```

Importing from `@tessera-ui/react` automatically loads the required CSS design tokens — no extra stylesheet imports needed.

## Peer Dependencies

- `react` >= 17.0.0
- `react-dom` >= 17.0.0
- `@tessera-ui/core` ^0.4.1

## Documentation

- [Full Documentation](https://github.com/jkguidaven/tessera-ui)
- [Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)

## License

MIT
