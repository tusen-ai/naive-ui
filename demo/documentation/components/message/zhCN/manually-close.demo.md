# 手动关闭
```html
<n-message-controller ref="message" />
<n-button @click="createMessage">
  打开
</n-button>
<n-button @click="removeMessage">
  关闭
</n-button>
```
```js
export default {
  data () {
    return {
      message: null
    }
  },
  beforeDestroy () {
    this.removeMessage()
  },
  methods: {
    createMessage () {
      if (!this.message) {
        this.message = this.$refs.message.info('3 * 3 * 4 * 4 * ?', {
          duration: 0
        })
      }
    },
    removeMessage () {
      if (this.message) {
        this.message.destroy()
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