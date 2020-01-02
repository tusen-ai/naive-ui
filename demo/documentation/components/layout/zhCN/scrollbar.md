# 使用内置滚动条
有时原生滚动条与naive-ui的样式不协调。可以（在侧边栏、布局或内容）使用naive-ui内置的滚动条。
```html
<n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;">
      Cool Header
    </n-layout-header>
    <n-layout mode="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider mode="absolute" :use-native-scrollbar="false">
        Cool Sider
      </n-layout-sider>
      <n-layout mode="absolute" :use-native-scrollbar="false">
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
```
