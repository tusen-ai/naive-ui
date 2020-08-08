# 被动激活
如果需要在 focus 之后使用回车键来激活输入，可以设定 `passively-activated`。 (使用 tab 键来聚焦这些输入)

```html
<n-input
  v-model="value"
  @blur="handleBlur"
  @focus="handleFocus"
  @change="handleChange"
  @keyup="handleKeyUp"
  @input="handleInput"
  placeholder="操作来触发事件"
  passively-activated
/>
<n-input
  v-model="value"
  type="textarea"
  @blur="handleBlur"
  @focus="handleFocus"
  @change="handleChange"
  @keyup="handleKeyUp"
  @input="handleInput"
  placeholder="操作来触发事件"
  passively-activated
/>
<n-input
  pair
  separator="to"
  v-model="pair"
  @blur="handleBlur"
  @focus="handleFocus"
  passively-activated
/>
```
```js
export default {
  data() {
    return {
      value: null,
      pair: null
    }
  },
  methods: {
    handleFocus(e) {
      this.$NMessage.info('[Event focus]')
    },
    handleBlur(e) {
      this.$NMessage.info('[Event blur]')
    },
    handleChange(v) {
      this.$NMessage.info('[Event change]: ' + v)
    },
    handleKeyUp(e) {
      this.$NMessage.info('[Event keyup]')
    },
    handleInput(v) {
      this.$NMessage.info('[Event input]: ' + v)
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```