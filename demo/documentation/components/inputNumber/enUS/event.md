# Event
```html
<n-input-number
  v-model="value"
  @change="handleChange"
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
    }
  }
}
```
