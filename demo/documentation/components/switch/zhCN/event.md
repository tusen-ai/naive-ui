# 事件
```html
<n-switch
  v-model="active"
  @change="handleChange"
/>
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
      this.$NMessage.info(`Change Event: ${value}`)
    }
  }
}
```