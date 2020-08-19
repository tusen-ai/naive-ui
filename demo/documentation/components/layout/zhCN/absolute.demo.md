# 绝对定位模式
所有布局组件可以使用绝对定位。如果你期望内容在固定的区域内滚动，可以使用 `absolute` 模式。

<n-alert title="注意" type="warning">如果你在边栏上设定了 `position='absolute'`，那么为了旁边的 `n-layout` 和 `n-layout-content` 正常显示，他们也要被设定为 `position='absolute'`</n-alert>
```html
<div style="width: 100%; height: 240px; position: relative">
  <n-layout position="absolute">
    <n-layout-header style="height: 64px;">
      酷的页头
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider position="absolute">
        酷的边栏
      </n-layout-sider>
      <n-layout position="absolute" style="overflow: auto;">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      酷的页脚
    </n-layout-footer>
  </n-layout>
</div>
```
