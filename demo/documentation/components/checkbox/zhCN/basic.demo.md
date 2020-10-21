# 基础用法
```html
<n-checkbox v-model:value="value">复选框</n-checkbox>
<n-checkbox v-model:value="value"/>
<n-checkbox v-model:value="value" :disabled="disabled">复选框</n-checkbox>
<n-button @click="disabled = !disabled" size="small">禁用</n-button>
```
```js
export default {
  data () {
    return {
      value: false,
      disabled: true
    }
  }
}
```
```css
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```