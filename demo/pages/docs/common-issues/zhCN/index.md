# 常见问题

## 1. @update:xxx 和 on-update:xxx 的区别

`@update:xxx` 和 `on-update:xxx` 在模版中使用时没有任何区别。

在 Naive UI 中，全部的 API 文档使用 `on-update:xxx` 格式，因为 `@` 只是 Vue 提供的一种简写。

如果你偏爱 camelCase，可以使用 `onUpdate:xxx`。

如果你在使用 JSX，可以使用 `onUpdateXxx`（所有的 `onUpdate:xxx` 都有一个 `onUpdateXxx` 的对等实现）。

如果你发现任何问题，欢迎在 GitHub 上提交 issue 和 PR。
