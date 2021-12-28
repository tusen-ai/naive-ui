# 样式元素位置

有时你可能希望控制样式元素插入的位置。

例如，如果你使用了 tailwind 的 reset 样式，你不希望它被插入 naive-ui 样式的后面，因为这可能会覆盖按钮等组件的样式。

你可以在 `head` 元素中加入一个 `<meta name="naive-ui-style" />` 元素，naive-ui 会把所有的样式刚好插入这个元素的前面。

同时，naive-ui 依赖 [vueuc](https://github.com/07akioni/vueuc)。如果你需要（通常应该不会），它的样式位置可以通过 `<meta name="vueuc-style" />` 控制。

```html
<head>
  <xxx />
  <!-- naive-ui 的样式会出现在这里 -->
  <meta name="naive-ui-style" />
  <!-- vueuc's 的样式会出现在这里 -->
  <meta name="vueuc-style" />
  <xxx />
</head>
```
