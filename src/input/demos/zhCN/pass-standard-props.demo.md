# 传递原生参数

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    placeholder="传递原生参数 autocomplete 'off'"
    :inputProps="{autocomplete: 'off'}"
  />
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="传递原生参数 autocomplete 'off'"
    :inputProps="{autocomplete: 'off'}"
  />
</n-space>
```

```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```
