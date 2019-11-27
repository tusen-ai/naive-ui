# Debug
```html
<n-switch v-model="collapsed" />
<n-layout style="height: 480px;">
  <n-layout-header mode="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout mode="absolute" style="top: 64px;">
    <n-layout-sider
      mode="absolute"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <h1>Sider</h1>
    </n-layout-sider>
    <n-layout mode="absolute" :use-native-scrollbar="false">
      <n-layout-content>
        <span>Content</span>
      </n-layout-content>
      <n-layout-footer>
        <h1>Footer</h1>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</n-layout>
```
```js
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
```