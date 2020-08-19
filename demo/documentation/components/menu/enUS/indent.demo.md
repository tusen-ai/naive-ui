# Indent
You can specify `indent` & `root-indent` of the menu. `root-indent` only determines the first-leveled children.
```html
<n-menu
  v-model="activeName"
  :root-indent="36"
  :indent="12"
  :items="menuItems"
/>
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
      activeName: null,
      menuItems
    }
  }
}
```