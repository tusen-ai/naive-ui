# Collapsed Menu

Use collapsable vertical menu with layout sider. Use `collapsed` to control collapse status of menu. You must set `collapsed-width` to make it collapse in a right manner. There are still some other collapse related props you can modify: `icon-size`, `collapsed-icon-size`, `popover-body-style`. For details see API table at the bottom of the page.

```html
<n-space vertical>
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
        <span>Content</span>
      </n-layout-content>
    </n-layout>
  </n-layout>
</n-space>
```

```js
import { h, resolveComponent } from 'vue'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons-v5'

function renderIcon(icon) {
  return () => h(resolveComponent('n-icon'), null, { default: () => h(icon) })
}

const menuItems = [
  {
    title: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    title: 'Pinball 1973',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
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
    icon: renderIcon(BookIcon)
  },
  {
    title: '舞，舞，舞',
    key: 'Dance Dance Dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        title: 'People',
        key: 'people',
        children: [
          {
            title: 'Narrator',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            title: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        title: 'Beverage',
        key: 'beverage',
        icon: renderIcon(WineIcon),
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
  data() {
    return {
      activeKey: null,
      collapsed: true,
      menuItems
    }
  }
}
```
