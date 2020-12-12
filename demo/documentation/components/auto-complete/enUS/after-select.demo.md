# Actions After Select

Blur after selection or clear after selection.

```html
<n-space vertical>
  <n-auto-complete
    :options="options"
    v-model:value="value"
    clear-after-select
    placeholder="Clear After Select"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    blur-after-select
    placeholder="Blur After Select"
  />
</n-space>
```

```js
export default {
  computed: {
    options () {
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const value = this.value === null ? '' : this.value
        const prefix = value.split('@')[0]
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    }
  },
  data () {
    return {
      value: null
    }
  }
}
```
