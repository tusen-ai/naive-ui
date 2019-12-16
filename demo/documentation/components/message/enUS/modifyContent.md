# Modify Exist Message
```html
<n-button @click="createMessage">
  Open a Message Firstly
</n-button>
<n-button @click="changeType">changeType</n-button>
<n-button @click="plus">+</n-button>
```
```js
export default {
  data() {
    return {
      count: 0,
      typeIndex: 0,
      types: ['success', 'info', 'warning', 'error', 'loading'],
      message: null
    }
  },
  computed: {
    type () {
      return this.types[this.typeIndex]
    }
  },
  methods: {
    plus () {
      if (message) {
        this.count++
        this.message.content = '' + this.count
      }
    },
    changeType () {
      if (this.message) {
        this.typeIndex = (this.typeIndex + 1) % this.types.length
        this.message.type = this.type
      }
    },
    createMessage() {
      this.message = this.$NMessage[this.type](
        '' + this.count
      )
    },
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```