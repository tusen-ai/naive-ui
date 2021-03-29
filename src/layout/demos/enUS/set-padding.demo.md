# Set Padding

Naive-ui doesn't recommend setting padding on `n-layout` and `n-layout-sider` directly, since sometimes nested DOM structure exists in them. A better solution is to set padding on their children.

If you still want to do so, please make sure you know about their DOM structure.

```html
Not Recommended:
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
Recommended:
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
