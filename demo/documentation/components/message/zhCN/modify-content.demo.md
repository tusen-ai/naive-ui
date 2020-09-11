# 修改创建的信息
```html
<n-message-controller ref="message" />
<n-button @click="createMessage">
  先开个信息
</n-button>
<n-button @click="changeType">改变类型</n-button>
<n-button @click="plus">加一</n-button>
```
```js
export default {
  data () {
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
      if (this.message) {
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
    createMessage () {
      this.message = this.$refs.message[this.type](
        '' + this.count, { duration: 10000 }
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