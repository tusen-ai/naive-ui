# 事件
```html
<n-switch
  :value="active"
  @update:value="handleChange"
/>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    handleChange (value) {
      this.active = value
      this.message.info(`Update value: ${value}`)
    }
  }
}
```