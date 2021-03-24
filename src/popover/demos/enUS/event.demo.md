# Event

```html
<n-space>
  <n-popover placement="bottom" trigger="hover" @update:show="handleUpdateShow">
    <template #trigger>
      <n-button>Hover</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
  <n-popover placement="bottom" trigger="click" @update:show="handleUpdateShow">
    <template #trigger>
      <n-button>Click</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
  <n-popover
    :show="showPopover"
    placement="bottom"
    trigger="manual"
    @update:show="handleUpdateShow"
  >
    <template #trigger>
      <n-button @click="showPopover = !showPopover">Manual</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      showPopover: ref(false),
      handleUpdateShow (show) {
        message.success(show)
      }
    }
  }
})
```
