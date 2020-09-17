# 缩进
你可以设定菜单的 `indent` & `root-indent`。`root-indent` 只决定第一层项目的缩进。
```html
<n-menu
  v-model="activeName"
  :root-indent="36"
  :indent="12"
  :items="menuItems"
/>
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
    icon: renderIcon(bookIcon),
    disabled: true
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
      activeName: null,
      menuItems
    }
  }
}
```