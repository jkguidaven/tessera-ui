# @tessera-ui/angular

Angular wrappers for [Tessera UI](https://github.com/jkguidaven/tessera-ui) web components.

## Installation

```bash
npm install @tessera-ui/angular @tessera-ui/core
```

## Usage

```typescript
import { DIRECTIVES } from '@tessera-ui/angular';

@Component({
  imports: [DIRECTIVES],
  template: `
    <ts-input label="Email" placeholder="you@example.com"></ts-input>
    <ts-button variant="primary">Submit</ts-button>
  `,
})
export class AppComponent {}
```

Design tokens (CSS custom properties) are auto-imported — no additional CSS import needed.

## Documentation

- [Component docs](https://jkguidaven.github.io/tessera-ui/)
- [Storybook](https://jkguidaven.github.io/tessera-ui/storybook/)
- [GitHub](https://github.com/jkguidaven/tessera-ui)

## License

MIT
