# Basic

Basic example of the Transfer component. If you have tons of data, see below for virtualised lists.

```html
<n-transfer ref="transfer" v-model:value="value" :options="options" />
```

```js
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.apply(null, { length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
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
