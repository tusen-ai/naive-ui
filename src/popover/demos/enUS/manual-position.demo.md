# Manually positioned

Click it.

Warn: when manually positioned, the `trigger` prop must be `'manual'`.

```html
<div
  style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);"
  @click="handleClick"
></div>
<n-popover :show="showPopover" :x="x" :y="y" trigger="manual">
  Cool!
</n-popover>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const xRef = ref(0)
    const yRef = ref(0)
    const showPopoverRef = ref(false)

    const handleClick = (e) => {
      if (showPopoverRef.value) {
        showPopoverRef.value = false
      } else {
        showPopoverRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
      }
    }

    return {
      x: xRef,
      y: yRef,
      showPopover: showPopoverRef,
      handleClick
    }
  }
})
```
