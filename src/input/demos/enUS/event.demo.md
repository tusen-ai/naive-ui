# Event

```html
<n-space vertical>
  <n-input
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="Operate to trigger events"
  />
  <n-input
    type="textarea"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="Operate to trigger events"
  />
</n-space>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleFocus () {
      this.message.info('[Event focus]')
    },
    handleBlur () {
      this.message.info('[Event blur]')
    },
    handleChange (v) {
      this.message.info('[Event change]' + v)
    },
    handleKeyUp (e) {
      this.message.info('[Event keyup]')
    },
    handleInput (v) {
      this.message.info('[Event input] ' + v)
    }
  }
}
```
