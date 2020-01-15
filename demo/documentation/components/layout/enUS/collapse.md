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
      :collapsed-width="48"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="48"
        :collapsed-icon-size="24"
        v-model="activeMenuItemName"
      >
        <n-menu-item title="1800" name="1800">
          <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
        </n-menu-item>
        <n-menu-item title="1900" name="1900">
          <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
        </n-menu-item>
        <n-menu-item title="2000" name="2000">
          <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
        </n-menu-item>
        <n-submenu title="2001" name="2001">
          <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
          <n-menu-item title="2002" name="2002"></n-menu-item>
        </n-submenu>
        <n-submenu title="2003" name="2003">
        <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
          <n-submenu title="2004" name="2004">
            <n-menu-item title="2005" name="2005"></n-menu-item>
          </n-submenu>
        </n-submenu>
        <n-submenu title="2006" name="2006">
          <template v-slot:icon>
            <n-icon>
              <md-contacts />
            </n-icon>
          </template>
          <n-submenu title="2007" name="2007">
            <n-submenu title="2008" name="2008">
              <n-menu-item title="2009" name="2009"></n-menu-item>
              <n-menu-item title="2010" name="2010"></n-menu-item>
            </n-submenu>
            <n-menu-item title="2011" name="2011"></n-menu-item>
          </n-submenu>
        </n-submenu>
      </n-menu>
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