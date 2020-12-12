# Disabled

Input can be disabled.

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    size="small"
    placeholder="Oops! It is disabled."
    :disabled="!active"
    round
  />
  <n-input
    v-model:value="value"
    type="textarea"
    size="small"
    placeholder="Oops! It is disabled."
    :disabled="!active"
    round
  />
  <n-input
    pair
    separator="to"
    v-model:value="value"
    clearable
    :disabled="!active"
  >
    <template v-slot:affix>
      <n-icon><cash-icon /></n-icon>
    </template>
  </n-input>
  <n-switch v-model:value="active" />
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    CashIcon
  },
  data() {
    return {
      active: false,
      value: null
    }
  }
}
```
