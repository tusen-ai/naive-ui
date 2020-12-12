# Modify Exist Message

```html
<n-space>
  <n-button @click="createMessage"> Create a Message Firstly </n-button>
  <n-button @click="changeType">Change Type</n-button>
  <n-button @click="plus">Plus 1</n-button>
</n-space>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      count: 0,
      typeIndex: 0,
      types: ['success', 'info', 'warning', 'error', 'loading'],
      msg: null
    }
  },
  computed: {
    type () {
      return this.types[this.typeIndex]
    }
  },
  methods: {
    plus () {
      if (this.msg) {
        this.count++
        this.msg.content = '' + this.count
      }
    },
    changeType () {
      if (this.msg) {
        this.typeIndex = (this.typeIndex + 1) % this.types.length
        this.msg.type = this.type
      }
    },
    createMessage () {
      this.msg = this.message[this.type]('' + this.count, { duration: 10000 })
    }
  }
}
```
