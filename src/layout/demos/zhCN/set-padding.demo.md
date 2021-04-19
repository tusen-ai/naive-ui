# 设定 Padding

naive-ui 不推荐直接在 `n-layout-sider` 和 `n-layout` 上设定 padding。因为他们存在嵌套的 DOM 结构，你可以使用 `content-style` 来设定可滚动内容的样式。

```html
不推荐：
<n-layout has-sider style="height: 240px; border: 1px solid #7773;">
  <n-layout-sider style="padding: 24px;">
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
  </n-layout-sider>
</n-layout>
推荐：
<n-layout has-sider style="height: 240px; border: 1px solid #7773;">
  <n-layout-sider content-style="padding: 24px;">
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
    <n-h1>Content</n-h1>
  </n-layout-sider>
</n-layout>
```
