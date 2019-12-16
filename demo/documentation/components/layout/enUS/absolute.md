# Absolute
All layout components can use absolute positioning. It can be used when you want content scrolling inside a box.

<n-alert title="Caveat" type="warning">If you want to sider and its nearby layout display in right manner, you should apply mode="absolute" on both of them.</n-alert>
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
        <h1>Long</h1><h1>Long</h1><h1>Long</h1>
        <h1>Long</h1><h1>Long</h1><h1>Long</h1>
        <h1>Long</h1><h1>Long</h1><h1>Long</h1>
        <h1>Long</h1><h1>Long</h1><h1>Long</h1>
      </n-layout>
    </n-layout>
    <n-layout-footer mode="absolute" style="height: 64px">
      Cool Footer
    </n-layout-footer>
  </n-layout>
</div>
```