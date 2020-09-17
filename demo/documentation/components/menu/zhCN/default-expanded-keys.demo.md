# 展开子菜单
你可以设定 `default-expanded-keys` 让菜单工作在非受控状态下或者使用 `expanded-keys` 和 `@update:expanded-keys` 以受控的方式控制菜单。
```html
<n-menu
  v-model="activeKey"
  :default-expanded-keys="defaultExpandedKeys"
  :items="menuItems"
  @update:expanded-keys="handleUpdateExpandedKeys"
  @update:model-value="handleUpdateActiveKey"
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
    key: 'hear-the-wind-sing',
    icon: renderIcon(bookIcon)
  },
  {
    title: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(bookIcon),
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
    icon: renderIcon(bookIcon),
    disabled: true
  },
  {
    title: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(bookIcon),
    children: [
      {
        type: 'group',
        title: '人物',
        key: 'people',
        children: [
          {
            title: '叙事者',
            key: 'narrator',
            icon: renderIcon(personIcon)
          },
          {
            title: '羊男',
            key: 'sheep-man',
            icon: renderIcon(personIcon)
          }
        ]
      },
      {
        title: '饮品',
        key: 'beverage',
        icon: renderIcon(wineIcon),
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
  inject: ['message'],
  data () {
    return {
      defaultExpandedKeys: ['dance-dance-dance', 'food'],
      activeKey: null,
      menuItems
    }
  },
  methods: {
    handleUpdateActiveKey (value) {
      this.message.info('[onUpdate:modelValue]: ' + value)
    },
    handleUpdateExpandedKeys (value) {
      this.message.info('[onUpdate:expandedKeys]: ' + JSON.stringify(value))
    }
  }
}
```