# Type
Badge has `default`, `error`, `info`, `success`, `warning` types.
```html
<n-space :size="24" align="center">
  <n-badge dot>
    <n-avatar />
  </n-badge>
  <n-badge dot type="error">
    <n-avatar />
  </n-badge>
  <n-badge dot type="info">
    <n-avatar />
  </n-badge>
  <n-badge dot type="success">
    <n-avatar />
  </n-badge>
  <n-badge dot type="warning">
    <n-avatar />
  </n-badge>
</n-space>
```
```js
export default {
  data () {
    return {
      value: 10
    }
  }
}
```