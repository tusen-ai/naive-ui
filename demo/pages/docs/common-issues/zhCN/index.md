# 常见问题

## 1. @update:xxx 和 on-update:xxx 的区别

### 情况 1

如果你没有在同一个组件上同时使用 `v-model:xxx` 和 `on-update:xxx`，`@update:xxx` 和 `on-update:xxx` 在模版中使用时没有任何区别。

在 Naive UI 中，全部的 API 文档使用 `on-update:xxx` 格式，因为 `@` 只是 Vue 提供的一种简写。

如果你偏爱 camelCase，可以使用 `onUpdate:xxx`。

如果你在使用 JSX，可以使用 `onUpdateXxx`（所有的 `onUpdate:xxx` 都有一个 `onUpdateXxx` 的对等实现）。

### 情况 2

如果你在一个组件上使用了 `v-model:xxx`，你应该使用 `@update:xxx`。

✅ 例子 `<n-input v-model:value="xxx" @update:value="yyy" />`。

❌ 例子 `<n-input v-model:value="xxx" :on-update:value="yyy" />`。

这是因为 `v-model:value="xxx"` 会被转化为 `:onUpdate:value="xxx"`。如果你同时使用了 `@update:value="yyy"`，他们会被转化为 `:onUpdate:value="[xxx, yyy]"`，然后 Naive UI 会来处理这种情况。

然而如果你使用了 `on-update:value="yyy"`，Vue 会生成类似于 `:onUpdate:value="xxx" :on-update-value="yyy"` 的代码，然后第二个属性会在运行时覆盖掉第一个，`v-model:value` 会崩掉。

如果你发现任何问题，欢迎在 GitHub 上提交 issue 和 PR。
