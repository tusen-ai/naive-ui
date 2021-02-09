# 水平菜单

一个水平菜单

```html
<n-menu v-model:value="activeKey" mode="horizontal" :items="menuItems" />
```

```js
import { h, resolveComponent } from 'vue'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(resolveComponent('n-icon'), null, { default: () => h(icon) })
}

const menuItems = [
  {
    title: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    title: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        title: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    title: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    disabled: true
  },
  {
    title: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        title: '人物',
        key: 'people',
        children: [
          {
            title: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            title: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        title: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            title: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        title: '食物',
        key: 'food',
        children: [
          {
            title: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        title: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default {
  data () {
    return {
      activeKey: null,
      menuItems
    }
  }
}
```
