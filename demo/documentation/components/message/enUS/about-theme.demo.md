# Caveat About Theme

If you don't specified the theme, the theme of created message will be the same as its `n-message-provider`.

```html
<n-space>
  <n-button @click="info" style="margin: 0 8px 12px 0;">
    You can change the theme while the message is active
  </n-button>
  <n-button @click="loading"> Specify Dark Theme </n-button>
</n-space>
```

```js
export default {
  inject: ['message'],
  methods: {
    info () {
      this.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000 }
      )
    },
    loading () {
      this.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000, theme: 'dark' }
      )
    }
  }
}
```
