# 许多选项

1000 倍宇宙的终极答案个数的选项。

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
