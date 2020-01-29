# Event
Blur & change events are exposed.
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
    handleChange (v) {
      this.$NMessage.info(`value: ${v}`)
    },
    handleBlur (v) {
      this.$NMessage.info(`blur: ` + v)
    },
  }
}
```
