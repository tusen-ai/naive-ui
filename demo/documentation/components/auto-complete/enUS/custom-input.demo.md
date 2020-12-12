# Custom Input Element

You can replace auto-complete's input element.

```html
<n-auto-complete :options="options" v-model:value="value">
  <template v-slot="{ handleInput, handleBlur, handleFocus, value }">
    <n-input
      type="textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :value="value"
      placeholder="Email"
    />
  </template>
</n-auto-complete>
```

```js
export default {
  computed: {
    options() {
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const prefix = this.value.split('@')[0]
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
```
