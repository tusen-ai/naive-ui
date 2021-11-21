# 手动 focus & blur & select

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
      inputValue: ref('马儿乖，马儿好，马儿光跑不吃草'),
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
