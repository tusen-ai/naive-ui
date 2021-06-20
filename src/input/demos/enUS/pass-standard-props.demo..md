# Pass standard props

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    placeholder="Pass autocomplete 'off'"
    :inputProps="{autocomplete: 'off'}"
  />
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="Pass autocomplete 'off'"
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
