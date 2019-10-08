# Icon
# Basic
```html
<n-button @click="emitMessage">
  Hourglass Icon
</n-button>
```
```js
export default {
  data() {
    return {}
  },
  methods: {
    emitMessage() {
      this.$NMessage.warning("I never needed anybody's help in any way", {
        icon: "md-hourglass"
      })
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0
}
```