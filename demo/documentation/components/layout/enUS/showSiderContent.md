# Hide Sider Content
```html
<n-switch v-model="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      :show-content="!collapsed"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <span>Content</span>
      </n-layout-content>
      <n-layout-footer>
        <n-h1>Footer</n-h1>
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
      collapse-mode="transform"
      :show-content="!collapsed"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout 
      mode="absolute"
    >
      <span>Content</span>
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