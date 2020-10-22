# Timing
Specify the duration of messages.
```html
<n-button @click="createMessage">
  Last for 5 second
</n-button>
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