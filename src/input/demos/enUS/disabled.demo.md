# Disabled

Input can be disabled.

```html
<n-space vertical>
  <n-input
    type="input"
    size="small"
    placeholder="Oops! It is disabled."
    :disabled="!active"
    round
  />
  <n-input
    type="textarea"
    size="small"
    placeholder="Oops! It is disabled."
    :disabled="!active"
    round
  />
  <n-input pair separator="to" clearable :disabled="!active">
    <template #affix>
      <n-icon><flash-icon /></n-icon>
    </template>
  </n-input>
  <n-switch v-model:value="active" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { FlashOutline as FlashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    FlashIcon
  },
  setup () {
    return {
      active: ref(false)
    }
  }
})
```
