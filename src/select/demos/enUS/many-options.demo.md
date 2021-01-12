# Lots of Options

1000 times of the ultimate answer.

```html
<n-space vertical>
  <n-select v-model:value="value" :options="options" />
  <n-select multiple v-model:value="values" :options="options" />
</n-space>
```

```js
export default {
  data () {
    return {
      value: null,
      values: null,
      options: Array.apply(null, { length: 42000 }).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
}
```
