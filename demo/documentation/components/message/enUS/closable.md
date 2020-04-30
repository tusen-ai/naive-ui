# Closable
Set `closable` to make message closable by a click.
```html
<n-button @click="emitInfo">
  Open a Message
</n-button>
```

```js
export default {
  methods: {
    emitInfo() {
      this.$NMessage.info(
        "I don't know why nobody told you how to unfold your love",
        {
          closable: true,
          duration: 5000
        }
      )
    }
  }
}
```