# Caveat About Theme
Wherever you use `this.$NMessage` to generate a message, if you don't specify the theme of it, the theme of created message will follow the outer-most ascendant Config Provider of `this`. Since making the message's theme as same as its invoking component instance will cause chaos.
```html
<n-button @click="emitInfo">
  You can change the theme while the message is active
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