# Collapse Sider
Use `collapsed` prop to control status of sider.

Sider has two `collapse-mode`: `width`, `transform`. `width` will actually change width of sider, `transform` will just move sider out of layout.

Use `collapsed-width` and `width` to set sider's width.
```html
<n-switch v-model="collapsed" />
<n-layout>
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
      Cool Sider Cool Sider Cool Sider
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
<n-layout style="height: 240px; overflow: hidden;">
  <n-layout-header position="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout position="absolute" style="top: 64px;">
    <n-layout-sider
      position="absolute"
      collapse-mode="transform"
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
      position="absolute"
    >
      <span>Content</span>
    </n-layout>
  </n-layout>
</n-layout>
```

```js
import mdContacts from 'naive-ui/lib/icons/md-contacts'

export default {
  components: {
    mdContacts
  },
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true
    }
  }
}
```