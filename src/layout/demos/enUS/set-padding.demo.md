# About Setting Padding

Naive-ui doesn't recommend setting padding on `n-layout` and `n-layout-aside` directly, since sometimes nested DOM structure exists in them. A better solution is to set padding on their children.

If you still want to do so, please make sure you know about their DOM structure.

```html
<n-space vertical size="large">
  <n-layout has-aside style="height: 240px;">
    <n-layout-aside style="padding: 24px;">
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
      <n-h2>... Not Recommended</n-h2>
    </n-layout-aside>
  </n-layout>
  <n-layout has-aside style="height: 240px;">
    <n-layout-aside content-style="padding: 24px;">
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
    </n-layout-aside>
  </n-layout>
</n-space>
```

```css
.n-layout-aside {
  background: rgba(128, 128, 128, 0.3);
}
```
