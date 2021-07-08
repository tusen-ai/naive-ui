# 关于设定 Padding

naive-ui 不推荐直接在 `n-layout-aside` 和 `n-layout` 上设定 padding。因为他们存在嵌套的 DOM 结构，你可以使用 `content-style` 来设定可滚动内容的样式。

```html
<n-space vertical size="large">
  <n-layout has-aside style="height: 240px;">
    <n-layout-aside style="padding: 24px;">
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
      <n-h2>... 不推荐</n-h2>
    </n-layout-aside>
  </n-layout>
  <n-layout has-aside style="height: 240px;">
    <n-layout-aside content-style="padding: 24px;">
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
      <n-h2>推荐</n-h2>
    </n-layout-aside>
  </n-layout>
</n-space>
```

```css
.n-layout-aside {
  background: rgba(128, 128, 128, 0.3);
}
```
