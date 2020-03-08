# Size
Dropdown has different size.
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="small"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">Small Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="medium"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">Medium Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">Large Some</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="huge"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">Huge Some</n-button>
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
```css
.n-button {
  margin: 0 8px 12px 0;
}
```