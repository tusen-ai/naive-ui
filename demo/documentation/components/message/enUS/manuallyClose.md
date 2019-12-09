# Manually Close
```html
<n-button @click="openMessage">
  Open
</n-button>
<n-button @click="closeMessage">
  Close
</n-button>
```
```js
export default {
  data() {
    return {
      message: null
    }
  },
  beforeDestroy () {
    this.closeMessage()
  },
  methods: {
    openMessage () {
      if (!this.message) {
        this.message = this.$NMessage.info('3 * 3 * 4 * 4 * ?', {
          duration: 0
        })
      }
    },
    closeMessage () {
      if (this.message) {
        this.message.close()
        this.message = null
      }
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0
}
```