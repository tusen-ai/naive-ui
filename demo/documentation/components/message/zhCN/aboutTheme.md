# 关于主题的注意事项
无论你在什么位置调用 `this.$NMessage` 来生成一个信息，如果你不明确指明主题，被创建信息的主题会遵从这个组件最靠外层的一个祖先 Config Provider 的主题。如果调用信息的主题和当前组件主题一致的话可能会造成混乱。
```html
<n-button @click="emitInfo">
  你可以在 Message 还在的时候切换主题
</n-button>
```

```js
export default {
  data() {
    return {}
  },
  methods: {
    emitInfo() {
      this.$NMessage.info(
        "I don't know why nobody told you how to unfold your love",
        { duration: 5000 }
      )
    }
  }
}
```