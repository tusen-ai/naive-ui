# Trigger

```html
<n-space>
  <n-popover trigger="hover">
    <template #trigger>
      <n-button>Hover</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>Click</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
  <n-popover trigger="focus">
    <template #trigger>
      <n-button>Focus</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
  <n-popover trigger="manual" :show="showPopover">
    <template #trigger>
      <n-button @click="showPopover = !showPopover">Manual</n-button>
    </template>
    <span>I wish they all could be California girls</span>
  </n-popover>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showPopover: ref(false)
    }
  }
})
```
