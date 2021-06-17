# Clickoutside

In some cases you may want to customize the clickoutside event.

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
  :onClickoutside="clickInfo"
/>
<br />
<n-space>
  <n-dropdown
    @select="handleSelect"
    :onClickoutside="clickInfo"
    trigger="click"
    :options="options"
  >
    <n-button :keyboard="false">Click！</n-button>
  </n-dropdown>
  <n-dropdown
    @select="handleSelect"
    :onClickoutside="clickInfo"
    :show="showDrop"
    :options="options"
  >
    <n-button :keyboard="false" @click="handleClick"
      >Oh! Manually By Myself!</n-button
    >
  </n-dropdown>
</n-space>
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
    const showDropRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)

    return {
      options,
      showDropdown: showDropdownRef,
      showDrop: showDropRef,
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
      clickInfo (show) {
        message.info('click ' + show)
        showDropRef.value = show
        showDropdownRef.value = show
      },
      handleClick () {
        showDropRef.value = !showDropRef.value
      }
    }
  }
})
```
