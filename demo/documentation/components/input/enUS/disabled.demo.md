# Disabled
Input can be disabled.
```html
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
<n-input pair separator="to" v-model:value="value" clearable :disabled="!active">
  <template v-slot:affix>
    <n-icon><cash-outline /></n-icon>
  </template>
</n-input>
<n-switch v-model:value="active" />
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