# 使用内置滚动条

有时原生滚动条与 naive-ui 的样式不协调。可以（在 `n-layout-sider`、`n-layout` 或 `n-layout-content`）使用 naive-ui 内置的滚动条。

```html
<n-layout style="height: 480px;">
  <n-layout-header style="height: 64px;"> 酷的页头 </n-layout-header>
  <n-layout position="absolute" style="top: 64px; bottom: 64px;" has-sider>
    <n-layout-sider :native-scrollbar="false">
      <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1
      ><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1
      ><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1
      ><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1
      ><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
    </n-layout>
  </n-layout>
  <n-layout-footer position="absolute" style="height: 64px">
    酷的页脚
  </n-layout-footer>
</n-layout>
```
