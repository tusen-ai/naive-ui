# Repository Guidelines

## Project Structure & Module Organization

- `src/`: components, usually `src/<component>/` with `src/`, `styles/`, `demos/enUS|zhCN`, `tests/`
- `demo/`: docs/site source
- `build/` and `scripts/`: build/release/docs tooling
- `themes/tusimple/`: theme package
- `esm-test/` and `umd-test/`: compatibility smoke tests
- `playground/`: local experiments

## Build, Test, and Development Commands

- `pnpm run dev`: start local Vite docs/dev server.
- `pnpm run lint`: run ESLint + type checks.
- `pnpm run test`: run Vitest.
- `pnpm run test -- src/button/tests/Button.spec.tsx`: run one test file.
- `pnpm run test:cov`: run with coverage.
- `pnpm run test:update`: update snapshots intentionally.
- `pnpm run format`: apply Prettier + ESLint fixes.
- `pnpm run build:package`: build `es`, `lib`, `dist`.
- `pnpm run build:site`: production docs/site build.

## Coding Style & Naming Conventions

Use TypeScript-first patterns and existing component structure.

- Prettier: single quotes, no semicolons, width 80 (`.prettierrc`)
- ESLint: `@antfu/eslint-config` (`eslint.config.mjs`)
- Components/classes: PascalCase
- Folders and feature modules: kebab-case (`button-group`, `dynamic-input`)
- Demo files: `*.demo.vue`
- Tests: `*.spec.ts(x)` and `server.spec.tsx`

## Testing Guidelines

Use Vitest with `@vue/test-utils` and jsdom. Keep tests in `src/<component>/tests/`. For rendering-sensitive changes, cover browser (`*.spec.ts(x)`) and SSR (`server.spec.tsx`). Review snapshot diffs before commit.

## Commit & Pull Request Guidelines

Follow Conventional Commits used in history:

- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `chore: ...`

Reference PR numbers when possible (example: `fix(select): ... (#7483)`). Open feature/bugfix PRs to `main`; docs-only PRs to `docs` (`CONTRIBUTING.md`). Include summary, tests for behavior changes, and docs/changelog updates when needed.

## Documentation & Changelog Conventions

For docs/changelog edits, follow `CONTRIBUTING.md`:

- English API/changelog text should end with a period `.`
- Chinese API/changelog text should not end with `。`
- Add a space between Chinese and Latin characters
- Use `NEXT_VERSION` in API table version cells and changelog entries
