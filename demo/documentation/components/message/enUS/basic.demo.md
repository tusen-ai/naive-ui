# Basic
```html
<n-button @click="info">
  Info
</n-button>
<n-button @click="error">
  Error
</n-button>
<n-button @click="warning">
  Warning
</n-button>
<n-button @click="success">
  Success
</n-button>
<n-button @click="loading">
  Loading
</n-button>
```
```js
export default {
  inject: ['message'],
  methods: {
    info () {
      this.message.info(
        "I don't know why nobody told you how to unfold your love"
      )
    },
    error () {
      this.message.error(
        "Once upon a time you dressed so fine"
      )
    },
    warning () {
      this.message.warning(
        "How many roads must a man walk down"
      )
    },
    success () {
      this.message.success(
        "'Cause you walked hand in hand With another man in my place"
      )
    },
    loading () {
      this.message.loading(
        "If I were you, I will realize that I love you more than any other guy"
      )
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```