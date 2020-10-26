# 禁用
文本输入可以被禁用。
```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    size="small"
    placeholder="噢！它被禁用了。"
    :disabled="!active"
    round
  />
  <n-input
    v-model:value="value"
    type="textarea"
    size="small"
    placeholder="噢！它被禁用了。"
    :disabled="!active"
    round
  />
  <n-input pair separator="to" v-model:value="value" clearable :disabled="!active">
    <template v-slot:affix>
      <n-icon><cash-icon /></n-icon>
    </template>
  </n-input>
  <n-switch v-model:value="active" />
</n-space>
```
```js
import CashIcon from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    CashIcon
  },
  data () {
    return {
      active: false,
      value: null
    }
  }
}
```
