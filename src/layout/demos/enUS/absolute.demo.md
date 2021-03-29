# Absolute Position

All layout components can use absolute positioning. It can be used when you want content scrolling inside fixed area.

```html
<div style="width: 100%; height: 240px; position: relative">
  <n-layout position="absolute">
    <n-layout-header style="height: 64px;"> Cool Header </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider> Cool Sider </n-layout-sider>
      <n-layout style="overflow: auto;">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1
        ><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1
        ><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      Cool Footer
    </n-layout-footer>
  </n-layout>
</div>
```
