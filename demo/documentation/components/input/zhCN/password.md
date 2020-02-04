# 密码
```html
<n-input
  v-model="value"
  type="password"
  icon="md-key"
  placeholder="密码"
  :maxlength="8"
/>
```
```js
export default {
  data() {
    return {
      value: null
    }
  }
}
```