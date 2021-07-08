# 使用边框

aside、footer、header 可以设定 `bordered`。

```html
<n-layout has-aside>
  <n-layout-aside bordered content-style="padding: 24px;"
    >海淀桥</n-layout-aside
  >
  <n-layout>
    <n-layout-header bordered>颐和园路</n-layout-header>
    <n-layout-content content-style="padding: 24px;">平山道</n-layout-content>
    <n-layout-footer bordered>成府路</n-layout-footer>
  </n-layout>
</n-layout>
```

```css
.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
```
