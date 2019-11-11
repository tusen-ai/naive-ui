# Event
```html
<n-input-number
  v-model="value"
  @change="handleChange"
  @blur="handleBlur"
/>
```
```js
export default {
  data () {
    return {
      value: 0
    }
  },
  methods: {
    handleChange (newValue) {
      this.$NMessage.info(`value: ${newValue}`)
    },
    handleBlur (e, v) {
      this.$NMessage.info(`blur: ` + v)
    },
  }
}
```
