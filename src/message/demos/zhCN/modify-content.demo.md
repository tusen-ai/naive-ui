# 修改创建的信息

```html
<n-space>
  <n-button @click="createMessage"> 先开个信息 </n-button>
  <n-button @click="changeType">改变类型</n-button>
  <n-button @click="plus">加一</n-button>
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
