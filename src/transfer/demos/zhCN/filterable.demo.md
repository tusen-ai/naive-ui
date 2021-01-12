# 可过滤

```html
<n-transfer
  virtual-scroll
  ref="transfer"
  v-model:value="value"
  :options="options"
  filterable
/>
```

```js
function createOptions () {
  return Array.apply(null, { length: 100 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.apply(null, { length: 50 }).map((v, i) => i)
}

export default {
  data () {
    return {
      options: createOptions(),
      value: createValues()
    }
  }
}
```
