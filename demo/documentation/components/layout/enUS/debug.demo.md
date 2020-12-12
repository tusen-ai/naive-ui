# Debug

```html
<n-switch v-model:value="collapsed" />
<n-layout style="height: 480px;">
  <n-layout-header position="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout position="absolute" style="top: 64px;">
    <n-layout-sider
      position="absolute"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout position="absolute" :native-scrollbar="false">
      <n-layout-content>
        <span>Content</span>
      </n-layout-content>
      <n-layout-footer>
        <n-h1>Footer</n-h1>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</n-layout>
```

```js
export default {
  data() {
    return {
      collapsed: false
    }
  }
}
```
