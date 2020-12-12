# Pairwise Value

```html
<n-input
  pair
  separator="-"
  v-model:value="value"
  :placeholder="placeholder"
  clearable
  @blur="handleInputBlur"
  @focus="handleInputFocus"
  @change="handleInputChange"
  @update:value="handleInputInput"
/>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      placeholder: ['From', 'To'],
      value: ['0', '100']
    }
  },
  methods: {
    handleInputBlur () {
      this.message.info('Pairwise Value：Blur')
    },
    handleInputFocus () {
      this.message.info('Pairwise Value：Focus')
    },
    handleInputInput () {
      this.message.info('Pairwise Value：Input')
    },
    handleInputChange () {
      this.message.info('Pairwise Value：Change')
    }
  }
}
```
