# Repository Guidelines

## Project Structure & Module Organization

- `src/`: core Vue 3 components, composables, and styles for the library.
- `src/**/demos/`: component-level demo files, usually `*.demo.vue`.
- `demo/`: documentation site source and assets (see `demo/pages/docs/**/index.md`).
- `themes/`: theme packages (e.g. `themes/tusimple`).
- `build/` and `scripts/`: build tooling, doc transforms, and release utilities.
- `esm-test/` and `umd-test/`: compatibility test suites.
- `playground/`: local experimentation sandbox for quick checks.

## Build, Test, and Development Commands

- `pnpm run dev`: start the Vite dev server for local docs.
- `pnpm run build:site`: build the documentation site to `site/`.
- `pnpm run build:package`: build library bundles (ESM/CJS/Rollup) and run compat tests.
- `pnpm run transpile-docs`: convert markdown docs to Vue for the docs build.
- `pnpm run test`: run the main Vitest suite.
- `pnpm run test:cov`: run tests with coverage.
- `pnpm run lint`: run ESLint and TypeScript demo/type checks.
- `pnpm run format`: format source and markdown with Prettier + ESLint.

## Coding Style & Naming Conventions

- Use TypeScript and Vue SFC conventions already present in `src/` and `demo/`.
- Match existing indentation and formatting; rely on `pnpm run format` to normalize.
- Prefer kebab-case demo filenames (e.g. `size.demo.vue`) and consistent prop casing.
- Keep CSS variables and class names aligned with existing component patterns.

## Testing Guidelines

- Tests use Vitest; target a specific file with `pnpm run test -- src/xxx`.
- Compatibility tests are in `umd-test/` and `esm-test/` and run in `build:package`.
- Name tests after the component/feature they cover to ease discovery.

## Commit & Pull Request Guidelines

- Follow Conventional Commit-style prefixes (e.g. `docs(tag): ...`, `fix: ...`).
- Target `main` for features/bugs and `docs` for documentation-only changes.
- For docs, follow punctuation rules in `CONTRIBUTING.md`:
  - English API table descriptions end with `.`.
  - Chinese API table descriptions do not end with `。`.
  - Add a space between Chinese and Latin characters.
  - Use `NEXT_VERSION` in API tables and changelog entries.
- Include concise PR descriptions and screenshots for docs/visual changes.

## Local Setup Notes

- Use `pnpm` (see `package.json` for the required version); install with `pnpm install`.
