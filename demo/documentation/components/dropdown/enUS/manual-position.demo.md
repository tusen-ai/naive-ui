# Manually Positioned
For some special case, you may want to manually position the dropdown. For example, right click to activate dropdown in some area.
```html
<div style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @contextmenu="handleContextMenu">
  Right Click
</div>
<n-dropdown
  placement="bottom-start"
  manually-positioned
  @select="handleSelect"
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
    label: 'Others',
    key: 'others1',
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
        label: 'Others',
        key: 'others2',
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
  inject: ['message'],
  methods: {
    handleSelect (name) {
      this.showDropdown = false
      this.message.info(name)
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