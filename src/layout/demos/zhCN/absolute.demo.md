# 绝对定位模式

所有布局组件可以使用绝对定位。如果你期望内容在固定的区域内滚动，可以使用 `absolute` 模式。

```html
<div style="width: 100%; height: 240px; position: relative">
  <n-layout position="absolute">
    <n-layout-header style="height: 64px;"> 酷的页头 </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider> 酷的边栏 </n-layout-sider>
      <n-layout>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1
        ><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1
        ><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      酷的页脚
    </n-layout-footer>
  </n-layout>
</div>
```
