# Collapse Sider
Use `collapsed` prop to control status of sider.

Sider has two `collapse-mode`: `width`, `transform`. `width` will actually change width of sider, `transform` will just move sider out of layout.

Use `collapsed-width` and `width` to set sider's width.
```html
<n-switch v-model="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <p>Sider Sider Sider Sider Sider Sider</p>
    </n-layout-sider>
    <n-layout>
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
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <h1>Sider</h1>
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
      collapsed: true
    }
  }
}
```