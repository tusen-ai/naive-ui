# Trigger Button
```html
<n-switch v-model="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      show-trigger
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <h1>Sider</h1>
    </n-layout-sider>
    <n-layout style="padding: 24px;">
      <n-layout-content>
        <span>Content</span>
      </n-layout-content>
      <n-layout-footer>
        <h1>Footer</h1>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</n-layout>
<n-layout style="height: 240px;">
  <n-layout-header mode="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout mode="absolute" style="top: 64px;">
    <n-layout-sider
      mode="absolute"
      show-trigger
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <h1>Sider</h1>
    </n-layout-sider>
    <n-layout 
      mode="absolute"
      style="padding: 24px;"
    >
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