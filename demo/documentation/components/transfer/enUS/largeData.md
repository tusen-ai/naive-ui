# Large Data
If you have tons of data, you may need to speed the transfer up! Set `virtual-scroll` on transfer to use a blazing fast transfer (which turns ridiculous animation off).
```html
<n-transfer
  ref="transfer"
  v-model="value"
  :options="options"
  virtual-scroll
/>
```
```js
function createOptions () {
  return Array.apply(null, { length: 42000 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.apply(null, { length: 10000 }).map((v, i) => i)
}

export default {
  data () {
    return {
      options: createOptions(),
      value: createValues()
    }
  },
}
```