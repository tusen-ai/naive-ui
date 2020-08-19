# Width
`width`, `max-width`, `min-width`, `submenu-width`, `submenu-min-width` can be set.
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  :width="180"
  :submenu-width="180"
  :options="options"
  @select="handleSelect"
>
  <n-button :keyboard="false">People and Some Food to Eat</n-button>
</n-dropdown>
```
```js
const options = [
  {
    label: 'Jay Gatsby',
    value: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    value: 'daisy buchanan'
  },
  {
    type: 'divider'
  },
  {
    label: 'Nick Carraway',
    value: 'nick carraway'
  },
  {
    label: 'Others',
    value: 'others',
    children: [
      {
        label: 'Jordan Baker',
        value: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        value: 'tom buchanan'
      },
      {
        label: 'Others',
        value: 'others',
        children: [
          {
            label: 'Chicken',
            value: 'chicken'
          },
          {
            label: 'Beef',
            value: 'beef'
          }
        ]
      }
    ]
  }
]

export default {
  data () {
    return {
      options
    }
  },
  methods: {
    handleSelect (name) {
      this.$NMessage.info(name)
    }
  }
}
```