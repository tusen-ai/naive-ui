# 禁用

文本输入可以被禁用。

```html
<n-space vertical>
  <n-input
    type="input"
    size="small"
    placeholder="噢！它被禁用了。"
    :disabled="!active"
    round
  />
  <n-input
    type="textarea"
    size="small"
    placeholder="噢！它被禁用了。"
    :disabled="!active"
    round
  />
  <n-input pair separator="to" clearable :disabled="!active">
    <template #affix>
      <n-icon><cash-icon /></n-icon>
    </template>
  </n-input>
  <n-switch v-model:value="active" />
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default {
  components: {
    CashIcon
  },
  data () {
    return {
      active: false
    }
  }
}
```
