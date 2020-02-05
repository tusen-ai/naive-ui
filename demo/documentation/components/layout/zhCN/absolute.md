# 绝对定位模式
所有布局组件可以使用 Absolute 定位。如果你期望内容在固定的区域内滚动，可以使用 `absolute` 模式。

<n-alert title="警告" type="warning">如果你在 Sider 上设定了 mode=`'absolute'`，那么为了旁边的 Layout 和 Layout Content 正常显示，他们也要被设定为 mode=`'absolute'`</n-alert>
```html
<div style="width: 100%; height: 240px; position: relative">
  <n-layout mode="absolute">
    <n-layout-header style="height: 64px;">
      Cool Header
    </n-layout-header>
    <n-layout mode="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider mode="absolute">
        Cool Sider
      </n-layout-sider>
      <n-layout mode="absolute">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer mode="absolute" style="height: 64px">
      Cool Footer
    </n-layout-footer>
  </n-layout>
</div>
```
