# Contributing

- For new features & bug fixes, please create pull request to `main` branch.
- For documentation, please create pull request to `docs` branch.

## Useful Commands

```bash
# open the dev server, please note that hot module reload doesn't work well
# if you find anything doesn't work, just refresh the page
# if you aren't able to open the page at the first time, try to refresh a couple of times
# pnpm version 7.0.0 and above is required
pnpm run dev

# testing
pnpm run test

# testing some component
pnpm run test -- src/xxx

# testing with coverage
pnpm run test:cov

# lint code
pnpm run lint:code

# check type
pnpm run lint:type

# lint code & type
pnpm run lint

# build site (if vercel preview failed, you might need to run `git clean -fdx` first)
pnpm run build:site
```

## About Docs and Changelog Format

- Add period `.` to each description in English API tables (and each log of changelogs).
- Don't add period `。` in any description in Chinese API tables (and any log of changelogs).
- Add space between Chinese and Latin charactors.
- Don't use Chinese punctuation in English docs.
- Don't write changelogs in a released version.
- When rebase the branch, pay attention to whether it is placed in the released version.
- Add 2.37.0 to the version of the API table.

For Example:

```
English API table:
| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| example | `any` | `undefined` | Need period. | 2.37.0 |

Chinese API table:
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| example | `any` | `undefined` | 描述不要加句号 | 2.37.0 |

English Changelog:
- Some changes, period needed.

Chinese Changelog:
- 一些变更，不要加句号

Space between Chinese and Latin charactors:
星之 star 卡比 kirby

Changelog position:

# CHANGELOG

## 2.37.0

### Feats

your changelog

### Fixes
```
