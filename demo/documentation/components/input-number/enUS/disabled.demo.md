# Disabled

```html
<n-space align="center">
  <n-switch v-model:value="disabled" />
  <n-input-number :disabled="disabled" v-model:value="value" />
</n-space>
```

```js
export default {
  data () {
    return {
      value: 0,
      disabled: true
    }
  }
}
```
