# 输入成对值
```html
<n-input
  pair
  separator="-"
  v-model="value"
  :placeholder="placeholder"
  clearable
  @blur="handleInputBlur"
  @focus="handleInputFocus"
  @change="handleInputChange"
  @input="handleInputInput"
/>
```
```js
export default {
  data () {
    return {
      placeholder: ['从', '到'],
      value: ['0', '100']
    }
  },
  methods: {
    handleInputBlur () {
      this.$NMessage.info('输入成对值：Blur')
    },
    handleInputFocus () {
      this.$NMessage.info('输入成对值：Focus')
    },
    handleInputInput () {
      this.$NMessage.info('输入成对值：Input')
    },
    handleInputChange () {
      this.$NMessage.info('输入成对值：Change')
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```