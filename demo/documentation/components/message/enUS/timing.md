# Timing
```html
<n-button @click="emitInfo">
  Last for 5 second
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