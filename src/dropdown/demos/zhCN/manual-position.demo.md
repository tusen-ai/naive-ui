# 手动定位

在特殊情况下，你可能想手动定位下拉菜单。比如在一块区域右击以弹出下拉菜单。

```html
<div
  style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);"
  @contextmenu="handleContextMenu"
>
  右击
</div>
<n-dropdown
  placement="bottom-start"
  @select="handleSelect"
  :x="x"
  :y="y"
  :options="options"
  :show="showDropdown"
  :onClickoutside="onClickoutside"
/>
```

```js
import { defineComponent, ref, nextTick } from 'vue'
import { useMessage } from 'naive-ui'

const options = [
  {
    label: '杰·盖茨比',
    key: 'jay gatsby'
  },
  {
    label: '黛西·布坎南',
    key: 'daisy buchanan'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '尼克·卡拉威',
    key: 'nick carraway'
  },
  {
    label: '其他',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker'
      },
      {
        label: '汤姆·布坎南',
        key: 'tom buchanan'
      },
      {
        label: '其他',
        key: 'others2',
        children: [
          {
            label: '鸡肉',
            key: 'chicken'
          },
          {
            label: '牛肉',
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
      onClickoutside (show) {
        message.info('click ' + show)
        showDropdownRef.value = show
      }
    }
  }
})
```
