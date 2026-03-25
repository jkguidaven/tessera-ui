# CLAUDE.md

<!-- Claude Code reads this file automatically. -->
<!-- All project conventions and agent instructions live in the shared file below. -->

Read and follow all instructions in `.ai-instructions.md` — it is the single source of truth for this codebase.

## Quick Reference (Claude Code specific)

- Use `pnpm` not `npm` or `yarn` for all package operations.
- Requires **Node 20+** — run `nvm use` before any commands (`.nvmrc` is configured).
- The reference component is `src/components/button/` — always match that pattern.
- Design tokens use a **three-tier architecture** (reference → semantic → component). See `.ai-instructions.md` for full token guidelines.
- Global config uses **`data-*` HTML attributes** (`data-theme`, `data-density`, `data-icons`, `dir`) — never JS config objects. See "Global Configuration Pattern" in `.ai-instructions.md`.

## Keeping docs in sync

When changes affect the development workflow, tooling, scripts, conventions, or project structure, update **both** `CLAUDE.md` and `.ai-instructions.md` in the same commit. These files are the source of truth for all AI agents — stale instructions cause repeated mistakes.

## Development Workflow

### Starting dev environment

```bash
nvm use              # Switch to correct Node version
pnpm start           # Builds Stencil + starts Storybook with hot-reload
```

### Creating a new component

1. Create the component directory and five files: `.tsx`, `.css`, `.spec.ts`, `.e2e.ts`, `.stories.ts`
2. **Hand-write stories** — do NOT use `@auto-generated`. Stories must showcase all variants, sizes, states, and realistic composition examples. See `src/components/button/button.stories.ts` as reference.
3. Follow the pattern in `src/components/button/` as a reference
4. Export from `src/index.ts`
5. Use `import type { EventEmitter }` (not value import) to satisfy lint
6. Use CSS **logical properties** for RTL support (`padding-inline-start`, not `padding-left`)
7. Use **shape family tokens** for border-radius (`var(--ts-shape-interactive)`, not `var(--ts-radius-md)`)
8. For compound components (e.g., tabs + tab-panel), put the stories in the parent's file only. Create a stub file for the child: `// Stories for this component are in the parent component's stories file`

### Verification checklist (MANDATORY before committing)

Run all three checks after any component change:

```bash
pnpm build                    # Must pass — verifies all output targets compile
pnpm test                     # Must pass — unit tests (373 tests across 44 suites)
pnpm test.e2e                 # Must pass — e2e tests (154 tests across 44 suites)
npx eslint src --ext .ts,.tsx # Must have 0 errors (warnings are acceptable)
```

Do NOT commit if any of these fail. Fix the issue first.

### Storybook stories

- All stories are **hand-written** — the auto-generator is disabled for all 39 components
- Stories must NOT contain `@auto-generated` in the file (this marker triggers overwrite on build)
- When creating or updating a component, **always update its stories** to reflect new props/variants/states
- Stories should showcase: Default (with controls), Variants, Sizes, States (disabled/error/loading), Composition (realistic multi-component usage)
- Use realistic content (e.g., "Save Changes", "john@example.com") — never generic "Content" or "Label"
- Use `<ts-icon name="...">` with Lucide icon names in examples where appropriate

### Key scripts

| Command | Purpose |
|---|---|
| `pnpm start` | Full build + Stencil watch + Storybook (main dev workflow) |
| `pnpm build` | Production build |
| `pnpm test` | Unit tests |
| `pnpm test.e2e` | E2E tests |
| `pnpm storybook` | Storybook only (needs prior `pnpm build`) |
| `pnpm lint` | ESLint |
| `pnpm -C docs build` | Build docs site (needs prior `pnpm build`) |
| `pnpm version:bump` | Bump all package versions via Lerna (fixed versioning) |
| `pnpm publish:packages` | Build all packages and publish to npm via Lerna |

### Working on GitHub Issues

When assigned a GitHub issue to fix:

1. **Create a branch** from `main` named `fix/<short-description>` (or `feat/` for features)
2. **Implement the fix** — follow all verification steps below before committing
3. **Push and create a PR** using `gh pr create`, referencing the issue (e.g., `Closes #<number>`)
4. **Request a review from Copilot** using `gh pr edit <pr-number> --add-reviewer Copilot`

### Docs site

- Lives in `docs/` (Astro Starlight)
- Component API pages are auto-generated from `dist/components.json` by `docs/scripts/generate-component-docs.mjs`
- Hand-written pages (getting-started, tokens) are in `docs/src/content/docs/`
- Docs site + Storybook deployed to GitHub Pages on **release** only
