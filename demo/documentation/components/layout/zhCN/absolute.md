# 绝对
所有布局组件可以使用绝对定位。可用于让内容在盒内滚动。

<n-alert title="警告" type="warning">为保证侧边栏及其相邻布局正确显示，它们均需设置mode="absolute"。</n-alert>
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
