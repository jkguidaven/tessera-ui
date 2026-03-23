# CLAUDE.md

<!-- Claude Code reads this file automatically. -->
<!-- All project conventions and agent instructions live in the shared file below. -->

Read and follow all instructions in `.ai-instructions.md` — it is the single source of truth for this codebase.

## Quick Reference (Claude Code specific)

- Use `pnpm` not `npm` or `yarn` for all package operations.
- Requires **Node 20+** — run `nvm use` before any commands (`.nvmrc` is configured).
- The reference component is `src/components/button/` — always match that pattern.

## Keeping docs in sync

When changes affect the development workflow, tooling, scripts, conventions, or project structure, update **both** `CLAUDE.md` and `.ai-instructions.md` in the same commit. These files are the source of truth for all AI agents — stale instructions cause repeated mistakes.

## Development Workflow

### Starting dev environment

```bash
nvm use              # Switch to correct Node version
pnpm start           # Builds Stencil + starts Storybook with hot-reload
```

### Creating a new component

1. Create the component directory and four files: `.tsx`, `.css`, `.spec.ts`, `.e2e.ts`
2. Stories are **auto-generated** by the Stencil build — do NOT create `.stories.ts` manually
3. Follow the pattern in `src/components/button/` as a reference
4. Export from `src/index.ts`
5. Use `import type { EventEmitter }` (not value import) to satisfy lint

### Verification checklist (MANDATORY before committing)

Run all three checks after any component change:

```bash
pnpm build                    # Must pass — verifies all output targets compile
pnpm test                     # Must pass — unit tests (50 tests across 8 suites)
pnpm test.e2e                 # Must pass — e2e tests (26 tests across 8 suites)
npx eslint src --ext .ts,.tsx # Must have 0 errors (warnings are acceptable)
```

Do NOT commit if any of these fail. Fix the issue first.

### Auto-generated Storybook stories

- `scripts/storybook-output-target.js` generates `.stories.ts` files on every Stencil build
- Files with `// @auto-generated` marker are overwritten on each build
- To hand-write stories: remove the `@auto-generated` marker — the generator will skip that file
- Adding/removing `@Prop()` on a component automatically updates its stories on next build

### Key scripts

| Command | Purpose |
|---|---|
| `pnpm start` | Full build + Stencil watch + Storybook (main dev workflow) |
| `pnpm build` | Production build |
| `pnpm test` | Unit tests |
| `pnpm test.e2e` | E2E tests |
| `pnpm storybook` | Storybook only (needs prior `pnpm build`) |
| `pnpm lint` | ESLint |
