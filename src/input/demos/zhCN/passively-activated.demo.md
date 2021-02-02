# 被动激活

如果需要在 focus 之后使用回车键来激活输入，可以设定 `passively-activated`。 (使用 tab 键来聚焦这些输入)

```html
<n-space vertical>
  <n-input
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="操作来触发事件"
    passively-activated
  />
  <n-input
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
    @blur="handleBlur"
    @focus="handleFocus"
    passively-activated
  />
</n-space>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleFocus (e) {
      this.message.info('[Event focus]')
    },
    handleBlur (e) {
      this.message.info('[Event blur]')
    },
    handleChange (v) {
      this.message.info('[Event change]: ' + v)
    },
    handleKeyUp (e) {
      this.message.info('[Event keyup]')
    },
    handleInput (v) {
      this.message.info('[Event input]: ' + v)
    }
  }
}
```
