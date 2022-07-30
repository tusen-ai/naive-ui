# 贡献代码

- 对于新特性和 bug fix，请对 `main` 分支提交 Pull Request
- 对于文档更新，请对 `docs` 分支提交 Pull Request

## 有用的指令

```bash
# 开启开发服务器，注意热更新不是很好用
# 如果你觉得哪里有问题，刷新页面即可
# 第一次运行打不开时，你可以试试刷新几次浏览器
# 需要 pnpm 在 7.0.0 及以上版本
pnpm run dev

# 测试
pnpm run test

# 测试某个组件
pnpm run test -- src/xxx

# 生成覆盖率报告
pnpm run test:cov

# 检查代码风格
pnpm run lint:code

# 检查类型
pnpm run lint:type

# 上面俩个都检查
pnpm run lint

# 构建文档网站（如果 vercel 的预览挂掉了，你可能需要先运行一下 `git clean -fdx`）
pnpm run build:site
```

## 关于文档和变更日志的格式

- 每一条英文的变更日志和英文的 API 表中的 description 都需要加英文句号 `.`
- 不要在中文 API 表和中文的变更日志中加句号
- 在每一个中文和拉丁字母（数字）之间要加空格
- 不要在英文文档中使用中文标点
- 不要写在已经发布的版本中
- rebase 分支时注意是否放到已发布的版本中
- 添加 NEXT_VERSION 到 API 表格的版本上

例如:

```
英文 API 表格：
| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| example | `any` | `undefined` | Need period. | NEXT_VERSION |

中文 API 表格：
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| example | `any` | `undefined` | 描述不要加句号 | NEXT_VERSION |

English Changelog:
- Some changes, period needed.

Chinese Changelog:
- 一些变更，不要加句号

中英文之间要加空格：
星之 star 卡比 kirby

Changelog 位置：

# CHANGELOG

## NEXT_VERSION

### Feats

你的 changelog

### Fixes
```
