# Large Data

If you have tons of data, you may need to speed the transfer up! Set `virtual-scroll` on transfer to use a blazing fast transfer (which turns the ridiculous animation off).

```html
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
  virtual-scroll
/>
```

```js
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.apply(null, { length: 42000 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.apply(null, { length: 50 }).map((v, i) => i)
}

export default defineComponent({
  setup () {
    return {
      options: createOptions(),
      value: ref(createValues())
    }
  }
})
```
