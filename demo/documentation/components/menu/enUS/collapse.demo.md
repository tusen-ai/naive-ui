# Collapsed Menu
Use collapsable vertical menu with layout sider. Use `collapsed` to control collapse status of menu. You must set `collapsed-width` to make it collapse in a right manner. There are still some other collapse related props you can modify: `icon-size`, `collapsed-icon-size`, `popover-body-style`. For details see API table at the bottom of the page.
```html
<n-space vertical align="stretch">
  <n-switch v-model:value="collapsed" />
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
        :items="menuItems"
        v-model:value="activeKey"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <span>内容</span>
      </n-layout-content>
    </n-layout>
  </n-layout>
</n-space>
```
```js
import { h, resolveComponent } from 'vue'
import bookIcon from 'naive-ui/lib/icons/book-outline'
import personIcon from 'naive-ui/lib/icons/person-outline'
import wineIcon from 'naive-ui/lib/icons/wine-outline'

function renderIcon(icon) {
  return () => h(resolveComponent('n-icon'), null, { default: () => h(icon) })
}

const menuItems = [
  {
    title: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    icon: renderIcon(bookIcon)
  },
  {
    title: 'Pinball 1973',
    key: 'pinball-1973',
    icon: renderIcon(bookIcon),
    disabled: true,
    children: [
      {
        title: 'Rat',
        key: 'rat'
      }
    ]
  },
  {
    title: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(bookIcon)
  },
  {
    title: '舞，舞，舞',
    key: 'Dance Dance Dance',
    icon: renderIcon(bookIcon),
    children: [
      {
        type: 'group',
        title: 'People',
        key: 'people',
        children: [
          {
            title: 'Narrator',
            key: 'narrator',
            icon: renderIcon(personIcon)
          },
          {
            title: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon(personIcon)
          }
        ]
      },
      {
        title: 'Beverage',
        key: 'beverage',
        icon: renderIcon(wineIcon),
        children: [
          {
            title: 'Whisky',
            key: 'whisky'
          }
        ]
      },
      {
        title: 'Food',
        key: 'food',
        children: [
          {
            title: 'Sandwich',
            key: 'sandwich'
          }
        ]
      },
      {
        title: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default {
  data () {
    return {
      activeKey: null,
      collapsed: true,
      menuItems
    }
  }
}
```
