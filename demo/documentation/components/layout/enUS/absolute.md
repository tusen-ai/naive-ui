# Absolute
All layout components can use absolute positioning. It can be used when you want content scrolling inside fixed area.

<n-alert title="Caveat" type="warning">If you have set mode=`'absolute'` on sider and want the sider and its adjacent layout or layout-content to display in right manner, you should apply mode=`'absolute'` on layout or layout-content too.</n-alert>
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