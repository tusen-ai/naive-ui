# Lazy Focus

If you want to focus input element after focus at input wrapper and press enter.

<n-alert title="Caveat" type="warning" style="margin-bottom: 8px;">
When activate-input-when-focused is set to false, blur event & focus event will be a async event which will not ensure the trigger order of callbacks.
</n-alert>



```html
<n-input
  v-model="value"
  @blur="handleBlur"
  @focus="handleFocus"
  @change="handleChange"
  @keyup="handleKeyUp"
  @input="handleInput"
  placeholder="Operate to trigger events"
  :lazy-focus="true"
/>
<n-input
  v-model="value"
  type="textarea"
  @blur="handleBlur"
  @focus="handleFocus"
  @change="handleChange"
  @keyup="handleKeyUp"
  @input="handleInput"
  placeholder="Operate to trigger events"
  :lazy-focus="true"
/>
<n-input
  pair
  seperator="to"
  v-model="pair"
  @blur="handleBlur"
  @focus="handleFocus"
  :lazy-focus="true"
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
    handleFocus(e, v) {
      this.$NMessage.info("[Event focus]" + v)
    },
    handleBlur(e, v) {
      this.$NMessage.info("[Event blur]" + v)
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