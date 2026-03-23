# CLAUDE.md

<!-- Claude Code reads this file automatically. -->
<!-- All project conventions and agent instructions live in the shared file below. -->

Read and follow all instructions in `.ai-instructions.md` — it is the single source of truth for this codebase.

## Quick Reference (Claude Code specific)

- Use `pnpm` not `npm` or `yarn` for all package operations.
- Run `pnpm test` after modifying any component to verify nothing breaks.
- Run `pnpm build` before committing to verify all output targets compile.
- The reference component is `src/components/button/` — always match that pattern.
- When creating new components, create all five files: `.tsx`, `.css`, `.spec.ts`, `.e2e.ts`, `.stories.ts`.
