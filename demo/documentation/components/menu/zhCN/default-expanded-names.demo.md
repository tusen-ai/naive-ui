# 展开子菜单
你可以设定 `default-expanded-names` 让菜单工作在非受控状态下或者使用 `expanded-names` 和 `@expanded-names-change` 以受控的方式控制菜单。
```html
<n-menu
  v-model="activeName"
  :default-expanded-names="defaultExpandedNames"
  :items="menuItems"
  @expanded-names-change="handleExpandedNamesChange"
  @select="handleSelect"
/>
```
```js
import bookIcon from 'naive-ui/lib/icons/book-outline'
import personIcon from 'naive-ui/lib/icons/person-outline'
import wineIcon from 'naive-ui/lib/icons/wine-outline'

const menuItems = [
  {
    title: '且听风吟',
    name: 'hear-the-wind-sing',
    icon: h => h('n-icon', [h(bookIcon)])
  },
  {
    title: '1973年的弹珠玩具',
    name: 'pinball-1973',
    icon: h => h('n-icon', [h(bookIcon)]),
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
    icon: h => h('n-icon', [h(bookIcon)]),
    disabled: true
  },
  {
    title: '舞，舞，舞',
    name: 'dance-dance-dance',
    icon: h => h('n-icon', [h(bookIcon)]),
    children: [
      {
        type: 'group',
        title: '人物',
        children: [
          {
            title: '叙事者',
            name: 'narrator',
            icon: h =>  h('n-icon', [h(personIcon)])
          },
          {
            title: '羊男',
            name: 'sheep-man',
            icon: h => h('n-icon', [h(personIcon)])
          }
        ]
      },
      {
        title: '饮品',
        name: 'beverage',
        icon: h => h('n-icon', [h(wineIcon)]),
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
  components: {
    bookIcon,
    personIcon,
    wineIcon
  },
  data () {
    return {
      defaultExpandedNames: ['dance-dance-dance', 'food'],
      activeName: null,
      menuItems
    }
  },
  methods: {
    handleSelect (value) {
      this.$NMessage.info('Select: ' + JSON.stringify(value))
    },
    handleExpandedNamesChange (value) {
      this.$NMessage.info('ExpandedNamesChange: ' + JSON.stringify(value))
    }
  }
}
```