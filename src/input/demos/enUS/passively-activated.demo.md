# Passively Activateds

If you want to activate input by pressing enter after focused, use `passively-activated`. (Use tab key to focus on the inputs)

```html
<n-space vertical>
  <n-input
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="Operate to trigger events"
    :passively-activated="true"
  />
  <n-input
    v-model:value="value"
    type="textarea"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="Operate to trigger events"
    :passively-activated="true"
  />
  <n-input
    pair
    separator="to"
    @blur="handleBlur"
    @focus="handleFocus"
    :passively-activated="true"
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
