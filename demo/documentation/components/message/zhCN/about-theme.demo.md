# 关于主题的注意事项

如果你不明确指明主题，被创建信息的主题会与对应 `n-message-provider` 的主题一致。

```html
<n-space>
  <n-button @click="info"> 你可以在 Message 还在的时候切换主题 </n-button>
  <n-button @click="loading"> 指明深色主题 </n-button>
</n-space>
```

```js
export default {
  inject: ['message'],
  methods: {
    info() {
      this.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000 }
      )
    },
    loading() {
      this.message.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000, theme: 'dark' }
      )
    }
  }
}
```
