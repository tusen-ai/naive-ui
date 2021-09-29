# Basic

```html
<n-space>
  <n-radio
    :checked="checkedValue === 'Definitely Maybe'"
    @change="handleChange"
    value="Definitely Maybe"
    name="basic-demo"
  >
    Definitely Maybe
  </n-radio>
  <n-radio
    :checked="checkedValue === 'Be Here Now'"
    @change="handleChange"
    value="Be Here Now"
    name="basic-demo"
  >
    Be Here Now
  </n-radio>
  <n-radio
    :checked="checkedValue === 'Be Here Now'"
    @change="handleChange"
    value="Be Here Now"
    :disabled="disabled"
    name="basic-demo"
  >
    Be Here Now
  </n-radio>
  <n-switch v-model:value="disabled" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const checkedValueRef = ref(null)

    return {
      disabled: ref(true),
      checkedValue: checkedValueRef,
      handleChange (e) {
        checkedValueRef.value = e.target.value
      }
    }
  }
})
```
