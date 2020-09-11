# 基础用法
```html
<n-message-controller ref="message" />
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
```
```js
export default {
  methods: {
    info () {
      this.$refs.message.info(
        "I don't know why nobody told you how to unfold your love"
      )
    },
    error () {
      this.$refs.message.error(
        "Once upon a time you dressed so fine"
      )
    },
    warning () {
      this.$refs.message.warning(
        "How many roads must a man walk down"
      )
    },
    success () {
      this.$refs.message.success(
        "'Cause you walked hand in hand With another man in my place"
      )
    },
    loading () {
      this.$refs.message.loading(
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