# 手动 Focus & Blur

```html
<n-space vertical>
  <n-space>
    <n-button @click="handleFocus">Focus</n-button>
    <n-button :focusable="false" @click="handleBlur">Blur</n-button>
  </n-space>
  <n-input ref="inputInstRef" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const inputInstRef = ref(null)
    return {
      inputInstRef,
      handleFocus () {
        inputInstRef.value.focus()
      },
      handleBlur () {
        inputInstRef.value.blur()
      }
    }
  }
})
```
