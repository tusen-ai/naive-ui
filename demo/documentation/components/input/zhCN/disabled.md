# 禁用
文本输入可以被禁用。
```html
<n-input
  v-model="value"
  type="input"
  size="small"
  placeholder="噢！它被禁用了。"
  :disabled="!active"
  round
/>
<n-input
  v-model="value"
  type="textarea"
  size="small"
  placeholder="噢！它被禁用了。"
  :disabled="!active"
  round
/>
<n-input pair seperator="to" v-model="value" clearable :disabled="!active">
  <template v-slot:affix>
    <n-icon><cash-outline /></n-icon>
  </template>
</n-input>
<n-switch v-model="active" />
```
```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  },
  data() {
    return {
      active: false,
      value: null
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```