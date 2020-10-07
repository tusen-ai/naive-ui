# 输入成对值
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
  @update:modelValue="handleInputInput"
/>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      placeholder: ['从', '到'],
      value: ['0', '100']
    }
  },
  methods: {
    handleInputBlur () {
      this.message.info('输入成对值：Blur')
    },
    handleInputFocus () {
      this.message.info('输入成对值：Focus')
    },
    handleInputInput () {
      this.message.info('输入成对值：Input')
    },
    handleInputChange () {
      this.message.info('输入成对值：Change')
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```