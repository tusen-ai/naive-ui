# About Setting Padding

Naive-ui doesn't recommend setting padding on `n-layout` and `n-layout-sider` directly, since sometimes nested DOM structure exists in them. A better solution is to set padding on their children.

If you still want to do so, please make sure you know about their DOM structure.

```html
<n-space vertical size="large">
  <n-layout has-sider style="height: 240px;">
    <n-layout-sider style="padding: 24px;">
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
    </n-layout-sider>
  </n-layout>
  <n-layout has-sider style="height: 240px;">
    <n-layout-sider content-style="padding: 24px;">
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
    </n-layout-sider>
  </n-layout>
</n-space>
```

```css
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
```
