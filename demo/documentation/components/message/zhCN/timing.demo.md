# 时间
设定 Message 的持续时间。
```html
<n-message-controller ref="message" />
<n-button @click="createMessage">
  持续 5 秒
</n-button>
```

```js
export default {
  methods: {
    createMessage() {
      this.$refs.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000 }
      )
    }
  }
}
```