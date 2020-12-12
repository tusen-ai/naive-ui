# 时间

设定 Message 的持续时间。

```html
<n-button @click="createMessage"> 持续 5 秒 </n-button>
```

```js
export default {
  inject: ['message'],
  methods: {
    createMessage() {
      this.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000 }
      )
    }
  }
}
```
