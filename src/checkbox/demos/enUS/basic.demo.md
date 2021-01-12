# Basic

```html
<n-space item-style="display: flex;" align="center">
  <n-checkbox v-model:checked="value">Checkbox</n-checkbox>
  <n-checkbox v-model:checked="value" />
  <n-checkbox v-model:checked="value" :disabled="disabled">Checkbox</n-checkbox>
  <n-button @click="disabled = !disabled" size="small">Disabled</n-button>
</n-space>
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
