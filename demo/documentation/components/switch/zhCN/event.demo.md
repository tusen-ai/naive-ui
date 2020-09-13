# 事件
```html
<n-switch
  :modelValue="active"
  @update:modelValue="handleChange"
/>
<n-message-controller ref='message' />
```
```js
export default {
  data () {
    return {
      active: false
    }
  },
  methods: {
    handleChange (value) {
      this.active = value
      this.$refs.message.info(`Update modelValue: ${value}`)
    }
  }
}
```