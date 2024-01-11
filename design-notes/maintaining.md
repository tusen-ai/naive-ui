# 这个文档是为仓库维护者提供的

## 关于 PR 合并

1. docs、main 的 PR 都要 squash 合并。
2. 分支间的合并使用最普通的 merge 合并（一定不要 squash，不要 rebase）

## 发版流程

1. 将 docs 合并到 main（发起一个 PR，CI 过了就合并）
2. 拉下最新的 main
3. 从 main checkout 到 release 分支
4. 修改 package.json 版本号
5. npm run gen-version
6. 修改两个语言的 changelog 版本号（还有日期）
7. 把改动提交到 release 分支，git commit -m "x.x.x"
8. 将 release 分支合并到 main（发起一个 PR，CI 过了就合并）
9. 回到 main 分支拉回最新的代码
10. git clean -fdx && pnpm i && npm run release:package
11. 将 main 合并到 docs（发起一个 PR，CI 过了就合并）

## 提交信息

### Commit Message

使用 Angular Style，`feat(xxx): yyy`

#### 注意事项

- `feat(xxx)` 必须是组件，不能加 `n`，`feat(input)` ✅，`feat(n-input)` ❌
- feat 或者是 fix 的话如果有对应的 issue 的话需要自己增加 comment 如 fix #514 或者 close #514

## Changelog

- 新增属性

```
- `n-xxx` add `xxx` prop.
- `n-xxx` 新增 `xxx` 属性

注意 `xxx` 属性必须是 kebab-case，不能是 camelCase。
```

- 修复 Bug

```
- Fix `n-xxx` ...
- 修复 `n-xxx` ...
```

## PR checklist

- [ ] 我在中文文档中使用了中文的标点符号（`（`、`，`、`、`）
- [ ] 我在英文文档中使用了英文的标点符号
- [ ] 我没有在中文 API Table 的描述中使用句号
- [ ] 我在英文文档的 API Table description 中增加了句号
- [ ] 我在中文和英文以及中文和数字之间添加了空格
- [ ] 我在文档中的 prop 使用了 kebab-case
- [ ] 文档的 API 表格按照字母顺序
- [ ] feat 或者 fix 要注意有没有加 CHANGELOG
- [ ] feat 尽量增加测试
- [ ] 文档要精简，可读性好，没用的空格删除
- [ ] 代码要精简，没用的代码删除
- [ ] 测试代码不要牵扯太多无关代码，测试的方式要准确、灵活
