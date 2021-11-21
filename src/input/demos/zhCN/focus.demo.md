# 手动 Focus & Blur & Select

```html
<n-space vertical>
  <n-space>
    <n-button @click="handleFocus">Focus</n-button>
    <n-button :focusable="false" @click="handleBlur">Blur</n-button>
    <n-button :focusable="false" @click="handleSelect">Select</n-button>
  </n-space>
  <n-input ref="inputInstRef" v-model:value="inputValue" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const inputInstRef = ref(null)
    return {
      inputInstRef,
      inputValue: ref('小孩子才做选择，听说你要Select All？'),
      handleFocus () {
        inputInstRef.value.focus()
      },
      handleBlur () {
        inputInstRef.value.blur()
      },
      handleSelect () {
        inputInstRef.value.select()
      }
    }
  }
})
```
