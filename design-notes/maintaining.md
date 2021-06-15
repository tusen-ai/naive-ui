# 这个文档是为仓库维护者提供的

## 关于 PR 合并

1. docs、feat、main 的 PR 都要 squash 合并。
2. 分支间的合并使用最普通的 merge 合并（一定不要 squash，不要 rebase）

## 发版流程

1. 将 docs 合并到 main（发起一个 PR，CI 过了就合并）
2. 将 feat 合并到 main（发起一个 PR，CI 过了就合并）
3. 拉下最新的 main
4. 从 main checkout 到 release 分支
5. 修改 package.json 版本号
6. npm run gen-version
7. 修改两个语言的 changelog 版本号
8. 把改动提交到 release 分支，git commit -m "x.x.x"
9. 将 release 分支合并到 main（发起一个 PR，CI 过了就合并）
10. 回到 main 分支拉回最新的代码
11. git clean -fdx && npm i && npm run release:package
12. 将 main 合并到 docs（发起一个 PR，CI 过了就合并）
13. 将 main 合并到 feat（发起一个 PR，CI 过了就合并）
