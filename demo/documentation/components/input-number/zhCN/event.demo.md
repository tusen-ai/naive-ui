# 事件
暴露了 Blur 和 Change 事件。
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
