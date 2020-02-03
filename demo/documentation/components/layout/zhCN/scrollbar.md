# 使用内置滚动条
有时原生滚动条与 naive-ui 的样式不协调。可以（在 Sider、Layout 或 Layout Content）使用 naive-ui内置的滚动条。
```html
<n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;">
      酷的页头
    </n-layout-header>
    <n-layout mode="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider mode="absolute" :use-native-scrollbar="false">
        酷的边栏
      </n-layout-sider>
      <n-layout mode="absolute" :use-native-scrollbar="false">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer mode="absolute" style="height: 64px">
      酷的页脚
    </n-layout-footer>
  </n-layout>
```
