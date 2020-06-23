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
      :items="menuItems"
      v-model="activeMenuItemName"
    />
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

const menuItems = [
  {
    title: 'Hear the Wind Sing',
    name: 'hear-the-wind-sing',
    icon: h => h('n-icon', [h(bookIcon)])
  },
  {
    title: 'Pinball, 1973',
    name: 'pinball-1973',
    icon: h => h('n-icon', [h(bookIcon)]),
    disabled: true,
    children: [
      {
        title: 'Rat',
        name: 'rat'
      }
    ]
  },
  {
    title: 'A Wild Sheep Chase',
    name: 'a-wild-sheep-chase',
    icon: h => h('n-icon', [h(bookIcon)]),
    disabled: true
  },
  {
    title: 'Dance Dance Dance',
    name: 'dance-dance-dance',
    icon: h => h('n-icon', [h(bookIcon)]),
    children: [
      {
        type: 'group',
        title: 'Characters',
        children: [
          {
            title: 'Narrator',
            name: 'narrator',
            icon: h =>  h('n-icon', [h(personIcon)])
          },
          {
            title: 'Sheep Man',
            name: 'sheep-man',
            icon: h => h('n-icon', [h(personIcon)])
          }
        ]
      },
      {
        title: 'Beverage',
        name: 'beverage',
        icon: h => h('n-icon', [h(wineIcon)]),
        children: [
          {
            title: 'Whisky',
            name: 'whisky'
          }
        ]
      },
      {
        title: 'Food',
        name: 'food',
        children: [
          {
            title: 'Sandwich',
            name: 'sandwich'
          }
        ]
      },
      {
        title: 'The past increases. The future recedes.',
        name: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default {
  components: {
    bookIcon,
    personIcon,
    wineIcon
  },
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true,
      menuItems
    }
  }
}
```
