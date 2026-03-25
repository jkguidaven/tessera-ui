# @tessera-ui/angular

Angular component wrappers for [Tessera UI](https://github.com/jkguidaven/tessera-ui) web components.

## Installation

```bash
npm install @tessera-ui/angular @tessera-ui/core
```

## Usage

```typescript
import { DIRECTIVES } from '@tessera-ui/angular';

@Component({
  standalone: true,
  imports: [DIRECTIVES],
  template: `
    <ts-input placeholder="Enter your name"></ts-input>
    <ts-button variant="filled">Submit</ts-button>
  `,
})
export class AppComponent {}
```

Importing from `@tessera-ui/angular` automatically loads the required CSS design tokens — no extra stylesheet imports needed.

## Peer Dependencies

- `@angular/core` >= 17.0.0
- `@tessera-ui/core` ^0.4.1

## Documentation

- [Full Documentation](https://github.com/jkguidaven/tessera-ui)
- [Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)

## License

MIT
