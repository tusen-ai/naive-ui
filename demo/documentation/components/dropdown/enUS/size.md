# Size
Dropdown has different size.
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="small"
  @select="handleSelect"
  :options="options"
  :focusable="false"
>
  <n-button>Small Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="medium"
  @select="handleSelect"
  :focusable="false"
  :options="options"
>
  <n-button>Medium Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  :focusable="false"
  @select="handleSelect"
  :options="options"
>
  <n-button>Large Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="huge"
  :focusable="false"
  @select="handleSelect"
  :options="options"
>
  <n-button>Huge Some</n-button>
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
```css
.n-button {
  margin: 0 8px 12px 0;
}
```