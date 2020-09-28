# Password
```html
<n-input
  v-model:value="value"
  type="password"
  icon="md-key"
  placeholder="Password"
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