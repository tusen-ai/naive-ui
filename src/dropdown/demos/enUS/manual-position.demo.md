# Manually Positioned

For some special case, you may want to manually position the dropdown. For example, right click to activate dropdown in some area.

```html
<div
  style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);"
  @contextmenu="handleContextMenu"
>
  Right Click
</div>
<n-dropdown
  placement="bottom-start"
  @select="handleSelect"
  :x="x"
  :y="y"
  :options="options"
  :show="showDropdown"
  :on-clickoutside="onClickoutside"
/>
```

```js
import { defineComponent, ref, nextTick } from 'vue'
import { useMessage } from 'naive-ui'

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
    type: 'divider',
    key: 'd1'
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

export default defineComponent({
  setup () {
    const message = useMessage()

    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)

    return {
      options,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      handleSelect (key) {
        showDropdownRef.value = false
        message.info(key)
      },
      handleBlur () {
        showDropdownRef.value = false
      },
      handleContextMenu (e) {
        e.preventDefault()
        showDropdownRef.value = false
        nextTick().then(() => {
          showDropdownRef.value = true
          xRef.value = e.clientX
          yRef.value = e.clientY
        })
      },
      onClickoutside (e) {
        message.info('clickoutside')
        showDropdownRef.value = false
      }
    }
  }
})
```
