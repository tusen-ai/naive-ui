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
  data () {
    return {
      placeholder: ['From', 'To'],
      value: ['0', '100']
    }
  },
  methods: {
    handleInputBlur () {
      this.$NMessage.info('Pairwise Value：Blur')
    },
    handleInputFocus () {
      this.$NMessage.info('Pairwise Value：Focus')
    },
    handleInputInput () {
      this.$NMessage.info('Pairwise Value：Input')
    },
    handleInputChange () {
      this.$NMessage.info('Pairwise Value：Change')
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```