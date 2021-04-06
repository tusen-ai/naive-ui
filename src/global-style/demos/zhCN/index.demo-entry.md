# 全局样式 Global Style

出于以下原因，你可能需要将某些样式设定在 `document.body` 上。

1. naive-ui 会设定一些非响应式的全局样式（例如字体），它们在默认状况下工作良好，但是不能响应主题的变化。
2. `n-config-provider` 无法将全局样式同步到它以外的地方（例如 body 背景色）。

通过使用 `n-global-style` 可以将常见的全局样式同步到 body 上。在下面的例子中，`n-global-style` 会将 `n-config-provider` 提供的主题同步到 `document.body` 上。

## 用法

```html
// 跟随 n-config-provider 的主题
<n-config-provider>
  <n-global-style />
  ...
</n-config-provider>
```
