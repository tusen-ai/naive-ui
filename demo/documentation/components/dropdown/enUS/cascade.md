# Cascade
Dropdown can be cascade.
```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  :default-focus="false"
  @select="handleSelect"
>
  <n-button>People and Some Food to Eat</n-button>
</n-dropdown>
```

```js
const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    key: 'daisy buchanan'
  },
  {
    type: 'divider'
  },
  {
    label: 'Nick Carraway',
    key: 'nick carraway'
  },
  {
    type: 'submenu',
    label: 'Others',
    key: 'others',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        key: 'tom buchanan'
      },
      {
        type: 'submenu',
        label: 'Others',
        key: 'others',
        children: [
          {
            label: 'Chicken',
            key: 'chicken'
          },
          {
            label: 'Beef',
            key: 'beef'
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