# Event

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="Operate to trigger events"
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
  />
</n-space>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      value: null,
      pair: null
    }
  },
  methods: {
    handleFocus() {
      this.message.info('[Event focus]')
    },
    handleBlur() {
      this.message.info('[Event blur]')
    },
    handleChange(v) {
      this.message.info('[Event change]' + v)
    },
    handleKeyUp(e) {
      this.message.info('[Event keyup]')
    },
    handleInput(v) {
      this.message.info('[Event input] ' + v)
    }
  }
}
```
