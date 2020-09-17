# 压缩菜单
可以让垂直菜单随着边栏压缩。使用 `collapsed` 属性控制菜单状态。必需设定 `collapsed-width` 来确保菜单正常显示。除此之外还有一些其他和压缩有关的属性：`icon-size`、`collapsed-icon-size`、`popover-body-style`。详细信息参考页面底下的 API 文档。
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
      <span>内容</span>
    </n-layout-content>
  </n-layout>
</n-layout>
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
    title: '且听风吟',
    name: 'hear-the-wind-sing',
    icon: renderIcon(bookIcon)
  },
  {
    title: '1973年的弹珠玩具',
    name: 'pinball-1973',
    icon: renderIcon(bookIcon),
    disabled: true,
    children: [
      {
        title: '鼠',
        name: 'rat'
      }
    ]
  },
  {
    title: '寻羊冒险记',
    name: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(bookIcon)
  },
  {
    title: '舞，舞，舞',
    name: 'dance-dance-dance',
    icon: renderIcon(bookIcon),
    children: [
      {
        type: 'group',
        title: '人物',
        name: 'people',
        children: [
          {
            title: '叙事者',
            name: 'narrator',
            icon: renderIcon(personIcon)
          },
          {
            title: '羊男',
            name: 'sheep-man',
            icon: renderIcon(personIcon)
          }
        ]
      },
      {
        title: '饮品',
        name: 'beverage',
        icon: renderIcon(wineIcon),
        children: [
          {
            title: '威士忌',
            name: 'whisky'
          }
        ]
      },
      {
        title: '食物',
        name: 'food',
        children: [
          {
            title: '三明治',
            name: 'sandwich'
          }
        ]
      },
      {
        title: '过去增多，未来减少',
        name: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default {
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true,
      menuItems
    }
  }
}
```
