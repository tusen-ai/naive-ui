# Manually Positioned
For some special case, you may want to manually position the dropdown. For example, right click to activate dropdown in some area.
```html
<div style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @contextmenu="handleContextMenu">
  Right Click
</div>
<n-dropdown
  placement="bottom-start"
  trigger="manual"
  manually-positioned
  @select="handleSelect"
  @blur="handleBlur"
  :x="x"
  :y="y"
  :options="options"
  :show="showDropdown"
/>
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
  methods: {
    handleSelect (name) {
      this.showDropdown = false
      this.$NMessage.info(name)
    },
    handleBlur () {
      this.showDropdown = false
    },
    handleContextMenu (e) {
      e.preventDefault()
      this.showDropdown = false
      this.$nextTick().then(() => {
        this.showDropdown = true
        this.x = e.clientX
        this.y = e.clientY
      })
    }
  },
  data () {
    return {
      options,
      showDropdown: false,
      x: 0,
      y: 0
    }
  }
}
```