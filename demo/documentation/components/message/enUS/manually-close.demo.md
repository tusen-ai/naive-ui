# Manually Close
```html
<n-button @click="createMessage">
  Create
</n-button>
<n-button @click="removeMessage">
  Destroy
</n-button>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      msg: null
    }
  },
  beforeUnmount () {
    this.removeMessage()
  },
  methods: {
    createMessage () {
      if (!this.msg) {
        this.msg = this.message.info('3 * 3 * 4 * 4 * ?', {
          duration: 0
        })
      }
    },
    removeMessage () {
      if (this.msg) {
        this.msg.destroy()
        this.msg = null
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