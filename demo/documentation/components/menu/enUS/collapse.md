# Collapsed
```html
<n-switch v-model="collapsed" />
<n-layout>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-toggle-button
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
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
