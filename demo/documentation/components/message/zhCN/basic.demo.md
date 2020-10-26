# 基础用法
```html
<n-space>
  <n-button @click="info">
    信息
  </n-button>
  <n-button @click="error">
    错误
  </n-button>
  <n-button @click="warning">
    警告
  </n-button>
  <n-button @click="success">
    成功
  </n-button>
  <n-button @click="loading">
    加载中
  </n-button>
</n-space>
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
