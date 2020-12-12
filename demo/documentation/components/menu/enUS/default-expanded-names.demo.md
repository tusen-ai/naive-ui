# Opened Submenu

You can set `default-expanded-keys` to make menu work in an uncontrolled manner or use `expanded-keys` and `@update:expanded-keys` to make it work in a controlled manner.

```html
<n-menu
  v-model:value="activeKey"
  :default-expanded-keys="defaultExpandedKeys"
  :items="menuItems"
  @update:expanded-keys="handleUpdateExpandedKeys"
/>
```

```js
import { h, resolveComponent } from 'vue'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons-v5'

function renderIcon (icon) {
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
    title: 'Dance',
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
  inject: ['message'],
  data () {
    return {
      defaultExpandedKeys: ['dance-dance-dance', 'food'],
      activeKey: null,
      menuItems
    }
  },
  methods: {
    handleUpdateExpandedKeys (value) {
      this.message.info('[onUpdate:expandedKeys]: ' + JSON.stringify(value))
    }
  }
}
```
