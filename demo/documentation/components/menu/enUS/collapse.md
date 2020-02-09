# Collapsed Menu
Use collapsable vertical menu with layout sider. Use `collapsed` to control collapse status of menu. You must set `collapsed-width` to make it collapse in a right manner. There are still some other collapse related props you can modify: `icon-size`, `collapsed-icon-size`, `overlay-width`, `overlay-min-width`. For details see API table at the bottom of the page.
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
      :collapsed-icon-size="22"
      v-model="activeMenuItemName"
    >
      <n-menu-item title="Hear the Wind Sing" name="hear-the-wind-sing">
        <template v-slot:icon>
          <n-icon>
            <book-icon />
          </n-icon>
        </template>
      </n-menu-item>
      <n-submenu title="Pinball, 1973" name="pinball-1973" disabled>
        <template v-slot:icon>
          <n-icon>
            <book-icon />
          </n-icon>
        </template>
        <n-menu-item title="Rat" name="rat" />
      </n-submenu>
      <n-menu-item title="A Wild Sheep Chase" name="a-wild-sheep-chase" disabled>
        <template v-slot:icon>
          <n-icon>
            <book-icon />
          </n-icon>
        </template>
      </n-menu-item>
      <n-submenu title="Dance Dance Dance" name="dance-dance-dance">
        <template v-slot:icon>
          <n-icon>
            <book-icon />
          </n-icon>
        </template>
        <n-menu-item-group title="Characters">
          <n-menu-item title="Narrator" name="narrator">
            <template v-slot:icon>
              <n-icon>
                <person-icon />
              </n-icon>
            </template>
          </n-menu-item>
          <n-menu-item title="Sheep Man" name="sheep-man">
            <template v-slot:icon>
              <n-icon>
                <person-icon />
              </n-icon>
            </template>
          </n-menu-item>
        </n-menu-item-group>
        <n-submenu title="Beverage" name="beverage">
          <template v-slot:icon>
            <n-icon>
              <wine-icon />
            </n-icon>
          </template>
          <n-menu-item title="Whisky" name="whisky" />
        </n-submenu>
        <n-submenu title="Food" name="food">
          <n-menu-item title="Sandwich" name="sandwich" />
        </n-submenu>
        <n-menu-item title="The past increases. The future recedes." name="the-past-increases-the-future-recedes" />
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
import bookIcon from 'naive-ui/lib/icons/book-outline'
import personIcon from 'naive-ui/lib/icons/person-outline'
import wineIcon from 'naive-ui/lib/icons/wine-outline'

export default {
  components: {
    bookIcon,
    personIcon,
    wineIcon
  },
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true
    }
  }
}
```
