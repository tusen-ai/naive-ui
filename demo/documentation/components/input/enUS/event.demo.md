# Event
```html
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
    handleFocus() {
      this.$NMessage.info("[Event focus]")
    },
    handleBlur() {
      this.$NMessage.info("[Event blur]")
    },
    handleChange(v) {
      this.$NMessage.info("[Event change]" + v)
    },
    handleKeyUp(e) {
      this.$NMessage.info("[Event keyup]")
    },
    handleInput(v) {
      this.$NMessage.info("[Event input] " + v)
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```