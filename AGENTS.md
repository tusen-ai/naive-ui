# Agent Guide for Naive UI

This file provides guidance to AI coding agents when working on the [Naive UI](https://github.com/tusen-ai/naive-ui) repository.

## Important Notes

- Vue 3 + TypeScript component library. Source is in `src/`.
- Package manager: pnpm (`11.10.0`). Node: `>=20`.
- Use English in code and comments. Keep comments meaningful and concise.
- Do not change public APIs or user-facing behavior unless requested.

## Build and Development Commands

```bash
# Start documentation site dev server
pnpm run dev

# Run all unit tests
pnpm run test

# Run tests for a specific component
pnpm run test src/button

# Update snapshots
pnpm run test:update

# Lint code and types
pnpm run lint

# Auto-fix lint issues
pnpm run lint:fix

# Format code
pnpm run format

# Full library build
pnpm run build:package

# Production docs site build
pnpm run build:site
```

## Architecture Overview

```
naive-ui/
├── src/                  # Component library source
│   ├── _internal/        # Internal helper components
│   ├── _mixins/          # Shared composables: useTheme, useConfig, useFormItem, etc.
│   ├── _styles/          # Global theme tokens
│   ├── _utils/           # Utility modules
│   ├── <component>/      # One directory per public component
│   │   ├── index.ts      # Public exports
│   │   ├── src/          # Component implementation (.tsx)
│   │   ├── styles/       # Theme vars (light.ts / dark.ts / _common.ts / rtl.ts)
│   │   ├── demos/        # Documentation demos
│   │   └── tests/        # Vitest specs
│   ├── composables/      # Public composables
│   ├── locales/          # i18n locale objects
│   ├── themes/           # Theme definitions
│   ├── components.ts     # Aggregated component exports
│   ├── preset.ts         # Default plugin
│   ├── create.ts         # Plugin factory
│   └── vitest-setup.ts   # Test environment polyfills
├── demo/                 # Documentation site source
├── build/                # Custom Vite plugins and build helpers
├── scripts/              # Build/release scripts
├── themes/tusimple/      # Tusimple-branded theme overrides
├── generic/              # Generic Vue component wrappers
├── esm-test/             # Smoke test for ES build
├── umd-test/             # Smoke test for UMD build
└── coverage/             # Vitest coverage output
```

## Component Conventions

- Props are declared as `componentProps` and exported from `index.ts`.
- Component implementation lives in `src/Component.tsx` using `defineComponent` + JSX.
- Styles live in `src/styles/index.cssr.ts` as CSS-render strings.
- Theme variables live in `styles/light.ts`, `styles/dark.ts`, and `styles/_common.ts`.
- Tests live in `tests/Component.spec.tsx`.

## Key Development Patterns

- Use shared mixins from `src/_mixins/`: `useConfig`, `useTheme`, `useThemeClass`, `useFormItem`, `useLocale`, `useRtl`.
- CSS class naming follows BEM: `.n-button`, `.n-button--primary`, `.n-button__icon`.
- Theme variable naming follows `<component><State><Variant>` order, e.g. `buttonColorErrorHover`.
- Use named imports and `h` from `vue` for JSX.

## Code Style

- Do not fix formatting manually. Use `pnpm run lint:fix` and `pnpm run format` to let the tools handle it.
- Prettier: `semi: false`, `singleQuote: true`, `printWidth: 80`, `trailingComma: none`.
- ESLint: `@antfu/eslint-config` with a few project-specific overrides.
- File naming: kebab-case directories, PascalCase component files.
- TypeScript strict mode enabled.

## Testing Approach

- Vitest with `jsdom` and `@vue/test-utils`.
- `src/vitest-setup.ts` polyfills browser APIs.
- When a change only affects a single component, run only that component's tests first: `pnpm run test src/<component>`.
- Add tests for new props or behaviors. Keep tests focused.

## Commit Message Format

Use Angular style:

```
feat(button): add ghost prop
fix(input): handle empty value correctly
docs: update contributing guide
```

## Pull Requests

- Prefer the `gh` CLI when interacting with GitHub (listing PRs, checking CI status, creating PRs, etc.).
- Always follow `.github/pull_request_template.md` when creating a PR.
- Keep PR titles and descriptions factual and concise.
- Do not add AI-tool branding or co-author trailers.
- If public APIs or user-facing behavior change, update docs and call out the impact in the PR template.

## Debugging

- Use `chrome-devtools-mcp` (Chrome DevTools Protocol) for browser debugging: inspecting elements, capturing screenshots, monitoring network requests, running performance traces, and executing scripts in the page context.

## Useful References

- `package.json` — scripts, dependencies
- `vite.config.mts` — dev server, aliases, test config
- `tsconfig.json` — TypeScript config
- `eslint.config.mjs` — lint rules
- `CONTRIBUTING.md` — contribution workflow
- `design-notes/maintaining.md` — release process
- `design-notes/how-to-name-a-style-var.md` — theme variable naming guide
