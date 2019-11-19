# Use Built-in Scrollbar
Sometimes you will find native scrollbar doesn't meet the style of naive-ui. You can use build-in scrollbar of naive-ui (on sider, layout or content).
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
```