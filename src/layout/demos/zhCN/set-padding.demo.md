# 设定 Padding

naive-ui 不推荐直接在 `n-layout-sider` 和 `n-layout` 上设定 padding。因为在某些情况下他们会存在嵌套的 DOM 结构，更好的办法是为传入的内容添加 padding。

如果你一定要这么做，确保你对于他们的 DOM 结构足够了解。

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
  <n-layout-sider>
    <div style="width: 100%; padding: 24px; box-sizing: border-box;">
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
      <n-h1>Content</n-h1>
    </div>
  </n-layout-sider>
</n-layout>
```
