# Contributing

- For new features & bug fixes, please create pull request to `main` branch.
- For documentation, please create pull request to `docs` branch.

## Useful Commands

```bash
# open the dev server, please note that hot module reload doesn't work well
# if you find anything doesn't work, just refresh the page
# if you aren't able to open the page at the first time, try to refresh a couple of times
npm run dev

# testing
npm run test

# testing some component
npm run test -- src/xxx

# testing with coverage
npm run test:cov

# lint code
npm run lint:code

# check type
npm run lint:type

# lint code & type
npm run lint

# build site (if vercel preview failed, you might need to run `git clean -fdx` first)
npm run build:site
```

## About Docs and Changelog Format

- Add period `.` to each description in English API tables (and each log of changelogs).
- Don't add period `。` in any description in Chinese API tables (and any log of changelogs).
- Add space bewteen Chinese and Latin charactors.
- Don't use Chinese punctuation in English docs.
- Don't write changelogs in a released version.
- When rebase the branch, pay attention to whether it is placed in the released version.

For Example:

```
English API table:
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| example | `any` | `undefined` | Need period. |

Chinese API table:
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| example | `any` | `undefined` | 描述不要加句号 |

English Changelog:
- Some changes, period needed.

Chinese Changelog:
- 一些变更，不要加句号

Space bewteen Chinese and Latin charactors:
星之 star 卡比 kirby

Changelog position:

# CHANGELOG

## Pending

### Feats

your changelog

### Fixes
```

# 贡献代码

- 对于新特性和 bug fix，请对 `main` 分支提交 Pull Request
- 对于文档更新，请对 `docs` 分支提交 Pull Request

## 有用的指令

```bash
# 开启开发服务器，注意热更新不是很好用
# 如果你觉得哪里有问题，刷新页面即可
# 第一次运行打不开时，你可以试试刷新几次浏览器
npm run dev

# 测试
npm run test

# 测试某个组件
npm run test -- src/xxx

# 生成覆盖率报告
npm run test:cov

# 检查代码风格
npm run lint:code

# 检查类型
npm run lint:type

# 上面俩个都检查
npm run lint

# 构建文档网站（如果 vercel 的预览挂掉了，你可能需要先运行一下 `git clean -fdx`）
npm run build:site
```

## 关于文档和变更日志的格式

- 每一条英文的变更日志和英文的 API 表中的 description 都需要加英文句号 `.`
- 不要在中文 API 表和中文的变更日志中加句号
- 在每一个中文和拉丁字母（数字）之间要加空格
- 不要在英文文档中使用中文标点
- 不要写在已经发布的版本中
- rebase 分支时注意是否放到已发布的版本中

例如:

```
英文 API 表格：
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| example | `any` | `undefined` | Need period. |

中文 API 表格：
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| example | `any` | `undefined` | 描述不要加句号 |

English Changelog:
- Some changes, period needed.

Chinese Changelog:
- 一些变更，不要加句号

中英文之间要加空格：
星之 star 卡比 kirby

Changelog 位置：

# CHANGELOG

## Pending

### Feats

你的 changelog

### Fixes
```
