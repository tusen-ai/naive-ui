# Collapse Sider

Use `collapsed` prop to control status of sider. (Not working for `n-layout` and `n-layout-sider` with `absolute` position.)

Sider has two `collapse-mode`: `width`, `transform`. `width` will actually change width of sider, `transform` will just move sider out of layout.

Use `collapsed-width` and `width` to set sider's width.

```html
<n-switch v-model:value="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;"> Cool Header </n-layout-header>
  <n-layout position="absolute" style="top: 64px;" has-sider>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
      show-trigger
    >
      Cool Sider Cool Sider Cool Sider
    </n-layout-sider>
    <n-layout style="padding: 24px">
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
  <n-layout position="absolute" style="top: 64px;" has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
      show-trigger
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout style="padding: 24px">
      <span>Content</span>
    </n-layout>
  </n-layout>
</n-layout>
```

```js
import { MdContacts } from '@vicons/ionicons4'

export default {
  components: {
    MdContacts
  },
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true
    }
  }
}
```
