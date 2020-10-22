# Event
Blur & change events are exposed.
```html
<n-input-number
  v-model:value="value"
  @update:value="handleChange"
  @blur="handleBlur"
/>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      value: 0
    }
  },
  methods: {
    handleChange (v) {
      this.message.info(`value: ${v}`)
    },
    handleBlur (v) {
      this.message.info(`blur: ` + v)
    },
  }
}
```
