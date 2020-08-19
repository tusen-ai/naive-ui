# Use Built-in Scrollbar
Sometimes you will find native scrollbar doesn't meet the style of naive-ui. You can use built-in scrollbar of naive-ui (on `n-layout-sider`, `n-layout` or `n-content`).
```html
<n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;">
      Cool Header
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider position="absolute" :use-native-scrollbar="false">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout-sider>
      <n-layout position="absolute" :use-native-scrollbar="false">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      Cool Footer
    </n-layout-footer>
  </n-layout>
```
